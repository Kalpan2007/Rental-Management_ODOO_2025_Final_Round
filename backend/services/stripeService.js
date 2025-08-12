const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe payment methods
const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    return await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  } catch (error) {
    console.error('Stripe payment intent creation error:', error);
    throw new Error('Failed to create payment intent');
  }
};

const confirmPayment = async (paymentIntentId) => {
  try {
    return await stripe.paymentIntents.confirm(paymentIntentId);
  } catch (error) {
    console.error('Stripe payment confirmation error:', error);
    throw new Error('Failed to confirm payment');
  }
};

const retrievePayment = async (paymentIntentId) => {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Stripe payment retrieval error:', error);
    throw new Error('Failed to retrieve payment');
  }
};

// Razorpay payment methods (if you want to add Razorpay support)
const createRazorpayOrder = async (amount, currency = 'INR') => {
  try {
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
    };

    return await razorpay.orders.create(options);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    throw new Error('Failed to create Razorpay order');
  }
};

const verifyRazorpayPayment = async (paymentId, orderId, signature) => {
  try {
    const crypto = require('crypto');
    const Razorpay = require('razorpay');
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const text = orderId + '|' + paymentId;
    const signature_expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (signature_expected === signature) {
      return { verified: true };
    } else {
      return { verified: false };
    }
  } catch (error) {
    console.error('Razorpay payment verification error:', error);
    throw new Error('Failed to verify Razorpay payment');
  }
};

module.exports = { 
  createPaymentIntent, 
  confirmPayment, 
  retrievePayment,
  createRazorpayOrder,
  verifyRazorpayPayment
};