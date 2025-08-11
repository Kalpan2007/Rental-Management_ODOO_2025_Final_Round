// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validate = require('../middlewares/validation');
const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'User exists' });

  user = new User({ name, email, password: await bcrypt.hash(password, 10), role });
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

module.exports = { signup, login, me, signupSchema, loginSchema };