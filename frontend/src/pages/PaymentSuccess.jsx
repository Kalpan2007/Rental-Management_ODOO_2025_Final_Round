import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ShareIcon,
  HomeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (!sessionId) {
          setError('No session ID found');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/stripe/checkout-session/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch payment details');
        }

        if (data.success) {
          setPaymentDetails(data);
          toast.success('Payment successful! Your booking is confirmed.');
        } else {
          setError('Payment was not successful');
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setError(error.message || 'Failed to load payment details');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && user) {
      fetchPaymentDetails();
    } else if (!user) {
      navigate('/login');
    } else {
      setError('Invalid payment session');
      setLoading(false);
    }
  }, [sessionId, user, navigate]);

  const shareSuccess = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rental Booking Confirmed!',
        text: `I just booked ${paymentDetails?.booking?.productId?.name} on RentalHub!`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Payment Error</h2>
          <p className="mb-6">{error}</p>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`rounded-2xl shadow-2xl p-8 text-center backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/90 border-[#8b5e34]/50' 
              : 'bg-white/90 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <CheckCircleIcon className="h-16 w-16 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Payment Successful! 🎉
            </h1>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Your rental booking has been confirmed
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentDetails && (
            <motion.div
              className={`rounded-xl p-6 mb-8 text-left border-2 ${
                darkMode 
                  ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                  : 'bg-[#f3d5b5]/30 border-[#d4a276]/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className={`font-bold text-xl mb-6 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Booking Details
              </h3>
              <div className="space-y-3">
                {paymentDetails.booking && (
                  <>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>Product:</span>
                      <span className={`font-semibold ${
                        darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                      }`}>
                        {paymentDetails.booking.productId?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>Rental Period:</span>
                      <span className={`font-semibold ${
                        darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                      }`}>
                        {paymentDetails.booking.days} day(s)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>Custom Price:</span>
                      <span className={`font-semibold ${
                        darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                      }`}>
                        ₹{paymentDetails.booking.unitPrice}/day
                      </span>
                    </div>
                    <div className={`border-t-2 pt-3 flex justify-between font-bold text-lg ${
                      darkMode 
                        ? 'border-[#8b5e34] text-[#ffedd8]' 
                        : 'border-[#d4a276] text-[#583101]'
                    }`}>
                      <span>Total Paid:</span>
                      <span className="text-green-600 dark:text-green-400">
                        ₹{paymentDetails.booking.totalPrice?.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
                {paymentDetails.session && (
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}>Payment ID:</span>
                    <span className={`font-mono text-sm ${
                      darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                    }`}>
                      {paymentDetails.session.id}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link 
                to="/my-bookings" 
                className={`flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                View My Bookings
              </Link>
              <button
                onClick={shareSuccess}
                className={`flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Success
              </button>
            </div>
            
            <Link 
              to="/" 
              className={`w-full flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                darkMode
                  ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
              }`}
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className={`mt-8 p-6 rounded-xl border-2 ${
              darkMode 
                ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                : 'bg-[#e7bc91]/20 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className={`font-bold text-lg mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              What's Next?
            </h4>
            <ul className={`text-sm space-y-2 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
            }`}>
              <li>• You'll receive a confirmation email shortly</li>
              <li>• The product owner will contact you for pickup details</li>
              <li>• Check your booking status in "My Bookings"</li>
              <li>• Rate your experience after the rental period</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;