import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getBookings } from '../api/bookings';
import { getProducts } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  CalendarDaysIcon,
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  PlusCircleIcon,
  EyeIcon,
  HeartIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0,
    myProducts: 0,
    totalEarnings: 0,
    pendingPayments: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch user bookings
        const bookingsResponse = await getBookings();
        const bookings = bookingsResponse.data || [];
        
        // Fetch user's products
        const productsResponse = await getProducts({ owner: user._id });
        const products = productsResponse.data || [];
        
        // Calculate stats
        const activeBookings = bookings.filter(b => 
          ['pending', 'confirmed', 'active'].includes(b.status)
        ).length;
        
        const totalSpent = bookings
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

        const totalEarnings = bookings
          .filter(b => b.status === 'completed' && b.productOwner === user._id)
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        
        setStats({
          totalBookings: bookings.length,
          activeBookings,
          totalSpent,
          myProducts: products.length,
          totalEarnings,
          pendingPayments: bookings.filter(b => b.paymentStatus === 'pending').length
        });
        
        setRecentBookings(bookings.slice(0, 5));
        setMyProducts(products.slice(0, 4));
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: CalendarDaysIcon,
      color: 'from-blue-500 to-blue-600',
      link: '/my-bookings',
      description: 'All your rental bookings'
    },
    {
      title: 'Active Bookings',
      value: stats.activeBookings,
      icon: ShoppingBagIcon,
      color: 'from-green-500 to-green-600',
      link: '/my-bookings?status=active',
      description: 'Currently active rentals'
    },
    {
      title: 'Total Spent',
      value: `₹${stats.totalSpent.toFixed(2)}`,
      icon: CurrencyRupeeIcon,
      color: 'from-purple-500 to-purple-600',
      link: '/order-history',
      description: 'Amount spent on rentals'
    },
    {
      title: 'My Products',
      value: stats.myProducts,
      icon: ChartBarIcon,
      color: 'from-orange-500 to-orange-600',
      link: '/my-products',
      description: 'Products you have listed'
    },
    {
      title: 'Total Earnings',
      value: `₹${stats.totalEarnings.toFixed(2)}`,
      icon: CurrencyRupeeIcon,
      color: 'from-emerald-500 to-emerald-600',
      link: '/wallet',
      description: 'Earnings from your products'
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: BellIcon,
      color: 'from-red-500 to-red-600',
      link: '/wallet',
      description: 'Payments awaiting processing'
    }
  ];

  const quickActions = [
    { title: 'Browse Products', icon: '🔍', link: '/products', color: 'bg-blue-500' },
    { title: 'List Product', icon: '📦', link: '/products/new', color: 'bg-green-500' },
    { title: 'My Bookings', icon: '📅', link: '/my-bookings', color: 'bg-purple-500' },
    { title: 'Messages', icon: '💬', link: '/messages', color: 'bg-orange-500' },
    { title: 'Wallet', icon: '💰', link: '/wallet', color: 'bg-emerald-500' },
    { title: 'Support', icon: '🆘', link: '/support', color: 'bg-red-500' },
    { title: 'Settings', icon: '⚙️', link: '/settings', color: 'bg-gray-500' },
    { title: 'Help Center', icon: '❓', link: '/help', color: 'bg-indigo-500' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your rentals today.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/products/new" className="btn-primary flex items-center">
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                List Product
              </Link>
              <Link to="/products" className="btn-secondary flex items-center">
                <EyeIcon className="h-5 w-5 mr-2" />
                Browse
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <div className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-r ${stat.color} text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-white/60 text-xs mt-1">{stat.description}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-white/80" />
                  </div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Bookings */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Bookings</h2>
              <Link 
                to="/my-bookings" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {recentBookings.length > 0 ? (
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div 
                    key={booking._id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{booking.product?.name || 'Product'}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="font-medium">₹{booking.totalPrice}</span>
                      <Link 
                        to={`/bookings/${booking._id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarDaysIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No bookings yet</p>
                <Link to="/products" className="btn-primary">
                  Browse Products
                </Link>
              </div>
            )}
          </motion.div>

          {/* My Products */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">My Products</h2>
              <Link 
                to="/my-products" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {myProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myProducts.map((product, index) => (
                  <div 
                    key={product._id}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-shadow`}
                  >
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/150'} 
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      ₹{product.price}/day
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'approved' ? 'bg-green-100 text-green-800' :
                        product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                      <Link 
                        to={`/products/${product._id}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">No products listed yet</p>
                <Link to="/products/new" className="btn-primary">
                  <PlusCircleIcon className="h-4 w-4 mr-2" />
                  List Your First Product
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors group`}
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl text-white">{action.icon}</span>
                </div>
                <p className="text-sm font-medium">{action.title}</p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className={`mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Listed new product', item: 'Professional Camera', time: '2 hours ago', type: 'success' },
              { action: 'Booking confirmed', item: 'DJ Equipment Set', time: '5 hours ago', type: 'info' },
              { action: 'Payment received', item: '₹500 for Audio System', time: '1 day ago', type: 'success' },
              { action: 'Product inquiry', item: 'Someone asked about your laptop', time: '2 days ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.item}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;