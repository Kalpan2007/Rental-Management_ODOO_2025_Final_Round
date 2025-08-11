const cron = require('node-cron');
const Booking = require('../models/Booking');
const sendEmail = require('./emailService');
const { bookingConfirmation, /* other templates */ } = require('../utils/emailTemplates');

// Schedule reminders
cron.schedule('0 * * * *', async () => { // Hourly check
  const bookings = await Booking.find({ status: 'confirmed' }).populate('productId customerId');
  const pickupHours = process.env.PICKUP_REMINDER_HOURS;
  const returnDays = process.env.RETURN_REMINDER_DAYS;

  bookings.forEach(booking => {
    // Check for pickup reminder
    if (new Date(booking.pickupDate) - Date.now() <= pickupHours * 60 * 60 * 1000) {
      sendEmail(booking.endUser.email, 'Pickup Reminder', 'pickup template');
      // Similarly for others
    }
    // Add checks for return, late, etc.
  });
});

// Function to send immediate notifications
const sendBookingConfirmation = async (booking) => {
  await sendEmail(booking.customerId.email, 'Booking Confirmation', bookingConfirmation(booking));
  if (booking.endUser.email) await sendEmail(booking.endUser.email, 'Booking Confirmation', bookingConfirmation(booking));
};

// Export other send functions similarly

module.exports = { sendBookingConfirmation /*, others */ };