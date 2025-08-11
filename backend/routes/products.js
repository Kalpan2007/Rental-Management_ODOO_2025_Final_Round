// routes/products.js
const express = require('express');
const { 
  createProduct, 
  listProducts, 
  getProduct, 
  updateProduct, 
  deleteProduct, 
  checkAvailability, 
  getProductCalendar,
  moderateProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');
// Assume multer for file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Product creation and management (available to all authenticated users)
router.post('/', protect, upload.array('images'), createProduct);
router.put('/:id', protect, upload.array('images'), updateProduct);
router.delete('/:id', protect, deleteProduct);

// Product moderation (admin only)
router.post('/:id/moderate', protect, admin, moderateProduct);

// Public routes for browsing products
router.get('/', protect, listProducts); // Protected to filter by user role
router.get('/:id', protect, getProduct); // Protected to handle visibility rules

// Availability checking
router.get('/calendar/:id', protect, getProductCalendar);
router.get('/availability/:id', protect, checkAvailability);

module.exports = router;