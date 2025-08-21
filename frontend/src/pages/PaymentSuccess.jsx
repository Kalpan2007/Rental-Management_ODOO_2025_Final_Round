import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { darkMode } = useTheme();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        // In a real app, you'd fetch payment details from your backend
        // For now, we'll use mock data
        setPaymentDetails({
          id: paymentIntentId,
          amount: 11800, // ₹118.00 in paise
          currency: 'inr',
          status: 'succeeded',
          product: {
            name: 'Professional Camera',
            category: 'Photography',
            rentalDays: 1,
            customPrice: 100
          },
          customer: {
            name: 'John Doe',
            email: 'john@example.com'
          },
          createdAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (paymentIntentId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
    }
  }, [paymentIntentId]);

  const shareSuccess = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rental Booking Confirmed!',
        text: `I just booked ${paymentDetails?.product?.name} on RentalHub!`,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Success Icon */}
          <motion.div
            className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your rental booking has been confirmed
            </p>
          </motion.div>

          {/* Payment Details */}
          {paymentDetails && (
            <motion.div
              className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 mb-8 text-left`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Product:</span>
                  <span className="font-medium">{paymentDetails.product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category:</span>
                  <span>{paymentDetails.product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rental Period:</span>
                  <span>{paymentDetails.product.rentalDays} day(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Custom Price:</span>
                  <span>₹{paymentDetails.product.customPrice}/day</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total Paid:</span>
                  <span className="text-green-600 dark:text-green-400">
                    ₹{(paymentDetails.amount / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment ID:</span>
                  <span className="font-mono text-sm">{paymentDetails.id}</span>
                </div>
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
              <Link to="/my-bookings" className="btn-primary flex items-center justify-center">
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                View My Bookings
              </Link>
              <button
                onClick={shareSuccess}
                className="btn-secondary flex items-center justify-center"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share Success
              </button>
            </div>
            
            <Link to="/products" className="btn-outline w-full flex items-center justify-center">
              Continue Shopping
            </Link>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
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