// mock-server.js - Simple server for testing without MongoDB
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Mock products data
const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with advanced camera features',
    category: 'Electronics',
    basePrice: 50,
    pricingRules: [{ durationType: 'day', price: 50, minimumDuration: 1 }],
    status: 'approved',
    images: ['https://via.placeholder.com/300x200?text=iPhone+14+Pro'],
    owner: { name: 'John Doe', email: 'john@example.com' }
  },
  {
    _id: '2',
    name: 'MacBook Pro',
    description: 'Powerful laptop for professionals',
    category: 'Electronics',
    basePrice: 75,
    pricingRules: [{ durationType: 'day', price: 75, minimumDuration: 1 }],
    status: 'approved',
    images: ['https://via.placeholder.com/300x200?text=MacBook+Pro'],
    owner: { name: 'Jane Smith', email: 'jane@example.com' }
  },
  {
    _id: '3',
    name: 'Canon EOS R5',
    description: 'Professional mirrorless camera',
    category: 'Photography',
    basePrice: 100,
    pricingRules: [{ durationType: 'day', price: 100, minimumDuration: 1 }],
    status: 'approved',
    images: ['https://via.placeholder.com/300x200?text=Canon+EOS+R5'],
    owner: { name: 'Mike Johnson', email: 'mike@example.com' }
  }
];

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Mock server is running!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Mock products route
app.get('/api/products', (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;
  
  let filteredProducts = [...mockProducts];
  
  // Apply filters
  if (search) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.basePrice >= parseFloat(minPrice)
    );
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.basePrice <= parseFloat(maxPrice)
    );
  }
  
  res.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
    page: 1,
    totalPages: 1
  });
});

// Mock single product route
app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ 
      success: false,
      message: 'Product not found' 
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Mock availability check
app.get('/api/products/availability/:id', (req, res) => {
  const { startDate, endDate } = req.query;
  
  res.json({
    success: true,
    data: {
      isAvailable: true,
      message: 'Product is available for selected dates'
    }
  });
});

// Mock booking creation
app.post('/api/bookings', (req, res) => {
  const { productId, startDate, endDate, totalPrice, endUser } = req.body;
  
  const mockBooking = {
    _id: 'booking_' + Date.now(),
    productId,
    startDate,
    endDate,
    totalPrice,
    endUser,
    status: 'pending',
    customerId: 'user_123',
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    data: mockBooking
  });
});

// Mock payment creation
app.post('/api/payments', (req, res) => {
  const { bookingId, amount } = req.body;
  
  res.json({
    sessionId: 'cs_test_' + Date.now(),
    sessionUrl: 'https://checkout.stripe.com/pay/cs_test_' + Date.now(),
    paymentId: 'pi_' + Date.now(),
    amount: amount,
    currency: 'usd',
    paymentMethod: 'stripe'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log(`Test the server: http://localhost:${PORT}/api/test`);
  console.log(`Products API: http://localhost:${PORT}/api/products`);
});
