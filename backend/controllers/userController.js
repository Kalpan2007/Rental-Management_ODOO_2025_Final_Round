const User = require('../models/User');

// List users (pagination, search)
const listUsers = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = search ? { name: { $regex: search, $options: 'i' } } : {};
  const users = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-password')
    .lean();
  res.json(users);
};

// Get user
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password').lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// Update user
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  res.json(user);
};

// Delete user
const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

module.exports = { listUsers, getUser, updateUser, deleteUser };