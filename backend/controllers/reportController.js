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

// Export report (CSV/PDF)
const exportReport = async (req, res) => {
  try {
    const { type, format } = req.query;
    
    if (!type) {
      return res.status(400).json({ message: 'Report type is required' });
    }
    
    if (format === 'pdf') {
      // Handle PDF export
      return res.status(501).json({ message: 'PDF export not implemented yet' });
    }
    
    // Default to CSV export
    const csvService = require('../services/csvService');
    let data;
    let filePath;
    
    switch (type) {
      case 'bookings':
        const bookings = await Booking.find()
          .populate('customerId', 'name email')
          .populate('productId', 'name');
        filePath = await csvService.generateBookingsReport(bookings);
        break;
        
      case 'revenue':
        const revenueData = await Booking.aggregate([
          { $match: { paymentStatus: 'paid' } },
          { $group: { 
              _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
              revenue: { $sum: '$totalPrice' },
              bookings: { $sum: 1 }
            }
          },
          { $project: {
              _id: 0,
              period: '$_id',
              revenue: 1,
              bookings: 1,
              avgBookingValue: { $divide: ['$revenue', '$bookings'] }
            }
          },
          { $sort: { period: 1 } }
        ]);
        filePath = await csvService.generateRevenueReport(revenueData);
        break;
        
      case 'products':
        const productData = await Booking.aggregate([
          { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } },
          { $unwind: '$product' },
          { $group: {
              _id: '$productId',
              product: { $first: '$product.name' },
              bookings: { $sum: 1 },
              revenue: { $sum: '$totalPrice' },
              totalDays: { $sum: { $divide: [{ $subtract: ['$endDate', '$startDate'] }, 1000 * 60 * 60 * 24] } }
            }
          },
          { $project: {
              _id: 0,
              product: 1,
              bookings: 1,
              revenue: 1,
              avgDuration: { $divide: ['$totalDays', '$bookings'] }
            }
          },
          { $sort: { bookings: -1 } }
        ]);
        filePath = await csvService.generateProductReport(productData);
        break;
        
      case 'customers':
        const customerData = await Booking.aggregate([
          { $lookup: { from: 'users', localField: 'customerId', foreignField: '_id', as: 'customer' } },
          { $unwind: '$customer' },
          { $group: {
              _id: '$customerId',
              customer: { $first: '$customer.name' },
              email: { $first: '$customer.email' },
              bookings: { $sum: 1 },
              totalSpent: { $sum: '$totalPrice' },
              lastBooking: { $max: '$createdAt' }
            }
          },
          { $project: {
              _id: 0,
              customer: 1,
              email: 1,
              bookings: 1,
              totalSpent: 1,
              lastBooking: { $dateToString: { format: '%Y-%m-%d', date: '$lastBooking' } }
            }
          },
          { $sort: { totalSpent: -1 } }
        ]);
        filePath = await csvService.generateCustomerReport(customerData);
        break;
        
      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }
    
    res.json({ message: 'Report exported successfully', filePath });
  } catch (error) {
    console.error('Error exporting report:', error);
    res.status(500).json({ message: 'Error exporting report', error: error.message });
  }
};

module.exports = { mostRented, revenue, topCustomers, exportReport };