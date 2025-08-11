const mongoose = require('mongoose');

const pricelistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, for customer-specific
  productCategory: { type: String },
  rules: [
    {
      durationType: { type: String },
      price: { type: Number },
      discount: { type: Number },
      startDate: { type: Date },
      endDate: { type: Date },
    }
  ],
  validityStart: { type: Date },
  validityEnd: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pricelist', pricelistSchema);