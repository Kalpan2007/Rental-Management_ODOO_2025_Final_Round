import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getProductById } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  CreditCardIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [customPrice, setCustomPrice] = useState('');
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        if (response.success) {
          setProduct(response.data);
          setCustomPrice(response.data.price?.toString() || '100');
        } else {
          toast.error('Product not found');
          navigate('/products');
        }
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setRentalDays(diffDays || 1);
    }
  }, [startDate, endDate]);

  const calculateTotal = () => {
    const price = parseFloat(customPrice) || 0;
    const total = price * rentalDays;
    const tax = total * 0.18; // 18% GST
    return {
      subtotal: total,
      tax: tax,
      total: total + tax
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!customPrice || parseFloat(customPrice) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setProcessing(true);

    try {
      const { subtotal, tax, total } = calculateTotal();
      
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // Convert to paise
          currency: 'inr',
          productId: product._id,
          customPrice: parseFloat(customPrice),
          rentalDays,
          startDate,
          endDate,
          metadata: {
            productName: product.name,
            customerEmail: user.email,
            customerId: user._id
          }
        })
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        toast.error(error);
        setProcessing(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (stripeError) {
        toast.error(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        navigate(`/payment/success?payment_intent=${paymentIntent.id}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Product Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className="text-2xl font-bold mb-6">Rental Summary</h2>
            
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/100'} 
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{product.category}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Original Price: ₹{product.price}/day
                </p>
              </div>
            </div>

            {/* Custom Pricing */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <CurrencyRupeeIcon className="h-4 w-4 inline mr-1" />
                  Custom Price (per day)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="input w-full"
                  placeholder="Enter your price"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    className="input w-full"
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className="font-semibold mb-3">Price Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>₹{customPrice} × {rentalDays} days</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <CreditCardIcon className="h-4 w-4 inline mr-1" />
                  Card Information
                </label>
                <div className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: darkMode ? '#ffffff' : '#424770',
                          '::placeholder': {
                            color: darkMode ? '#9ca3af' : '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!stripe || processing || !customPrice}
                className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Processing Payment...</span>
                  </>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By completing this purchase, you agree to our{' '}
                <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;