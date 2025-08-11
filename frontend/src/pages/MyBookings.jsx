import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserBookings, cancelBooking } from '../api/bookings';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const MyBookings = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getUserBookings();
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings');
        setLoading(false);
        console.error('Error fetching bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(bookingId);
      await cancelBooking(bookingId);
      
      // Update the booking status locally
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        )
      );
      
      toast.success('Booking cancelled successfully');
      setCancellingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
      setCancellingId(null);
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
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredBookings = bookings.filter(booking => {
    const currentDate = new Date();
    const endDate = new Date(booking.endDate);
    
    if (activeTab === 'upcoming') {
      return endDate >= currentDate && booking.status !== 'cancelled';
    } else if (activeTab === 'past') {
      return endDate < currentDate || booking.status === 'cancelled';
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {/* Tabs */}
        <div className="flex border-b mb-8">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'upcoming' 
              ? `border-b-2 border-primary-600 text-primary-600` 
              : `text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'past' 
              ? `border-b-2 border-primary-600 text-primary-600` 
              : `text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
        </div>
        
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-secondary"
            >
              Try Again
            </button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-10">
            <p className="mb-4">No {activeTab} bookings found.</p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <motion.div 
            className="grid gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredBookings.map((booking) => (
              <motion.div 
                key={booking._id}
                className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 md:mb-0">
                      <h2 className="text-xl font-semibold mb-1">{booking.product.name}</h2>
                      <div className="flex items-center">
                        <span className="text-sm">
                          Booking ID: {booking._id.substring(booking._id.length - 8)}
                        </span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Link 
                        to={`/bookings/${booking._id}`}
                        className="btn-secondary text-center"
                      >
                        View Details
                      </Link>
                      {(booking.status === 'pending' || booking.status === 'confirmed') && 
                       new Date(booking.startDate) > new Date() && (
                        <button 
                          onClick={() => handleCancelBooking(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="btn-outline-red text-center"
                        >
                          {cancellingId === booking._id ? (
                            <>
                              <LoadingSpinner size="small" />
                              <span className="ml-2">Cancelling...</span>
                            </>
                          ) : 'Cancel'}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rental Period</h3>
                      <p className="mt-1">
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Price</h3>
                      <p className="mt-1">${booking.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Payment Status</h3>
                      <p className="mt-1">
                        {booking.isPaid ? (
                          <span className="text-green-600 dark:text-green-400">Paid</span>
                        ) : (
                          <span className="text-red-600 dark:text-red-400">Unpaid</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;