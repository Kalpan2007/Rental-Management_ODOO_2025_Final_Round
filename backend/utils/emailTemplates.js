const bookingConfirmation = (booking) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50; text-align: center;">Booking Confirmation</h1>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h2 style="color: #34495e; margin-bottom: 15px;">Booking Details</h2>
      <p><strong>Product:</strong> ${booking.productId.name}</p>
      <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>
      <p><strong>Total Price:</strong> $${booking.totalPrice.toFixed(2)}</p>
      <p><strong>Status:</strong> ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h2 style="color: #34495e; margin-bottom: 15px;">Customer Details</h2>
      <p><strong>Name:</strong> ${booking.endUser.firstName} ${booking.endUser.lastName}</p>
      <p><strong>Email:</strong> ${booking.endUser.email}</p>
      <p><strong>Phone:</strong> ${booking.endUser.phone || 'Not provided'}</p>
    </div>
    <div style="text-align: center; margin-top: 30px; color: #7f8c8d;">
      <p>Thank you for choosing our service!</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
    </div>
  </div>
`;

module.exports = {
  bookingConfirmation,
  // ... other templates
};