const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  images: [{ type: String }],
  unitType: { type: String, enum: ['hour', 'day', 'week', 'month'], required: true, default: 'day' },
  basePrice: { type: Number, required: true }, // Base price per day
  pricingRules: [{
    durationType: { type: String, enum: ['hour', 'day', 'week', 'month'], required: true },
    price: { type: Number, required: true },
    minimumDuration: { type: Number, default: 1 }
  }],
  seasonalPricing: [{
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true }
  }],
  discounts: [{
    type: { type: String, enum: ['percentage', 'fixed'], required: true },
    value: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    minimumDuration: { type: Number }
  }],
  // Added owner reference
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  // Added status for product moderation
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  // Added rejection reason for admin feedback
  rejectionReason: { 
    type: String
  },
  // Updated availability to support ranges instead of individual dates
  availability: [{ 
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isAvailable: { type: Boolean, default: true },
    reason: { type: String } // Optional reason for unavailability (e.g., maintenance, booked)
  }],
  quantity: { type: Number, default: 1 }, // Support for multiple units of the same product
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.index({ category: 1 });
productSchema.index({ name: 'text' });
productSchema.index({ owner: 1 }); // Added index for owner queries

// Method to check if product is available for a date range
productSchema.methods.isAvailableForRange = async function(startDate, endDate, quantity = 1) {
  // Convert to Date objects if they're not already
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  
  // Only approved products can be rented
  if (this.status !== 'approved') return false;

  // Check if any availability range overlaps with the requested period
  const unavailablePeriods = this.availability.filter(period => {
    // Skip available periods
    if (period.isAvailable) return false;
    
    // Check for overlap
    return (
      (startDate <= period.endDate && endDate >= period.startDate)
    );
  });
  
  // Check for overlapping bookings
  const Booking = mongoose.model('Booking');
  const overlappingBookings = await Booking.find({
    productId: this._id,
    status: { $nin: ['cancelled', 'completed'] },
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  });
  
  // Product is available if no unavailable periods and no overlapping bookings
  return unavailablePeriods.length === 0 && overlappingBookings.length === 0 && this.quantity >= quantity;
};

module.exports = mongoose.model('Product', productSchema);