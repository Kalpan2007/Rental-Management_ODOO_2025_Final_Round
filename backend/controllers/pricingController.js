const Product = require('../models/Product');

// Add pricing rule
const addPricing = async (req, res) => {
  const { productId, durationType, price } = req.body;
  const product = await Product.findById(productId);
  product.pricingRules.push({ durationType, price });
  await product.save();
  res.json(product);
};

// Update pricing
const updatePricing = async (req, res) => {
  // Logic to update specific rule by id
  res.json({ message: 'Updated' });
};

// Delete pricing
const deletePricing = async (req, res) => {
  // Logic
  res.json({ message: 'Deleted' });
};

module.exports = { addPricing, updatePricing, deletePricing };