const mongoose = require('mongoose');
const connectDB = require('../config/db');

const testConnection = async () => {
  try {
    await connectDB();
    console.log('Connection successful');
    mongoose.connection.close();
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
};

testConnection();