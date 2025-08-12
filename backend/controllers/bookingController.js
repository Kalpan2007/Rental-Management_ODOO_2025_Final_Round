const Booking = require('../models/Booking');
const Product = require('../models/Product');
const { sendBookingConfirmation } = require('../services/notificationService');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { productId, startDate, endDate, totalPrice } = req.body;
    
    // Validate required fields
    if (!productId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ 
        message: 'Missing required fields: productId, startDate, endDate, totalPrice' 
      });
    }

    // Check if product exists and is approved
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.status !== 'approved') {
      return res.status(400).json({ message: 'Product is not available for booking' });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    // Check availability (prevent double-booking)
    const overlapping = await Booking.find({
      productId,
      status: { $nin: ['cancelled', 'completed'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
      ],
    });

    if (overlapping.length > 0) {
      return res.status(400).json({ message: 'Product is not available for the selected dates' });
    }

    // Calculate unit price from product
    const unitPrice = product.basePrice || (product.pricingRules?.[0]?.price) || 0;

    // Create booking
    const booking = new Booking({
      customerId: req.user.id,
      productId,
      startDate: start,
      endDate: end,
      unitPrice: unitPrice,
      totalPrice: parseFloat(totalPrice),
      status: 'pending',
      paymentStatus: 'pending'
    });

    await booking.save();

    // Populate product details for response
    await booking.populate('productId');

    // Send notification (optional)
    try {
      await sendBookingConfirmation(booking);
    } catch (notificationError) {
      console.error('Failed to send booking confirmation:', notificationError);
    }

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// List bookings
const listBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};

    // Filter by user role
    if (req.user.role === 'admin') {
      // Admin can see all bookings
      if (status) query.status = status;
    } else {
      // Regular users can only see their own bookings
      query.customerId = req.user.id;
      if (status) query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('productId', 'name images basePrice')
      .populate('customerId', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Booking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('List bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Get booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('productId')
      .populate('customerId', '-password');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Authorization check
    if (req.user.role !== 'admin' && booking.customerId._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Authorization check
    if (req.user.role !== 'admin' && booking.customerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ 
      message: 'Booking cancelled successfully',
      booking 
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
};

// Confirm booking (admin only)
const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customerId')
      .populate('productId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.status === 'confirmed') {
      return res.status(400).json({ message: 'Booking is already confirmed' });
    }

    // Generate contract (optional)
    let contractUrl = null;
    try {
      const { generateContract } = require('../services/pdfService');
      contractUrl = await generateContract(booking);
    } catch (contractError) {
      console.error('Failed to generate contract:', contractError);
    }
    
    // Update booking
    booking.status = 'confirmed';
    if (contractUrl) booking.contractUrl = contractUrl;
    await booking.save();
    
    // Send notification
    try {
      await sendBookingConfirmation(booking);
    } catch (notificationError) {
      console.error('Failed to send confirmation notification:', notificationError);
    }
    
    res.json({ 
      message: 'Booking confirmed successfully',
      booking 
    });
  } catch (error) {
    console.error('Confirm booking error:', error);
    res.status(500).json({ message: 'Server error while confirming booking' });
  }
};

// Complete booking (admin only)
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Booking is already completed' });
    }

    booking.status = 'completed';
    await booking.save();
    
    res.json({ 
      message: 'Booking completed successfully',
      booking 
    });
  } catch (error) {
    console.error('Complete booking error:', error);
    res.status(500).json({ message: 'Server error while completing booking' });
  }
};

module.exports = { createBooking, listBookings, getBooking, cancelBooking, confirmBooking, completeBooking };