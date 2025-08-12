// start-server.js
process.env.MONGODB_URI = 'mongodb://localhost:27017/rental_ease';
process.env.JWT_SECRET = 'test_jwt_secret_key_for_development_123456789';
process.env.PORT = '5000';
process.env.NODE_ENV = 'development';
process.env.FRONTEND_URL = 'http://localhost:5173';
process.env.STRIPE_SECRET_KEY = 'sk_test_51H1234567890abcdefghijklmnopqrstuvwxyz';
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_51H1234567890abcdefghijklmnopqrstuvwxyz';

console.log('Starting server with environment variables...');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

require('./app.js');
