const express = require('express');
const { createBooking, listBookings, getBooking, cancelBooking, confirmBooking, completeBooking } = require('../controllers/bookingController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, listBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/confirm', protect, admin, confirmBooking);
router.put('/:id/complete', protect, admin, completeBooking);

module.exports = router;