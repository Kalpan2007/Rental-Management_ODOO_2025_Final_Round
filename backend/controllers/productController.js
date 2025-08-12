const Product = require('../models/Product');
const Booking = require('../models/Booking');
const uploadImage = require('../services/cloudinaryService');

// Create product (now available for all users)
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      owner: req.user.id, // Set current user as owner (JWT payload uses 'id')
      status: 'pending' // All new products start as pending
    });

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
    const { page = 1, limit = 10, category, minPrice, maxPrice, startDate, endDate, search, status } = req.query;
    const query = {};
    
    // Only show approved products to regular users, allow admins to see all
    if (req.user.role !== 'admin') {
      query.status = 'approved';
    } else if (status) {
      query.status = status;
    }

    // Allow users to see their own pending/rejected products
    if (req.user.role === 'customer') {
      if (status && ['pending', 'rejected'].includes(status)) {
        query.$and = [
          { owner: req.user._id },
          { status: status }
        ];
      }
    }
    
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
      const allProducts = await Product.find({});
      availableProductIds = allProducts
        .filter(product => product.isAvailableForRange(startDate, endDate))
        .map(product => product._id);
      
      if (availableProductIds.length > 0) {
        query._id = { $in: availableProductIds };
      } else {
        return res.json({ products: [], total: 0, page, totalPages: 0 });
      }
    }

    // Handle sorting
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const sortOptions = {};
    sortOptions[sort] = order;
    
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('owner', 'name email phone') // Include owner details
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    res.json({
      success: true,
      data: products,
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
    const product = await Product.findById(req.params.id)
      .populate('owner', 'name email phone'); // Include owner details

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Only show approved products to regular users unless they own the product
    if (req.user.role !== 'admin' && 
        product.status !== 'approved' && 
        product.owner._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
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

    // Check if user has permission to update
    if (req.user.role !== 'admin' && product.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Regular users can't modify status or rejection reason
    if (req.user.role !== 'admin') {
      delete req.body.status;
      delete req.body.rejectionReason;
    }

    // Reset status to pending if regular user updates an approved/rejected product
    if (req.user.role === 'customer' && ['approved', 'rejected'].includes(product.status)) {
      product.status = 'pending';
      product.rejectionReason = null;
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

    // Check if user has permission to delete
    if (req.user.role !== 'admin' && product.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Moderate product (admin only)
const moderateProduct = async (req, res) => {
  try {
    // Only admins can moderate products
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status, rejectionReason } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // If rejecting, require a reason
    if (status === 'rejected' && !rejectionReason) {
      return res.status(400).json({ message: 'Rejection reason is required' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = status;
    product.rejectionReason = status === 'rejected' ? rejectionReason : null;
    product.updatedAt = Date.now();

    await product.save();
    res.json(product);
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

    // Only check availability for approved products
    if (product.status !== 'approved') {
      return res.status(400).json({ 
        message: 'Product is not available for booking',
        status: product.status
      });
    }

    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for existing bookings
    const existingBookings = await Booking.find({
      product: id,
      status: { $nin: ['cancelled', 'rejected'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
        { startDate: { $gte: start, $lte: end } },
        { endDate: { $gte: start, $lte: end } }
      ]
    });

    // Check quantity availability
    const bookedQuantity = existingBookings.length;
    const isAvailable = bookedQuantity < product.quantity;

    // Check custom availability periods
    const customUnavailability = product.availability.some(period => {
      if (!period.isAvailable) {
        const periodStart = new Date(period.startDate);
        const periodEnd = new Date(period.endDate);
        return (start <= periodEnd && end >= periodStart);
      }
      return false;
    });

    res.json({
      productId: id,
      startDate,
      endDate,
      quantity,
      isAvailable: isAvailable && !customUnavailability,
      availableQuantity: Math.max(0, product.quantity - bookedQuantity),
      message: customUnavailability ? 'Product is under maintenance or unavailable for selected dates' : 
               !isAvailable ? 'All units are booked for selected dates' : 'Product is available'
    });
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(500).json({ 
      message: 'Failed to check availability',
      error: error.message 
    });
  }
};

// Get product availability calendar
const getProductCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const { year, month } = req.query;
    
    console.log(`🔥 Calendar Request - Product ID: ${id}, Year: ${year}, Month: ${month}`);
    
    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required' });
    }
    
    // Get the product
    const product = await Product.findById(id);
    if (!product) {
      console.log(`❌ Product not found: ${id}`);
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log(`🔥 Product found - Name: ${product.name}, Status: ${product.status}`);

    // Only show calendar for approved products
    if (product.status !== 'approved') {
      console.log(`❌ Product status is '${product.status}', not 'approved'`);
      return res.status(400).json({ message: 'Product is not available for booking' });
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
  getProductCalendar,
  moderateProduct
};