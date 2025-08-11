import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../data/mockData';
import {
  CalendarIcon,
  CubeIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  TrendingUpIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsResponse = await mockApi.getBookings({ customerId: user.id });
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.id]);

  const stats = [
    {
      name: 'Active Rentals',
      value: bookings.filter(b => b.status === 'confirmed').length,
      icon: CalendarIcon,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    {
      name: 'Total Bookings',
      value: bookings.length,
      icon: CubeIcon,
      color: 'text-violet-400',
      bg: 'bg-violet-500/20'
    },
    {
      name: 'Amount Spent',
      value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: 'text-green-400',
      bg: 'bg-green-500/20'
    },
    {
      name: 'Pending Returns',
      value: bookings.filter(b => b.status === 'confirmed' && new Date(b.endDate) < new Date()).length,
      icon: ClockIcon,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-pending';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-slate-400 mt-1">
            Here's what's happening with your rentals today.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Link to="/products">
            <Button variant="secondary" icon={<CubeIcon className="w-4 h-4" />}>
              Browse Products
            </Button>
          </Link>
          <Link to="/my-rentals">
            <Button icon={<CalendarIcon className="w-4 h-4" />}>
              View All Rentals
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/products" className="block">
            <div className="glass bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 hover:bg-violet-500/20 transition-all hover-lift">
              <CubeIcon className="w-8 h-8 text-violet-400 mb-2" />
              <h3 className="font-semibold text-white">Find Products</h3>
              <p className="text-sm text-slate-400">Browse our catalog of rental items</p>
            </div>
          </Link>
          
          <Link to="/my-rentals" className="block">
            <div className="glass bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 hover:bg-blue-500/20 transition-all hover-lift">
              <CalendarIcon className="w-8 h-8 text-blue-400 mb-2" />
              <h3 className="font-semibold text-white">My Rentals</h3>
              <p className="text-sm text-slate-400">Manage your current bookings</p>
            </div>
          </Link>
          
          <Link to="/profile" className="block">
            <div className="glass bg-green-500/10 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/20 transition-all hover-lift">
              <CheckCircleIcon className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="font-semibold text-white">Update Profile</h3>
              <p className="text-sm text-slate-400">Manage your account settings</p>
            </div>
          </Link>
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Bookings</h2>
          <Link to="/my-rentals">
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </Link>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="glass bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.product.images[0]}
                      alt={booking.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{booking.product.name}</h3>
                      <p className="text-sm text-slate-400">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    <p className="text-sm text-slate-400 mt-1">₹{booking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No bookings yet</h3>
            <p className="text-slate-400 mb-4">Start exploring our products to make your first booking!</p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerDashboard;