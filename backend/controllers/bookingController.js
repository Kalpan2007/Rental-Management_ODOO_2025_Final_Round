const Booking = require('../models/Booking');
const Product = require('../models/Product');
const User = require('../models/User');
const sendEmail = require('../services/emailService');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { productId, startDate, endDate, customPrice, quantity = 1 } = req.body;
    
    // Validate required fields
    if (!productId || !startDate || !endDate || !customPrice) {
      return res.status(400).json({ 
        success: false,
        message: 'Product ID, start date, end date, and custom price are required' 
      });
    }

    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    if (product.status !== 'approved') {
      return res.status(400).json({ 
        success: false,
        message: 'Product is not available for booking' 
      });
    }

    // Check availability
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return res.status(400).json({ 
        success: false,
        message: 'End date must be after start date' 
      });
    }

    const overlappingBookings = await Booking.find({
      productId,
      status: { $nin: ['cancelled', 'rejected'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Product is not available for selected dates' 
      });
    }

    // Calculate pricing
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const unitPrice = parseFloat(customPrice);
    const subtotal = unitPrice * days * quantity;
    const tax = subtotal * 0.18; // 18% GST
    const totalPrice = subtotal + tax;

    // Create booking
    const booking = new Booking({
      customerId: req.user.id,
      productId,
      startDate: start,
      endDate: end,
      unitPrice,
      totalPrice,
      quantity,
      status: 'pending',
      paymentStatus: 'unpaid'
    });

    await booking.save();

    // Populate booking for response
    await booking.populate('productId customerId');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create booking',
      error: error.message 
    });
  }
};

// List bookings
const listBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;
    const query = {};
    
    // Filter by user role
    if (req.user.role === 'admin') {
      if (userId) {
        query.customerId = userId;
      }
    } else {
      query.customerId = req.user.id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .populate('productId', 'name category images basePrice')
      .populate('customerId', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('List bookings error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message 
    });
  }
};

// Get single booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('productId')
      .populate('customerId', 'name email phone');

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        booking.customerId._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch booking',
      error: error.message 
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        booking.customerId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    // Check if booking can be cancelled
    if (['completed', 'cancelled'].includes(booking.status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Booking cannot be cancelled' 
      });
    }

    booking.status = 'cancelled';
    booking.updatedAt = Date.now();
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to cancel booking',
      error: error.message 
    });
  }
};

// Confirm booking (admin only)
const confirmBooking = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    const booking = await Booking.findById(req.params.id)
      .populate('customerId')
      .populate('productId');

    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    booking.status = 'confirmed';
    booking.updatedAt = Date.now();
    await booking.save();

    // Send confirmation email
    try {
      await sendEmail(
        booking.customerId.email,
        'Booking Confirmed - RentalHub',
        `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${booking.customerId.name},</p>
        <p>Your booking for <strong>${booking.productId.name}</strong> has been confirmed.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Product: ${booking.productId.name}</li>
          <li>Start Date: ${booking.startDate.toDateString()}</li>
          <li>End Date: ${booking.endDate.toDateString()}</li>
          <li>Total Amount: ₹${booking.totalPrice}</li>
        </ul>
        <p>Thank you for choosing RentalHub!</p>
        `
      );
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.json({
      success: true,
      data: booking,
      message: 'Booking confirmed successfully'
    });
  } catch (error) {
    console.error('Confirm booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to confirm booking',
      error: error.message 
    });
  }
};

// Complete booking (admin only)
const completeBooking = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ 
        success: false,
        message: 'Booking not found' 
      });
    }

    booking.status = 'completed';
    booking.updatedAt = Date.now();
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: 'Booking completed successfully'
    });
  } catch (error) {
    console.error('Complete booking error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to complete booking',
      error: error.message 
    });
  }
};

module.exports = {
  createBooking,
  listBookings,
  getBooking,
  cancelBooking,
  confirmBooking,
  completeBooking
};