const express = require('express');
const { signup, login, me, signupSchema, loginSchema } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, me);

module.exports = router;