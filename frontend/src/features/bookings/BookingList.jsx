import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserBookings, cancelBooking } from '../../api/bookings';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await getUserBookings();
        setBookings(response.data);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
        toast.success('Booking cancelled successfully');
      } catch (err) {
        toast.error('Failed to cancel booking. Please try again.');
        console.error('Error cancelling booking:', err);
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-4">No Bookings Found</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven't made any bookings yet. Start exploring our products to rent something amazing!
        </p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 lg:w-1/4">
                <img 
                  src={booking.product.images[0] || '/placeholder-image.jpg'} 
                  alt={booking.product.name}
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:w-2/3 lg:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{booking.product.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Booking ID: {booking._id.substring(0, 8)}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                    <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                    <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Price</p>
                    <p className="font-medium">${booking.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Payment Status</p>
                    <p className="font-medium">{booking.paymentStatus || 'Pending'}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link 
                    to={`/products/${booking.product._id}`}
                    className="btn-secondary text-sm py-1 px-3"
                  >
                    View Product
                  </Link>
                  
                  {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-300 text-sm py-1 px-3 rounded transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;