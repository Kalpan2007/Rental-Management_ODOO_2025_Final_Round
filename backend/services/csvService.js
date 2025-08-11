const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Generate a CSV file from data
 * @param {string} filename - The filename for the CSV
 * @param {Array} headers - Array of header objects with id and title
 * @param {Array} records - Array of data records
 * @returns {Promise<string>} - The path to the generated CSV
 */
const generateCsv = async (filename, headers, records) => {
  const csvPath = path.join(uploadsDir, `${filename}.csv`);
  const csvWriter = createCsvWriter({
    path: csvPath,
    header: headers
  });

  await csvWriter.writeRecords(records);
  return `/uploads/${filename}.csv`;
};

/**
 * Generate a bookings report CSV
 * @param {Array} bookings - Array of booking objects
 * @returns {Promise<string>} - The path to the generated CSV
 */
const generateBookingsReport = async (bookings) => {
  const headers = [
    { id: 'id', title: 'Booking ID' },
    { id: 'customer', title: 'Customer' },
    { id: 'product', title: 'Product' },
    { id: 'startDate', title: 'Start Date' },
    { id: 'endDate', title: 'End Date' },
    { id: 'totalPrice', title: 'Total Price' },
    { id: 'status', title: 'Status' },
    { id: 'paymentStatus', title: 'Payment Status' }
  ];

  const records = bookings.map(booking => ({
    id: booking._id.toString(),
    customer: booking.customerId.name,
    product: booking.productId.name,
    startDate: new Date(booking.startDate).toLocaleDateString(),
    endDate: new Date(booking.endDate).toLocaleDateString(),
    totalPrice: booking.totalPrice.toFixed(2),
    status: booking.status,
    paymentStatus: booking.paymentStatus
  }));

  return generateCsv('bookings_report', headers, records);
};

/**
 * Generate a revenue report CSV
 * @param {Array} revenueData - Array of revenue data objects
 * @returns {Promise<string>} - The path to the generated CSV
 */
const generateRevenueReport = async (revenueData) => {
  const headers = [
    { id: 'period', title: 'Period' },
    { id: 'revenue', title: 'Revenue' },
    { id: 'bookings', title: 'Number of Bookings' },
    { id: 'avgBookingValue', title: 'Average Booking Value' }
  ];

  return generateCsv('revenue_report', headers, revenueData);
};

/**
 * Generate a product popularity report CSV
 * @param {Array} productData - Array of product data objects
 * @returns {Promise<string>} - The path to the generated CSV
 */
const generateProductReport = async (productData) => {
  const headers = [
    { id: 'product', title: 'Product' },
    { id: 'bookings', title: 'Number of Bookings' },
    { id: 'revenue', title: 'Total Revenue' },
    { id: 'avgDuration', title: 'Average Rental Duration (days)' }
  ];

  return generateCsv('product_report', headers, productData);
};

/**
 * Generate a customer report CSV
 * @param {Array} customerData - Array of customer data objects
 * @returns {Promise<string>} - The path to the generated CSV
 */
const generateCustomerReport = async (customerData) => {
  const headers = [
    { id: 'customer', title: 'Customer' },
    { id: 'email', title: 'Email' },
    { id: 'bookings', title: 'Number of Bookings' },
    { id: 'totalSpent', title: 'Total Spent' },
    { id: 'lastBooking', title: 'Last Booking Date' }
  ];

  return generateCsv('customer_report', headers, customerData);
};

// Legacy function for backward compatibility
const exportReport = (reportType, data, callback) => {
  const headers = Object.keys(data[0]).map(key => ({ id: key, title: key }));
  generateCsv(reportType, headers, data)
    .then(filePath => callback(filePath))
    .catch(err => console.error('Error exporting report:', err));
};

module.exports = {
  exportReport,
  generateCsv,
  generateBookingsReport,
  generateRevenueReport,
  generateProductReport,
  generateCustomerReport
};