const express = require('express');
const { 
  createPricelist, 
  getPricelists, 
  getPricelistById, 
  updatePricelist, 
  deletePricelist, 
  addPricingRule,
  getProductPrice
} = require('../controllers/pricingController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

// Pricelist routes
router.post('/pricelists', protect, admin, createPricelist);
router.get('/pricelists', protect, getPricelists);
router.get('/pricelists/:id', protect, getPricelistById);
router.put('/pricelists/:id', protect, admin, updatePricelist);
router.delete('/pricelists/:id', protect, admin, deletePricelist);

// Pricing rule routes
router.post('/pricelists/:id/rules', protect, admin, addPricingRule);

// Product pricing calculation
router.get('/calculate', protect, getProductPrice);

module.exports = router;