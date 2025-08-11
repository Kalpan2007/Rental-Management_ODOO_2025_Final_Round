// routes/reports.js
const express = require('express');
const { mostRented, revenue, topCustomers, exportReport } = require('../controllers/reportController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/most-rented', protect, admin, mostRented);
router.get('/revenue', protect, admin, revenue);
router.get('/top-customers', protect, admin, topCustomers);
router.get('/export', protect, admin, exportReport);

module.exports = router;