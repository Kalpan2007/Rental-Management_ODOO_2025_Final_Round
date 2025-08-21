const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middlewares/auth');
const Booking = require('../models/Booking');
const Product = require('../models/Product');
const User = require('../models/User');
const Payment = require('../models/Payment');

const router = express.Router();

// Create Stripe checkout session with custom pricing
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { productId, customPrice, startDate, endDate, quantity = 1 } = req.body;
    
    if (!productId || !customPrice || !startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Product ID, custom price, start date, and end date are required' 
      });
    }

    // Validate custom price
    const price = parseFloat(customPrice);
    if (price <= 0 || price > 100000) {
      return res.status(400).json({ 
        message: 'Custom price must be between ₹1 and ₹100,000' 
      });
    }

    // Get product details
    const product = await Product.findById(productId).populate('owner');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is approved and available
    if (product.status !== 'approved') {
      return res.status(400).json({ message: 'Product is not approved for rental' });
    }

    // Calculate rental duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid rental period' });
    }

    // Calculate total amount
    const subtotal = price * days * quantity;
    const tax = subtotal * 0.18; // 18% GST
    const totalAmount = subtotal + tax;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      currency: 'inr',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${product.name} - Rental`,
              description: `${days} day(s) rental from ${start.toDateString()} to ${end.toDateString()}`,
              images: product.images && product.images.length > 0 ? [product.images[0]] : [],
            },
            unit_amount: Math.round(totalAmount * 100), // Convert to paise
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: productId,
        customerId: req.user.id,
        customPrice: price.toString(),
        startDate: startDate,
        endDate: endDate,
        days: days.toString(),
        quantity: quantity.toString(),
        subtotal: subtotal.toString(),
        tax: tax.toString(),
        totalAmount: totalAmount.toString(),
        productOwnerId: product.owner._id.toString()
      },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/cancel`,
      customer_email: req.user.email || undefined,
    });

    res.json({ 
      sessionId: session.id,
      url: session.url,
      amount: totalAmount,
      currency: 'INR'
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      message: 'Failed to create checkout session',
      error: error.message 
    });
  }
});

// Handle Stripe webhooks
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
      
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Handle successful checkout
const handleCheckoutCompleted = async (session) => {
  try {
    const { 
      productId, 
      customerId, 
      customPrice, 
      startDate, 
      endDate, 
      days,
      quantity,
      subtotal,
      tax,
      totalAmount,
      productOwnerId
    } = session.metadata;

    // Create booking record
    const booking = new Booking({
      customerId: customerId,
      productId: productId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      unitPrice: parseFloat(customPrice),
      totalPrice: parseFloat(totalAmount),
      status: 'confirmed',
      paymentStatus: 'paid',
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent
    });

    await booking.save();

    // Create payment record
    const payment = new Payment({
      bookingId: booking._id,
      amount: parseFloat(totalAmount),
      paymentMethod: 'stripe',
      status: 'completed',
      transactionId: session.payment_intent
    });

    await payment.save();

    // Send confirmation email
    const user = await User.findById(customerId);
    const product = await Product.findById(productId);
    
    if (user && product) {
      const sendEmail = require('../services/emailService');
      await sendEmail(
        user.email,
        'Booking Confirmation - RentalHub',
        `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${user.name},</p>
        <p>Your booking for <strong>${product.name}</strong> has been confirmed.</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li>Product: ${product.name}</li>
          <li>Rental Period: ${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}</li>
          <li>Duration: ${days} days</li>
          <li>Custom Price: ₹${customPrice}/day</li>
          <li>Total Amount: ₹${totalAmount}</li>
        </ul>
        <p>Thank you for choosing RentalHub!</p>
        `
      );
    }

    console.log('Booking created successfully:', booking._id);
  } catch (error) {
    console.error('Error handling checkout completion:', error);
  }
};

// Handle successful payment
const handlePaymentSucceeded = async (paymentIntent) => {
  try {
    const booking = await Booking.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });
    
    if (booking && booking.paymentStatus !== 'paid') {
      booking.paymentStatus = 'paid';
      booking.paidAt = new Date();
      await booking.save();
      console.log('Payment confirmed for booking:', booking._id);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

// Handle failed payment
const handlePaymentFailed = async (paymentIntent) => {
  try {
    const booking = await Booking.findOne({ 
      stripePaymentIntentId: paymentIntent.id 
    });
    
    if (booking) {
      booking.paymentStatus = 'failed';
      booking.status = 'cancelled';
      await booking.save();
      console.log('Payment failed for booking:', booking._id);
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};

// Get checkout session details
router.get('/checkout-session/:sessionId', protect, async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });

    // Find associated booking
    const booking = await Booking.findOne({ stripeSessionId: sessionId })
      .populate('productId')
      .populate('customerId');

    res.json({
      session,
      booking,
      success: session.payment_status === 'paid'
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ 
      message: 'Failed to retrieve session details',
      error: error.message 
    });
  }
});

module.exports = router;