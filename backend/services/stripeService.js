const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100, // in cents
    currency: 'usd',
  });
};

const confirmPayment = async (paymentIntentId) => {
  return await stripe.paymentIntents.confirm(paymentIntentId);
};

module.exports = { createPaymentIntent, confirmPayment };