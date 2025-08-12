// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI is undefined. Check .env file.');
    console.log('Using fallback MongoDB URI...');
    process.env.MONGODB_URI = 'mongodb://localhost:27017/rental_ease';
  }
  console.log('Attempting to connect to:', process.env.MONGODB_URI); // Debug
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Starting server without database connection...');
    // Don't exit, let the server start without DB for testing
  }
};

module.exports = connectDB;