import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'react-toastify';
import {
  CreditCardIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const StripeCheckout = ({ product, onClose }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [customPrice, setCustomPrice] = useState(product?.basePrice || product?.price || 100);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [quantity, setQuantity] = useState(1);

  // Calculate rental duration
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  // Calculate pricing breakdown
  const calculatePricing = () => {
    const days = calculateDays();
    const subtotal = customPrice * days * quantity;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    return {
      days,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    if (customPrice <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('End date must be after start date');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product._id,
          customPrice: parseFloat(customPrice),
          startDate,
          endDate,
          quantity
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to initiate checkout');
      setLoading(false);
    }
  };

  const pricing = calculatePricing();

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden ${
          darkMode ? 'bg-[#603808]' : 'bg-white'
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className={`px-8 py-6 border-b ${
          darkMode ? 'border-[#8b5e34] bg-[#583101]' : 'border-[#d4a276] bg-[#ffedd8]'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Rental Checkout
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-[#8b5e34] text-[#e7bc91]' 
                  : 'hover:bg-[#f3d5b5] text-[#6f4518]'
              }`}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Product Info */}
          <div className="flex items-center space-x-4 mb-8">
            <img 
              src={product?.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop'} 
              alt={product?.name}
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div>
              <h3 className={`text-xl font-bold ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                {product?.name}
              </h3>
              <p className={`${
                darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
              }`}>
                {product?.category}
              </p>
              <p className={`text-sm ${
                darkMode ? 'text-[#d4a276]' : 'text-[#6f4518]'
              }`}>
                Suggested: ₹{product?.basePrice || product?.price || 100}/day
              </p>
            </div>
          </div>

          {/* Rental Details Form */}
          <div className="space-y-6">
            {/* Custom Price */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                <CurrencyRupeeIcon className="h-4 w-4 inline mr-1" />
                Your Price (per day)
              </label>
              <input
                type="number"
                min="1"
                max="100000"
                step="0.01"
                value={customPrice}
                onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                    : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                }`}
                placeholder="Enter your price"
              />
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  <CalendarDaysIcon className="h-4 w-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                      : 'border-[#d4a276] bg-white text-[#583101] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
                }`}>
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                      : 'border-[#d4a276] bg-white text-[#583101] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                  }`}
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className={`block text-sm font-bold mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                    : 'border-[#d4a276] bg-white text-[#583101] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                }`}
              />
            </div>

            {/* Price Breakdown */}
            <div className={`p-6 rounded-xl border-2 ${
              darkMode 
                ? 'border-[#8b5e34] bg-[#6f4518]/20' 
                : 'border-[#d4a276] bg-[#f3d5b5]/30'
            }`}>
              <h4 className={`font-bold text-lg mb-4 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Price Breakdown
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>
                    ₹{customPrice} × {pricing.days} day(s) × {quantity}
                  </span>
                  <span className={`font-semibold ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    ₹{pricing.subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>
                    GST (18%)
                  </span>
                  <span className={`font-semibold ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    ₹{pricing.tax}
                  </span>
                </div>
                <div className={`border-t-2 pt-3 flex justify-between text-xl font-bold ${
                  darkMode 
                    ? 'border-[#8b5e34] text-[#ffedd8]' 
                    : 'border-[#d4a276] text-[#583101]'
                }`}>
                  <span>Total Amount</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className={`p-4 rounded-xl flex items-center space-x-3 ${
              darkMode 
                ? 'bg-[#8b5e34]/20 border border-[#bc8a5f]/30' 
                : 'bg-[#e7bc91]/20 border border-[#d4a276]/30'
            }`}>
              <ShieldCheckIcon className={`h-6 w-6 ${
                darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
              }`} />
              <p className={`text-sm ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
              }`}>
                Secure payment powered by Stripe. Your card details are encrypted and safe.
              </p>
            </div>

            {/* Checkout Button */}
            <motion.button
              onClick={handleCheckout}
              disabled={loading || !customPrice || customPrice <= 0}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode
                  ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] shadow-lg hover:shadow-xl'
                  : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] shadow-lg hover:shadow-xl'
              }`}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" />
                  <span className="ml-3">Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCardIcon className="h-6 w-6 mr-3" />
                  Pay ₹{pricing.total} with Stripe
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StripeCheckout;