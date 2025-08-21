const express = require('express');
const { 
  createCheckoutSession, 
  handleWebhook, 
  getCheckoutSession,
  createPaymentIntent 
} = require('../controllers/stripeController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Webhook route (must be before express.json() middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Protected routes
router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/checkout-session/:sessionId', protect, getCheckoutSession);

module.exports = router;