import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../data/mockData';
import { 
  CalendarIcon,
  ClockIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/outline';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const MyRentals = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await mockApi.getBookings({ customerId: user.id });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-400" />;
      case 'confirmed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-400" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-400" />;
      default:
        return <ExclamationCircleIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Rentals', count: bookings.length },
    { value: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { value: 'confirmed', label: 'Active', count: bookings.filter(b => b.status === 'confirmed').length },
    { value: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">My Rentals</h1>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Rentals</h1>
        <div className="text-sm text-slate-400">
          {filteredBookings.length} rental{filteredBookings.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === option.value
                  ? 'bg-violet-600 text-white'
                  : 'glass text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Product Info */}
                <div className="flex items-start space-x-4">
                  <img
                    src={booking.product.images[0]}
                    alt={booking.product.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {booking.product.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-2">
                      {booking.product.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>Booking ID: {booking.id}</span>
                      <span>•</span>
                      <span>End User: {booking.endUser.name}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="lg:text-right space-y-2">
                  <div className="flex items-center justify-between lg:justify-end space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-400 space-y-1">
                    <div className="flex items-center justify-between lg:justify-end space-x-4">
                      <span>Duration:</span>
                      <span className="text-white">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between lg:justify-end space-x-4">
                      <span>Amount:</span>
                      <span className="text-white font-semibold">
                        ₹{booking.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between lg:justify-end space-x-4">
                      <span>Payment:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.paymentStatus === 'paid' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    
                    {booking.status === 'pending' && (
                      <Button variant="danger" size="sm">
                        Cancel
                      </Button>
                    )}
                    
                    {booking.status === 'confirmed' && booking.paymentStatus === 'pending' && (
                      <Button size="sm">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CalendarIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {filter === 'all' ? 'No rentals found' : `No ${filter} rentals found`}
            </h3>
            <p className="text-slate-400 mb-6">
              {filter === 'all' 
                ? "You haven't made any bookings yet. Start exploring our products!"
                : `You don't have any ${filter} rentals at the moment.`
              }
            </p>
            {filter === 'all' && (
              <Button onClick={() => window.location.href = '/products'}>
                Browse Products
              </Button>
            )}
            {filter !== 'all' && (
              <Button variant="ghost" onClick={() => setFilter('all')}>
                View All Rentals
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyRentals;