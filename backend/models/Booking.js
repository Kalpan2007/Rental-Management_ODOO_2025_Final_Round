const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid', 'refunded'], default: 'unpaid' },
  pickupDate: { type: Date },
  returnDate: { type: Date },
  lateFee: { type: Number, default: 0 },
  contractUrl: { type: String }, // URL to generated contract PDF
  endUser: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }], // Multiple payments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bookingSchema.index({ customerId: 1 });
bookingSchema.index({ productId: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);