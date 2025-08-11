// routes/products.js
const express = require('express');
const { createProduct, listProducts, getProduct, updateProduct, deleteProduct, checkAvailability } = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');
// Assume multer for file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', protect, admin, upload.array('images'), createProduct);
router.get('/', listProducts); // Public for browsing
router.get('/:id', getProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.get('/availability/:id', checkAvailability);

module.exports = router;