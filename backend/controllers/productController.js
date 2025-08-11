const Product = require('../models/Product');
const uploadImage = require('../services/cloudinaryService');

// Create product
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  if (req.files) {
    product.images = await Promise.all(req.files.map(file => uploadImage(file)));
  }
  await product.save();
  res.status(201).json(product);
};

// List products (filters, pagination)
const listProducts = async (req, res) => {
  const { page = 1, limit = 10, category, price, availability, search } = req.query;
  const query = {};
  if (category) query.category = category;
  if (price) query['pricingRules.price'] = { $lte: price }; // Simplified
  if (search) query.$text = { $search: search };
  // Availability filter would need more logic

  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .lean();
  res.json(products);
};

// Get product
const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).lean();
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// Delete product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

// Check availability
const checkAvailability = async (req, res) => {
  const product = await Product.findById(req.params.id);
  // Logic to check availability array for dates
  res.json({ available: true }); // Placeholder
};

module.exports = { createProduct, listProducts, getProduct, updateProduct, deleteProduct, checkAvailability };