const express = require('express');
const { addPricing, updatePricing, deletePricing } = require('../controllers/pricingController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, admin, addPricing);
router.put('/:id', protect, admin, updatePricing);
router.delete('/:id', protect, admin, deletePricing);

module.exports = router;