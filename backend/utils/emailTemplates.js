const bookingConfirmation = (booking) => `
  <h1>Booking Confirmed</h1>
  <p>Your booking for ${booking.productId.name} from ${booking.startDate} to ${booking.endDate} is confirmed.</p>
`;

// Add other templates similarly: paymentReceipt, pickupReminder, returnReminder, lateAlert, cancellationNotice, penaltyNotice

module.exports = {
  bookingConfirmation,
  // ... other templates
};