const express = require('express');
const { createPayment, verifyPayment, getPayment } = require('../controllers/paymentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/create', protect, createPayment);
router.post('/verify', protect, verifyPayment);
router.get('/:bookingId', protect, getPayment);

module.exports = router;