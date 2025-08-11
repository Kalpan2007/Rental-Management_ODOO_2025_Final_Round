const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { createPaymentIntent, confirmPayment } = require('../services/stripeService');
const { sendEmail } = require('../services/emailService');

// Create payment order - supports full or partial payments
const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, isPartial = false } = req.body;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Validate payment amount
    if (isPartial) {
      // For partial payments, check if amount is valid
      if (!amount) {
        return res.status(400).json({ message: 'Amount is required for partial payments' });
      }
      
      // Calculate remaining amount to be paid
      const paidAmount = booking.payments.reduce((sum, payment) => {
        return payment.status === 'completed' ? sum + payment.amount : sum;
      }, 0);
      
      const remainingAmount = booking.totalPrice - paidAmount;
      
      if (amount > remainingAmount) {
        return res.status(400).json({ 
          message: 'Partial payment amount exceeds remaining balance',
          remainingAmount
        });
      }
    }
    
    // Use provided amount or full price for payment intent
    const paymentAmount = isPartial ? amount : booking.totalPrice;
    const paymentIntent = await createPaymentIntent(paymentAmount);

    // Create payment record
    const payment = new Payment({
      bookingId,
      amount: paymentAmount,
      paymentMethod: 'stripe',
      transactionId: paymentIntent.id,
      isPartial
    });
    await payment.save();
    
    // Add payment to booking's payments array
    booking.payments.push({
      paymentId: payment._id,
      amount: paymentAmount,
      date: new Date(),
      status: 'pending'
    });
    await booking.save();

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id,
      amount: paymentAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    await confirmPayment(paymentIntentId);
    
    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { transactionId: paymentIntentId }, 
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
        subject: `Payment Receipt - ${payment.isPartial ? 'Partial Payment' : 'Full Payment'}`,
        html: `
          <h1>Payment Receipt</h1>
          <p>Dear ${booking.customerName},</p>
          <p>Thank you for your payment of $${payment.amount.toFixed(2)} for booking #${booking._id}.</p>
          <p>Payment Status: ${booking.paymentStatus}</p>
          <p>Total Paid: $${totalPaid.toFixed(2)}</p>
          <p>Total Amount: $${booking.totalPrice.toFixed(2)}</p>
          ${totalPaid < booking.totalPrice ? `<p>Remaining Balance: $${(booking.totalPrice - totalPaid).toFixed(2)}</p>` : ''}
          <p>Thank you for your business!</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send payment receipt email:', emailError);
      // Continue with the response even if email fails
    }
    
    res.json({ 
      message: 'Payment verified', 
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
  getPaymentHistory
};