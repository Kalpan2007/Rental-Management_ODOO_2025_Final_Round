const Booking = require('../models/Booking');

// List late returns
const listLate = async (req, res) => {
  const late = await Booking.find({ endDate: { $lt: Date.now() }, status: { $ne: 'completed' } });
  res.json(late);
};

// Apply penalty
const applyPenalty = async (req, res) => {
  const { lateFee } = req.body;
  const booking = await Booking.findByIdAndUpdate(req.params.id, { lateFee }, { new: true });
  // Send notification
  res.json(booking);
};

module.exports = { listLate, applyPenalty };