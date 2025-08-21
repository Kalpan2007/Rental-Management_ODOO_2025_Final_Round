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
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  PhoneIcon
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
          toast.success('🎉 Payment successful! Your booking is confirmed.');
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
        text: `I just booked ${paymentDetails?.booking?.productId?.name} on RentalHub with custom pricing!`,
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
        darkMode 
          ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
          : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
      }`}>
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className={`mt-6 text-xl ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Processing your payment...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode 
          ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
          : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
      }`}>
        <div className="text-center">
          <div className="text-6xl mb-6">😞</div>
          <h2 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            Payment Error
          </h2>
          <p className="text-red-500 mb-8 text-lg">{error}</p>
          <Link 
            to="/products" 
            className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
            }`}
          >
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`rounded-3xl shadow-2xl p-12 text-center backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/90 border-[#8b5e34]/50' 
              : 'bg-white/90 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Animation */}
          <motion.div
            className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8 ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.5 }}
          >
            <CheckCircleIcon className="h-20 w-20 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className={`text-5xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              🎉 Payment Successful!
            </h1>
            <p className={`text-2xl mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Your rental booking has been confirmed with custom pricing
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentDetails && paymentDetails.booking && (
            <motion.div
              className={`rounded-2xl p-8 mb-8 text-left border-2 ${
                darkMode 
                  ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                  : 'bg-[#f3d5b5]/30 border-[#d4a276]/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className={`font-bold text-2xl mb-6 flex items-center ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                <DocumentTextIcon className="h-6 w-6 mr-2" />
                Booking Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Product:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      {paymentDetails.booking.productId?.name}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Rental Period:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      {Math.ceil((new Date(paymentDetails.booking.endDate) - new Date(paymentDetails.booking.startDate)) / (1000 * 60 * 60 * 24))} day(s)
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Custom Price:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      ₹{paymentDetails.booking.unitPrice}/day
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Start Date:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      {new Date(paymentDetails.booking.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className={`font-medium ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      End Date:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      {new Date(paymentDetails.booking.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className={`border-t-2 pt-4 flex justify-between text-xl font-bold ${
                    darkMode 
                      ? 'border-[#8b5e34] text-[#ffedd8]' 
                      : 'border-[#d4a276] text-[#583101]'
                  }`}>
                    <span>Total Paid:</span>
                    <span className="text-green-600 dark:text-green-400">
                      ₹{paymentDetails.booking.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              {paymentDetails.session && (
                <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <p className={`text-sm ${darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'}`}>
                    <strong>Payment ID:</strong> {paymentDetails.session.id}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link 
                to="/my-bookings" 
                className={`flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                <ShoppingBagIcon className="h-6 w-6 mr-3" />
                View My Bookings
              </Link>
              
              <button
                onClick={shareSuccess}
                className={`flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                <ShareIcon className="h-6 w-6 mr-3" />
                Share Success
              </button>
            </div>
            
            <Link 
              to="/" 
              className={`w-full flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
              }`}
            >
              <HomeIcon className="h-6 w-6 mr-3" />
              Continue Shopping
            </Link>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className={`mt-12 p-8 rounded-2xl border-2 ${
              darkMode 
                ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                : 'bg-[#e7bc91]/20 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className={`font-bold text-2xl mb-6 flex items-center justify-center ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              <CalendarDaysIcon className="h-6 w-6 mr-2" />
              What Happens Next?
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-[#bc8a5f] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                  }`}>
                    1
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      📧 Confirmation Email
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      You'll receive a detailed confirmation email shortly
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-[#bc8a5f] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                  }`}>
                    2
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      📞 Owner Contact
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      The product owner will contact you for pickup details
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-[#bc8a5f] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                  }`}>
                    3
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      🚚 Delivery/Pickup
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Coordinate delivery or pickup as per your preference
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    darkMode ? 'bg-[#bc8a5f] text-[#ffedd8]' : 'bg-[#8b5e34] text-[#ffedd8]'
                  }`}>
                    4
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'}`}>
                      ⭐ Rate Experience
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'}`}>
                      Share your experience after the rental period
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            className={`mt-12 p-6 rounded-2xl border-2 ${
              darkMode 
                ? 'bg-blue-900/20 border-blue-800' 
                : 'bg-blue-50 border-blue-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <h4 className={`font-bold text-lg mb-4 flex items-center justify-center ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <PhoneIcon className="h-5 w-5 mr-2" />
              Need Help?
            </h4>
            <p className={`text-center mb-4 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Our support team is here to help you with any questions
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/support" 
                className={`hover:underline font-semibold ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                📞 Contact Support
              </Link>
              <span className={`hidden sm:inline ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                •
              </span>
              <Link 
                to="/faq" 
                className={`hover:underline font-semibold ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              >
                ❓ View FAQ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;