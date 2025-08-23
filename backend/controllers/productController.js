const Product = require('../models/Product');
const Booking = require('../models/Booking');
const uploadImage = require('../services/cloudinaryService');

// Create product
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      owner: req.user.id,
      status: 'approved' // Auto-approve for demo
    };

    // Handle image upload
    if (req.files && req.files.length > 0) {
      productData.images = await Promise.all(
        req.files.map(file => uploadImage(file))
      );
    } else if (req.body.imageUrl) {
      productData.images = [req.body.imageUrl];
    }

    const product = new Product(productData);
    await product.save();
    
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to create product',
      error: error.message 
    });
  }
};

// List products
const listProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      minPrice, 
      maxPrice, 
      search, 
      status = 'approved',
      owner,
      sort = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = {};
    
    // Filter by status (only approved for regular users)
    if (req.user.role !== 'admin') {
      query.status = 'approved';
    } else if (status) {
      query.status = status;
    }

    // Filter by owner
    if (owner) {
      query.owner = owner;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sort] = order === 'asc' ? 1 : -1;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('owner', 'name email phone')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('List products error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('owner', 'name email phone');

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        product.status !== 'approved' && 
        product.owner._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        product.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const newImages = await Promise.all(
        req.files.map(file => uploadImage(file))
      );
      product.images = [...(product.images || []), ...newImages];
    }

    product.updatedAt = Date.now();
    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to update product',
      error: error.message 
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        product.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete product',
      error: error.message 
    });
  }
};

// Check availability
const checkAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, quantity = 1 } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        success: false,
        message: 'Start date and end date are required' 
      });
    }
    
    const product = await Product.findById(id);
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

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      productId: id,
      status: { $nin: ['cancelled', 'rejected'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } }
      ]
    });

    const isAvailable = overlappingBookings.length === 0;

    res.json({
      success: true,
      data: {
        productId: id,
        startDate,
        endDate,
        isAvailable,
        message: isAvailable ? 'Product is available' : 'Product is not available for selected dates'
      }
    });
  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to check availability',
      error: error.message 
    });
  }
};

// Get product calendar
const getProductCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ 
        success: false,
        message: 'Year and month are required' 
      });
    }
    
    const product = await Product.findById(id);
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
    
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);
    
    // Get bookings for this month
    const bookings = await Booking.find({
      productId: id,
      $or: [
        { startDate: { $lte: endOfMonth }, endDate: { $gte: startOfMonth } }
      ],
      status: { $nin: ['cancelled'] }
    }).select('startDate endDate status');
    
    // Generate calendar data
    const daysInMonth = endOfMonth.getDate();
    const calendarData = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dateString = date.toISOString().split('T')[0];
      
      const isBooked = bookings.some(booking => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);
        return date >= bookingStart && date <= bookingEnd;
      });
      
      calendarData.push({
        date: dateString,
        status: isBooked ? 'booked' : 'available'
      });
    }
    
    res.json({
      success: true,
      data: {
        productId: id,
        year,
        month,
        calendar: calendarData
      }
    });
  } catch (error) {
    console.error('Get calendar error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to get calendar',
      error: error.message 
    });
  }
};

// Moderate product (admin only)
const moderateProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied' 
      });
    }

    const { status, rejectionReason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid status' 
      });
    }

    if (status === 'rejected' && !rejectionReason) {
      return res.status(400).json({ 
        success: false,
        message: 'Rejection reason is required' 
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    product.status = status;
    product.rejectionReason = status === 'rejected' ? rejectionReason : null;
    product.updatedAt = Date.now();

    await product.save();

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Moderate product error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to moderate product',
      error: error.message 
    });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  checkAvailability,
  getProductCalendar,
  moderateProduct
};