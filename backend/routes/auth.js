// routes/auth.js (Add verify OTP route)
const express = require('express');
const { signup, verifyOtp, login, me } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('customer', 'admin').default('customer')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const otpSchema = Joi.object({ email: Joi.string().email().required(), otp: Joi.string().required() });
const router = express.Router();
router.post('/signup', validate(signupSchema), signup);
router.post('/verify-otp', validate(otpSchema), verifyOtp);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, me);

module.exports = router;