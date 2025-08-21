// app.js
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/stripe', require('./routes/stripe'));
app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/returns', require('./routes/returns'));

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'RentalEase API', version: '1.0.0' },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));