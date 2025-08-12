const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { createPaymentIntent, confirmPayment, generateInvoice } = require('../services/stripeService');
const { sendEmail } = require('../services/emailService');

// Create payment order - supports full or partial payments
const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, isPartial = false } = req.body;
    
    const booking = await Booking.findById(bookingId)
      .populate('customerId')
      .populate('productId');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    // Validate payment amount
    if (isPartial) {
      if (!amount) {
        return res.status(400).json({ message: 'Amount is required for partial payments' });
      }
      
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

    // Create Stripe Checkout session
    const session = await createPaymentIntent(paymentAmount, bookingId, {
      customerEmail: booking.endUser.email,
      productName: booking.productId.name
    });

    // Create payment record
    const payment = new Payment({
      bookingId,
      amount: paymentAmount,
      paymentMethod: 'stripe',
      sessionId: session.id,
      isPartial,
      status: 'pending'
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
      sessionId: session.id,
      sessionUrl: session.url,
      paymentId: payment._id,
      amount: paymentAmount
    });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Verify payment and generate invoice
const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Update payment status
    const payment = await Payment.findOneAndUpdate(
      { sessionId }, 
      { 
        status: 'completed',
        transactionId: session.payment_intent
      }, 
      { new: true }
    );
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // Get the booking
    const booking = await Booking.findById(payment.bookingId)
      .populate('customerId')
      .populate('productId');

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

    // Generate invoice
    try {
      const invoice = await generateInvoice(
        booking._id,
        booking.endUser.email,
        payment.amount,
        `Rental Payment for ${booking.productId.name}`
      );
      payment.invoiceUrl = invoice.hosted_invoice_url;
      await payment.save();
    } catch (invoiceError) {
      console.error('Failed to generate invoice:', invoiceError);
    }
    
    await booking.save();
    
    // Send receipt notification
    try {
      const receiptHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2c3e50; text-align: center;">Payment Receipt</h1>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #34495e; margin-bottom: 15px;">Payment Details</h2>
            <p><strong>Booking ID:</strong> ${booking._id}</p>
            <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Amount Paid:</strong> $${payment.amount.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> ${booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}</p>
            ${payment.invoiceUrl ? `<p><strong>Invoice:</strong> <a href="${payment.invoiceUrl}">View Invoice</a></p>` : ''}
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #34495e; margin-bottom: 15px;">Summary</h2>
            <p><strong>Total Price:</strong> $${booking.totalPrice.toFixed(2)}</p>
            <p><strong>Total Paid:</strong> $${totalPaid.toFixed(2)}</p>
            ${totalPaid < booking.totalPrice ? 
              `<p><strong>Remaining Balance:</strong> $${(booking.totalPrice - totalPaid).toFixed(2)}</p>` : 
              '<p style="color: #27ae60;"><strong>Fully Paid</strong></p>'}
          </div>
          <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
            <p>Thank you for your payment!</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>
        </div>
      `;

      await sendEmail({
        to: booking.endUser.email,
        subject: `Payment Receipt - ${payment.isPartial ? 'Partial Payment' : 'Full Payment'} for Booking #${booking._id}`,
        html: receiptHtml
      });

      // Send copy to customer if different from end user
      if (booking.customerId.email !== booking.endUser.email) {
        await sendEmail({
          to: booking.customerId.email,
          subject: `Payment Receipt - ${payment.isPartial ? 'Partial Payment' : 'Full Payment'} for Booking #${booking._id}`,
          html: receiptHtml
        });
      }
    } catch (emailError) {
      console.error('Failed to send payment receipt email:', emailError);
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
    console.error('Payment verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get payment history for a booking
const getPaymentHistory = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const payments = await Payment.find({ bookingId }).sort({ createdAt: -1 });
    
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