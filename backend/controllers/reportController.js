const Booking = require('../models/Booking');
const Report = require('../models/Report');

// Most rented products
const mostRented = async (req, res) => {
  const data = await Booking.aggregate([
    { $group: { _id: '$productId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  const report = new Report({ reportType: 'most-rented', data });
  await report.save();
  res.json(data);
};

// Revenue
const revenue = async (req, res) => {
  const data = await Booking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  res.json(data);
};

// Top customers
const topCustomers = async (req, res) => {
  const data = await Booking.aggregate([
    { $group: { _id: '$customerId', totalSpent: { $sum: '$totalPrice' } } },
    { $sort: { totalSpent: -1 } },
  ]);
  res.json(data);
};

// Export report (placeholder for CSV/PDF)
const exportReport = async (req, res) => {
  // Use csv-writer or pdfkit
  res.json({ message: 'Exported' });
};

module.exports = { mostRented, revenue, topCustomers, exportReport };