const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { createPaymentIntent, confirmPayment, retrievePayment, createRazorpayOrder, verifyRazorpayPayment } = require('../services/stripeService');
const { sendEmail } = require('../services/emailService');

// Create payment order - supports Stripe and Razorpay
const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod = 'stripe', currency = 'usd' } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate payment amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid amount is required' });
    }

    let paymentIntent = null;
    let razorpayOrder = null;

    // Create payment intent based on payment method
    if (paymentMethod === 'stripe') {
      paymentIntent = await createPaymentIntent(amount, currency);
    } else if (paymentMethod === 'razorpay') {
      razorpayOrder = await createRazorpayOrder(amount, currency === 'usd' ? 'INR' : currency);
    } else {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Create payment record
    const payment = new Payment({
      bookingId,
      amount: amount,
      paymentMethod: paymentMethod,
      transactionId: paymentIntent ? paymentIntent.id : razorpayOrder.id,
      status: 'pending',
      currency: currency
    });
    await payment.save();

    // Add payment to booking's payments array
    booking.payments.push({
      paymentId: payment._id,
      amount: amount,
      date: new Date(),
      status: 'pending'
    });
    await booking.save();

    res.json({ 
      paymentId: payment._id,
      amount: amount,
      currency: currency,
      paymentMethod: paymentMethod,
      ...(paymentIntent && { clientSecret: paymentIntent.client_secret }),
      ...(razorpayOrder && { 
        orderId: razorpayOrder.id,
        keyId: process.env.RAZORPAY_KEY_ID 
      })
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Verify payment - supports both Stripe and Razorpay
const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId, paymentId, orderId, signature, paymentMethod = 'stripe' } = req.body;
    
    let paymentVerified = false;

    if (paymentMethod === 'stripe') {
      if (!paymentIntentId) {
        return res.status(400).json({ message: 'Payment intent ID is required for Stripe' });
      }
      
      const paymentIntent = await retrievePayment(paymentIntentId);
      paymentVerified = paymentIntent.status === 'succeeded';
    } else if (paymentMethod === 'razorpay') {
      if (!paymentId || !orderId || !signature) {
        return res.status(400).json({ message: 'Payment ID, Order ID, and Signature are required for Razorpay' });
      }
      
      const verification = await verifyRazorpayPayment(paymentId, orderId, signature);
      paymentVerified = verification.verified;
    } else {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    if (!paymentVerified) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { transactionId: paymentIntentId || orderId }, 
      { status: 'completed' }, 
      { new: true }
    );
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Get the booking
    const booking = await Booking.findById(payment.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Update the payment status in the booking's payments array
    const paymentIndex = booking.payments.findIndex(p => 
      p.paymentId.toString() === payment._id.toString());
    
    if (paymentIndex !== -1) {
      booking.payments[paymentIndex].status = 'completed';
    }
    
    // Calculate total paid amount
    const totalPaid = booking.payments.reduce((sum, payment) => {
      return payment.status === 'completed' ? sum + payment.amount : sum;
    }, 0);
    
    // Update booking payment status
    if (totalPaid >= booking.totalPrice) {
      booking.paymentStatus = 'paid';
    } else if (totalPaid > 0) {
      booking.paymentStatus = 'partial';
    }
    
    await booking.save();
    
    // Send receipt notification
    try {
      await sendEmail({
        to: booking.customerEmail,
        subject: `Payment Receipt - ${payment.paymentMethod === 'stripe' ? 'Stripe' : 'Razorpay'} Payment`,
        html: `
          <h1>Payment Receipt</h1>
          <p>Dear ${booking.customerName},</p>
          <p>Thank you for your payment of ${payment.currency.toUpperCase()} ${payment.amount.toFixed(2)} for booking #${booking._id}.</p>
          <p>Payment Method: ${payment.paymentMethod === 'stripe' ? 'Stripe' : 'Razorpay'}</p>
          <p>Payment Status: ${booking.paymentStatus}</p>
          <p>Total Paid: ${payment.currency.toUpperCase()} ${totalPaid.toFixed(2)}</p>
          <p>Total Amount: ${payment.currency.toUpperCase()} ${booking.totalPrice.toFixed(2)}</p>
          ${totalPaid < booking.totalPrice ? `<p>Remaining Balance: ${payment.currency.toUpperCase()} ${(booking.totalPrice - totalPaid).toFixed(2)}</p>` : ''}
          <p>Thank you for your business!</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send payment receipt email:', emailError);
    }
    
    res.json({ 
      message: 'Payment verified successfully', 
      payment,
      booking: {
        _id: booking._id,
        paymentStatus: booking.paymentStatus,
        totalPaid,
        totalPrice: booking.totalPrice,
        remainingBalance: booking.totalPrice - totalPaid
      }
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get payment history for a booking
const getPaymentHistory = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    // Verify booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Authorization check
    if (req.user.role !== 'admin' && booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    // Get all payments for this booking
    const payments = await Payment.find({ bookingId }).sort({ createdAt: -1 });
    
    // Calculate summary information
    const totalPaid = payments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const remainingBalance = booking.totalPrice - totalPaid;
    
    res.json({
      bookingId,
      payments,
      summary: {
        totalPrice: booking.totalPrice,
        totalPaid,
        remainingBalance,
        paymentStatus: booking.paymentStatus
      }
    });
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
  getPaymentHistory
};