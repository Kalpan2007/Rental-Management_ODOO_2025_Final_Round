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

    // Validate endUser details
    if (!endUser || !endUser.firstName || !endUser.lastName || !endUser.email) {
      return res.status(400).json({ message: 'End user details (firstName, lastName, email) are required' });
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

    // Validate dates
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
    
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (startDateTime >= endDateTime) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    if (startDateTime < new Date()) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    // Calculate unit price (daily rate)
    const rentDays = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));
    if (rentDays < 1) {
      return res.status(400).json({ message: 'Minimum rental period is 1 day' });
    }
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

    // Check product availability periods
    try {
      const isAvailable = await product.isAvailableForRange(startDate, endDate);
      if (!isAvailable) {
        return res.status(400).json({ message: 'Product is not available for the selected dates due to maintenance or other restrictions' });
      }
    } catch (availabilityError) {
      console.error('Error checking product availability:', availabilityError);
      // Continue with booking creation if availability check fails
    }

    // Update product availability after successful booking
    product.availability.push({
      startDate: startDateTime,
      endDate: endDateTime,
      isAvailable: false,
      reason: 'booked'
    });
    await product.save();

    let newBooking = new Booking({
      customerId: req.user.id,
      productId,
      startDate: startDateTime,
      endDate: endDateTime,
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
      
      res.status(201).json({
        success: true,
        data: newBooking
      });
    } catch (saveError) {
      console.error('Error saving booking:', saveError);
      res.status(500).json({ 
        success: false,
        message: 'Failed to create booking', 
        error: saveError.message 
      });
    }
  } catch (error) {
    console.error('Error in booking creation process:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to process booking request', 
      error: error.message 
    });
  }
};

// List bookings
const listBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = req.user.role === 'admin' ? {} : { customerId: req.user.id };
    const bookings = await Booking.find(query)
      .populate('productId')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error listing bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

// Get booking
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('productId customerId')
      .lean();

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Auth check if not admin and not owner
    if (req.user.role !== 'admin' && booking.customerId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
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

    // Check if booking can be cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking'
      });
    }

    if (new Date(booking.startDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a booking that has already started'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
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
    const booking = await Booking.findById(req.params.id)
      .populate('customerId')
      .populate('productId');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot confirm booking with status: ${booking.status}`
      });
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
    } catch (emailError) {
      console.error('Failed to send booking confirmation email:', emailError);
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error confirming booking:', error);
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
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed bookings can be completed'
      });
    }

    if (new Date() < new Date(booking.endDate)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot complete booking before end date'
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error completing booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete booking',
      error: error.message
    });
  }
};

module.exports = { createBooking, listBookings, getBooking, cancelBooking, confirmBooking, completeBooking };