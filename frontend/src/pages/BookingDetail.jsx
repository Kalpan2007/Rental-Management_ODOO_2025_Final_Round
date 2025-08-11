import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBookingById, cancelBooking } from '../api/bookings';
import { createPayment } from '../api/payments';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useTheme();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await getBookingById(id);
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

  const handleCancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingBooking(true);
      await cancelBooking(id);
      
      // Update booking status locally
      setBooking(prev => ({ ...prev, status: 'cancelled' }));
      
      toast.success('Booking cancelled successfully');
      setCancellingBooking(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
      setCancellingBooking(false);
    }
  };

  const handlePayment = async () => {
    try {
      setProcessingPayment(true);
      const response = await createPayment({ bookingId: id });
      
      // Redirect to payment page or handle Stripe checkout
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        // Handle payment intent client-side
        toast.success('Payment initiated');
        navigate(`/payment/${response.data.paymentId}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to process payment');
      setProcessingPayment(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500 mb-6">{error || 'Booking not found'}</p>
          <Link to="/bookings" className="btn-primary">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link to="/bookings" className="text-primary-600 hover:text-primary-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to My Bookings
          </Link>
        </div>

        <motion.div
          className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
                <p className="text-sm mb-2">
                  Booking ID: {booking._id}
                </p>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <span className="ml-4">
                    {booking.isPaid ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">Unpaid</span>
                    )}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                {!booking.isPaid && booking.status !== 'cancelled' && (
                  <button 
                    onClick={handlePayment}
                    disabled={processingPayment}
                    className="btn-primary"
                  >
                    {processingPayment ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Processing...</span>
                      </>
                    ) : 'Pay Now'}
                  </button>
                )}
                
                {(booking.status === 'pending' || booking.status === 'confirmed') && 
                 new Date(booking.startDate) > new Date() && (
                  <button 
                    onClick={handleCancelBooking}
                    disabled={cancellingBooking}
                    className="btn-outline-red"
                  >
                    {cancellingBooking ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Cancelling...</span>
                      </>
                    ) : 'Cancel Booking'}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Booking Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rental Period</h3>
                    <p className="mt-1">
                      {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</h3>
                    <p className="mt-1">
                      {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Booking Date</h3>
                    <p className="mt-1">{formatDate(booking.createdAt)}</p>
                  </div>
                  {booking.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                      <p className="mt-1">{booking.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Product Information</h2>
                <div className="flex items-start">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <img 
                      src={booking.product.imageUrl || 'https://via.placeholder.com/80?text=No+Image'} 
                      alt={booking.product.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">
                      <Link to={`/products/${booking.product._id}`} className="hover:text-primary-600">
                        {booking.product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{booking.product.category}</p>
                    <p className="mt-1">${booking.product.pricePerDay} / day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Rental Fee ({Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} days)</span>
                      <span>${booking.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit</span>
                      <span>${(booking.product.securityDeposit || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${((booking.totalPrice * 0.1) || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>${(booking.totalPrice + (booking.product.securityDeposit || 0) + (booking.totalPrice * 0.1)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</h3>
                      <p className="mt-1">
                        {booking.isPaid ? (
                          <span className="text-green-600 dark:text-green-400">Paid on {formatDate(booking.paidAt)}</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">Unpaid</span>
                        )}
                      </p>
                    </div>
                    {booking.paymentMethod && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Method</h3>
                        <p className="mt-1">{booking.paymentMethod}</p>
                      </div>
                    )}
                    {booking.transactionId && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction ID</h3>
                        <p className="mt-1">{booking.transactionId}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingDetail;