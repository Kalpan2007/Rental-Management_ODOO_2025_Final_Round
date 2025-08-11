import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getBooking, updateBookingStatus } from '../../api/bookings';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const BookingDetail = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const response = await getBooking(id);
        setBooking(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load booking details');
        setLoading(false);
        console.error('Error fetching booking:', err);
      }
    };

    fetchBooking();
  }, [id]);

  const handleUpdateStatus = async (newStatus) => {
    if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
      setProcessingAction(true);
      try {
        await updateBookingStatus(id, { status: newStatus });
        toast.success(`Booking marked as ${newStatus}`);
        
        // Update booking in state
        setBooking(prev => ({ ...prev, status: newStatus }));
      } catch (err) {
        toast.error('Failed to update booking status');
        console.error('Error updating booking status:', err);
      } finally {
        setProcessingAction(false);
      }
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get payment status badge color
  const getPaymentStatusBadgeColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get available actions based on booking status
  const getAvailableActions = (booking) => {
    const actions = [];
    
    switch (booking.status) {
      case 'pending':
        actions.push({ label: 'Confirm Booking', value: 'confirmed' });
        actions.push({ label: 'Cancel Booking', value: 'cancelled' });
        break;
      case 'confirmed':
        actions.push({ label: 'Mark as Active', value: 'active' });
        actions.push({ label: 'Cancel Booking', value: 'cancelled' });
        break;
      case 'active':
        actions.push({ label: 'Mark as Completed', value: 'completed' });
        actions.push({ label: 'Cancel Booking', value: 'cancelled' });
        break;
      case 'completed':
        // No actions for completed bookings
        break;
      case 'cancelled':
        // No actions for cancelled bookings
        break;
      default:
        break;
    }
    
    return actions;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <p className="text-red-500 text-xl">{error}</p>
            <button 
              onClick={() => navigate('/admin/bookings')}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
            >
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/admin/bookings')}
            className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Booking Details</h1>
        </div>

        {/* Booking ID and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
            <p className="text-lg font-semibold">{booking._id}</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadgeColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Customer and Booking Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Customer Information */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                  <p>{booking.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p>{booking.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p>{booking.user.phone || 'Not provided'}</p>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                    <p>{formatDate(booking.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                    <p>{formatDate(booking.endDate)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p>{booking.duration} {booking.duration === 1 ? 'day' : 'days'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Special Requests</p>
                  <p>{booking.specialRequests || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                  <p>{formatDateTime(booking.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                  <p>{formatDateTime(booking.updatedAt)}</p>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Payment Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusBadgeColor(booking.payment?.status || 'pending')}`}>
                    {booking.payment?.status ? (booking.payment.status.charAt(0).toUpperCase() + booking.payment.status.slice(1)) : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Daily Rate</p>
                  <p>{formatCurrency(booking.dailyRate)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p>{booking.duration} {booking.duration === 1 ? 'day' : 'days'}</p>
                </div>
                {booking.discount > 0 && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Discount</p>
                    <p className="text-green-600 dark:text-green-400">-{formatCurrency(booking.discount)}</p>
                  </div>
                )}
                {booking.tax > 0 && (
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tax</p>
                    <p>{formatCurrency(booking.tax)}</p>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">{formatCurrency(booking.totalPrice)}</p>
                </div>
                {booking.payment && (
                  <div className="pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Payment Method</p>
                    <div className="flex items-center">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded p-2 mr-2">
                        <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <span>{booking.payment.method || 'Credit Card'}</span>
                    </div>
                    {booking.payment.transactionId && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
                        <p className="font-mono text-sm">{booking.payment.transactionId}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right column - Product Info and Actions */}
          <div className="space-y-6">
            {/* Product Information */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={booking.product.imageUrl || 'https://via.placeholder.com/300'} 
                  alt={booking.product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{booking.product.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{booking.product.category}</p>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium">{formatCurrency(booking.product.price)}<span className="text-sm text-gray-500 dark:text-gray-400"> / day</span></p>
                  <span className={`px-2 py-1 text-xs rounded-full ${booking.product.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                    {booking.product.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <Link 
                  to={`/products/${booking.product._id}`}
                  className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 text-sm font-medium"
                >
                  View Product Details
                </Link>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                {getAvailableActions(booking).length > 0 ? (
                  getAvailableActions(booking).map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleUpdateStatus(action.value)}
                      disabled={processingAction}
                      className={`w-full py-2 px-4 rounded-md ${index === 0 ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'} transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center`}
                    >
                      {processingAction ? (
                        <>
                          <LoadingSpinner size="small" />
                          <span className="ml-2">Processing...</span>
                        </>
                      ) : (
                        action.label
                      )}
                    </button>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-2">
                    No actions available for {booking.status} bookings
                  </p>
                )}
                <Link 
                  to={`/admin/users/${booking.user._id}`}
                  className="block w-full py-2 px-4 text-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition duration-200"
                >
                  View Customer Profile
                </Link>
              </div>
            </motion.div>

            {/* Activity Log */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
              {booking.activityLog && booking.activityLog.length > 0 ? (
                <div className="space-y-4">
                  {booking.activityLog.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 relative">
                        <div className="h-4 w-4 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        {index < booking.activityLog.length - 1 && (
                          <div className="absolute top-4 bottom-0 left-2 w-0.5 -ml-px bg-gray-300 dark:bg-gray-600"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(activity.timestamp)}</p>
                        {activity.note && <p className="text-sm mt-1">{activity.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-2">
                  No activity recorded
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;