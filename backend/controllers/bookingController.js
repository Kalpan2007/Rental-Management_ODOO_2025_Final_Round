const Booking = require('../models/Booking');
const Product = require('../models/Product');
const { sendBookingConfirmation } = require('../services/notificationService');

// Create booking
const createBooking = async (req, res) => {
  try {
    console.log('Received booking request:', req.body);
    
    const { productId, startDate, endDate, endUser, totalPrice } = req.body;
    
    // Validate all required fields
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    // Validate totalPrice is a valid number and greater than 0
    if (!totalPrice || isNaN(totalPrice) || totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid total price' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get the base price from the product
    const basePrice = product.basePrice || (product.pricingRules?.[0]?.price) || 0;
    if (basePrice <= 0) {
      return res.status(400).json({ message: 'Invalid base price for the product' });
    }

    // Calculate unit price (daily rate)
    const rentDays = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    const unitPrice = totalPrice / rentDays;

    // Check availability (prevent double-booking)
    const overlapping = await Booking.find({
      productId,
      status: { $nin: ['cancelled'] }, // Ignore cancelled bookings
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ],
    });
    
    if (overlapping.length > 0) {
      return res.status(400).json({ message: 'Product not available for the selected dates' });
    }

    let newBooking = new Booking({
      customerId: req.user.id,
      productId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      unitPrice,
      totalPrice,
      endUser,
      status: 'pending'
    });
    
    try {
      newBooking = await newBooking.save();
      
      // Only try to send confirmation if we have user email
      if (req.user.email) {
        try {
          await sendBookingConfirmation(newBooking);
        } catch (emailError) {
          console.error('Failed to send booking confirmation email:', emailError);
          // Don't fail the booking creation if email fails
        }
      }
      
      res.status(201).json(newBooking);
    } catch (saveError) {
      console.error('Error saving booking:', saveError);
      res.status(500).json({ 
        message: 'Failed to create booking', 
        error: saveError.message 
      });
    }
  } catch (error) {
    console.error('Error in booking creation process:', error);
    res.status(500).json({ 
      message: 'Failed to process booking request', 
      error: error.message 
    });
  }
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
  try {
    // Get booking with populated fields
    let booking = await Booking.findById(req.params.id)
      .populate('customerId')
      .populate('productId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Generate contract
    const { generateContract } = require('../services/pdfService');
    const contractUrl = await generateContract(booking);
    
    // Update booking with contract URL and status
    booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { 
        status: 'confirmed',
        contractUrl
      }, 
      { new: true }
    );
    
    // Send notification
    const { sendBookingConfirmation } = require('../services/notificationService');
    await sendBookingConfirmation(booking);
    
    res.json(booking);
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Error confirming booking', error: error.message });
  }
};

// Complete booking
const completeBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
  res.json(booking);
};

module.exports = { createBooking, listBookings, getBooking, cancelBooking, confirmBooking, completeBooking };