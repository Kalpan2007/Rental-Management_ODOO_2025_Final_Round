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

// Method to check if product is available for a date range
productSchema.methods.isAvailableForRange = function(startDate, endDate, quantity = 1) {
  // Convert to Date objects if they're not already
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  
  // Check if any availability range overlaps with the requested period
  const unavailablePeriods = this.availability.filter(period => {
    // Skip available periods
    if (period.isAvailable) return false;
    
    // Check for overlap
    return (
      (startDate <= period.endDate && endDate >= period.startDate)
    );
  });
  
  // Count active bookings for this period to check quantity
  // This would need to be implemented with a Booking model query
  // For now, just check if there are unavailable periods
  return unavailablePeriods.length === 0 && this.quantity >= quantity;
};

module.exports = mongoose.model('Product', productSchema);