// routes/products.js
const express = require('express');
const { createProduct, listProducts, getProduct, updateProduct, deleteProduct, checkAvailability, getProductCalendar } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');
// Assume multer for file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', protect, admin, upload.array('images'), createProduct);
router.get('/', listProducts); // Public for browsing
// Specific routes with fixed paths should come before routes with parameters
router.get('/calendar/:id', getProductCalendar); // Get availability calendar for a product
router.get('/availability/:id', checkAvailability); // Check availability for specific dates
// Routes with parameters
router.get('/:id', getProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;