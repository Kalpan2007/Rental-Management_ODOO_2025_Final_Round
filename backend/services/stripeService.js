const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, bookingId, metadata = {}) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Rental Booking Payment',
          description: `Booking ID: ${bookingId}`,
        },
        unit_amount: Math.round(amount * 100), // Convert to cents and ensure integer
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_URL}/bookings/${bookingId}?payment_success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/bookings/${bookingId}?payment_cancelled=true`,
    metadata: {
      bookingId,
      ...metadata
    }
  });

  return session;
};

const confirmPayment = async (paymentIntentId) => {
  return await stripe.paymentIntents.confirm(paymentIntentId);
};

const generateInvoice = async (bookingId, customerEmail, amount, description) => {
  // Create a customer
  const customer = await stripe.customers.create({
    email: customerEmail,
    metadata: { bookingId }
  });

  // Create an invoice item
  await stripe.invoiceItems.create({
    customer: customer.id,
    amount: Math.round(amount * 100),
    currency: 'usd',
    description: description || `Rental Booking #${bookingId}`,
  });

  // Create and finalize the invoice
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    auto_advance: true,
    collection_method: 'send_invoice',
    days_until_due: 30,
  });

  await stripe.invoices.finalizeInvoice(invoice.id);
  return invoice;
};

module.exports = { createPaymentIntent, confirmPayment, generateInvoice };