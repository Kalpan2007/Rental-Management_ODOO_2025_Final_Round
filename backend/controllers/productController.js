const Product = require('../models/Product');
const Booking = require('../models/Booking');
const uploadImage = require('../services/cloudinaryService');

// Create product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    if (req.files) {
      product.images = await Promise.all(req.files.map(file => uploadImage(file)));
    }
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// List products (filters, pagination)
const listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, startDate, endDate, search } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query['pricingRules.price'] = {};
      if (minPrice) query['pricingRules.price'].$gte = Number(minPrice);
      if (maxPrice) query['pricingRules.price'].$lte = Number(maxPrice);
    }
    if (search) query.$text = { $search: search };
    
    // Filter by availability if dates provided
    let availableProductIds = [];
    if (startDate && endDate) {
      // Find products that don't have unavailable periods overlapping with requested dates
      const allProducts = await Product.find({});
      availableProductIds = allProducts
        .filter(product => product.isAvailableForRange(startDate, endDate))
        .map(product => product._id);
      
      if (availableProductIds.length > 0) {
        query._id = { $in: availableProductIds };
      } else {
        // No products available for these dates
        return res.json({ products: [], total: 0, page, totalPages: 0 });
      }
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    res.json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update fields
    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });
    
    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(req.files.map(file => uploadImage(file)));
      product.images = [...product.images, ...newImages];
    }
    
    product.updatedAt = Date.now();
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check product availability for a date range
const checkAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, quantity = 1 } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const isAvailable = product.isAvailableForRange(startDate, endDate, quantity);
    
    res.json({
      productId: id,
      startDate,
      endDate,
      quantity,
      isAvailable
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product availability calendar
const getProductCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required' });
    }
    
    // Get the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Calculate start and end of month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0); // Last day of month
    
    // Get all bookings for this product in the specified month
    const bookings = await Booking.find({
      product: id,
      $or: [
        { startDate: { $lte: endOfMonth }, endDate: { $gte: startOfMonth } },
        { startDate: { $gte: startOfMonth, $lte: endOfMonth } },
        { endDate: { $gte: startOfMonth, $lte: endOfMonth } }
      ],
      status: { $nin: ['cancelled'] }
    }).select('startDate endDate status');
    
    // Get unavailable periods from product
    const unavailablePeriods = product.availability
      .filter(period => !period.isAvailable)
      .filter(period => {
        return (
          (period.startDate <= endOfMonth && period.endDate >= startOfMonth)
        );
      });
    
    // Generate calendar data
    const daysInMonth = endOfMonth.getDate();
    const calendarData = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Check if date is in any booking
      const bookedStatus = bookings.some(booking => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        return date >= bookingStart && date <= bookingEnd;
      }) ? 'booked' : null;
      
      // Check if date is in any unavailable period
      const unavailableStatus = unavailablePeriods.some(period => {
        return date >= period.startDate && date <= period.endDate;
      }) ? 'unavailable' : null;
      
      calendarData.push({
        date: dateString,
        status: bookedStatus || unavailableStatus || 'available',
        quantity: product.quantity,
        // Add more details if needed
      });
    }
    
    res.json({
      productId: id,
      year,
      month,
      calendar: calendarData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  checkAvailability,
  getProductCalendar
};