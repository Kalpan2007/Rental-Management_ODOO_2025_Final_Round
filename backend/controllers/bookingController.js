const Booking = require('../models/Booking');
const Product = require('../models/Product');
const { sendBookingConfirmation } = require('../services/notificationService');

// Create booking
const createBooking = async (req, res) => {
  const { productId, startDate, endDate, endUser } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  // Check availability (prevent double-booking)
  const overlapping = await Booking.find({
    productId,
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  });
  if (overlapping.length > 0) return res.status(400).json({ message: 'Product not available' });

  // Calculate prices (placeholder logic)
  const unitPrice = 100;
  const totalPrice = unitPrice * ((endDate - startDate) / (24 * 60 * 60 * 1000)); // days

  const booking = new Booking({
    customerId: req.user.id,
    productId,
    startDate,
    endDate,
    unitPrice,
    totalPrice,
    endUser,
  });
  await booking.save();

  await sendBookingConfirmation(booking);
  res.status(201).json(booking);
};

// List bookings
const listBookings = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const query = req.user.role === 'admin' ? {} : { customerId: req.user.id };
  const bookings = await Booking.find(query)
    .populate('productId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();
  res.json(bookings);
};

// Get booking
const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('productId customerId').lean();
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  // Auth check if not admin and not owner
  if (req.user.role !== 'admin' && booking.customerId._id.toString() !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });
  res.json(booking);
};

// Cancel booking
const cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
  // Send notification
  res.json(booking);
};

// Confirm booking
const confirmBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'confirmed' }, { new: true });
  // Send notification
  res.json(booking);
};

// Complete booking
const completeBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
  res.json(booking);
};

module.exports = { createBooking, listBookings, getBooking, cancelBooking, confirmBooking, completeBooking };