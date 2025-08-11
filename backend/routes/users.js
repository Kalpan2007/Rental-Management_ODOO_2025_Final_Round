// routes/users.js
const express = require('express');
const { listUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', protect, admin, listUsers);
router.get('/:id', protect, admin, getUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;