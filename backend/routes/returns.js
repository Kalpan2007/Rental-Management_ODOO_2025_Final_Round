// routes/returns.js
const express = require('express');
const { listLate, applyPenalty } = require('../controllers/returnController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/late', protect, admin, listLate);
router.put('/:id/penalty', protect, admin, applyPenalty);

module.exports = router;