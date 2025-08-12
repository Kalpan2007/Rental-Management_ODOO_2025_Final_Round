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
  contractUrl: { type: String },
  endUser: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  payments: [{
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamps on save
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes for efficient querying
bookingSchema.index({ customerId: 1 });
bookingSchema.index({ productId: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });
bookingSchema.index({ 'endUser.email': 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });

module.exports = mongoose.model('Booking', bookingSchema);