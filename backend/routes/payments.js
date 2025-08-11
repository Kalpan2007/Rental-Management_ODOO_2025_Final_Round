const express = require('express');
const { createPayment, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Payment creation and verification
router.post('/create', protect, createPayment);
router.post('/verify', protect, verifyPayment);

// Payment history for a booking
router.get('/history/:bookingId', protect, getPaymentHistory);

module.exports = router;