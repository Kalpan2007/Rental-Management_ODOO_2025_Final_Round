const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { createPaymentIntent, confirmPayment } = require('../services/stripeService');

// Create payment order
const createPayment = async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  const paymentIntent = await createPaymentIntent(booking.totalPrice);

  const payment = new Payment({
    bookingId,
    amount: booking.totalPrice,
    paymentMethod: 'stripe',
    transactionId: paymentIntent.id,
  });
  await payment.save();

  res.json({ clientSecret: paymentIntent.client_secret });
};

// Verify payment
const verifyPayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  await confirmPayment(paymentIntentId);
  const payment = await Payment.findOneAndUpdate({ transactionId: paymentIntentId }, { status: 'completed' }, { new: true });
  await Booking.findByIdAndUpdate(payment.bookingId, { paymentStatus: 'paid' });
  // Send receipt notification
  res.json({ message: 'Payment verified' });
};

// Get payment details
const getPayment = async (req, res) => {
  const payment = await Payment.findOne({ bookingId: req.params.bookingId }).lean();
  res.json(payment);
};

module.exports = { createPayment, verifyPayment, getPayment };