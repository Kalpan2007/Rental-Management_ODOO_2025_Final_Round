const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  images: [{ type: String }],
  unitType: { type: String, enum: ['hour', 'day', 'week', 'month'], required: true },
  pricingRules: [{ durationType: { type: String }, price: { type: Number } }],
  seasonalPricing: [{ startDate: { type: Date }, endDate: { type: Date }, price: { type: Number } }],
  discounts: [{ type: { type: String }, value: { type: Number }, startDate: { type: Date }, endDate: { type: Date } }],
  availability: [{ date: { type: Date }, isAvailable: { type: Boolean, default: true } }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.index({ category: 1 });
productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);