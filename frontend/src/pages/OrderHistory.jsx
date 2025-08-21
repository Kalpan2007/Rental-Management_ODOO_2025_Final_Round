import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getBookings } from '../api/bookings';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ClockIcon,
  DocumentTextIcon,
  StarIcon,
  DownloadIcon,
  FilterIcon
} from '@heroicons/react/24/outline';

const OrderHistory = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getBookings();
        
        // Mock additional order data
        const mockOrders = [
          {
            _id: '1',
            orderNumber: 'RH-2024-001',
            product: {
              _id: 'p1',
              name: 'Professional DSLR Camera',
              category: 'Photography',
              imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'
            },
            totalPrice: 1500,
            customPrice: 500,
            rentalDays: 3,
            startDate: '2024-01-15',
            endDate: '2024-01-18',
            status: 'completed',
            paymentStatus: 'paid',
            createdAt: '2024-01-15T10:00:00Z',
            rating: 5,
            review: 'Excellent camera quality!'
          },
          {
            _id: '2',
            orderNumber: 'RH-2024-002',
            product: {
              _id: 'p2',
              name: 'DJ Equipment Set',
              category: 'Audio Equipment',
              imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
            },
            totalPrice: 2400,
            customPrice: 800,
            rentalDays: 3,
            startDate: '2024-01-20',
            endDate: '2024-01-23',
            status: 'active',
            paymentStatus: 'paid',
            createdAt: '2024-01-20T14:30:00Z'
          },
          {
            _id: '3',
            orderNumber: 'RH-2024-003',
            product: {
              _id: 'p3',
              name: 'Gaming Console',
              category: 'Gaming',
              imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop'
            },
            totalPrice: 900,
            customPrice: 300,
            rentalDays: 3,
            startDate: '2024-01-25',
            endDate: '2024-01-28',
            status: 'pending',
            paymentStatus: 'paid',
            createdAt: '2024-01-25T09:15:00Z'
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'price-high':
        return b.totalPrice - a.totalPrice;
      case 'price-low':
        return a.totalPrice - b.totalPrice;
      default:
        return 0;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const downloadInvoice = (orderId) => {
    // Mock download functionality
    toast.success('Invoice download started');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Order History</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track all your rental orders and transactions
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <FilterIcon className="h-5 w-5 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input"
              >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Orders List */}
        {sortedOrders.length > 0 ? (
          <div className="space-y-6">
            {sortedOrders.map((order, index) => (
              <motion.div
                key={order._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={order.product.imageUrl} 
                        alt={order.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{order.product.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{order.product.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          Order #{order.orderNumber}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-lg font-bold">₹{order.totalPrice}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Rental Period</p>
                      <p className="font-medium">
                        {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="font-medium">{order.rentalDays} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Custom Price</p>
                      <p className="font-medium">₹{order.customPrice}/day</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order Date</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <Link 
                        to={`/products/${order.product._id}`}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View Product
                      </Link>
                      <button
                        onClick={() => downloadInvoice(order._id)}
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
                      >
                        <DownloadIcon className="h-4 w-4 mr-1" />
                        Download Invoice
                      </button>
                    </div>

                    {order.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        {order.rating ? (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Your Rating:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon 
                                  key={i} 
                                  className={`h-4 w-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <Link 
                            to={`/reviews/new?orderId=${order._id}`}
                            className="btn-secondary text-sm"
                          >
                            Rate & Review
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">
              {filter === 'all' ? 'No Orders Yet' : `No ${filter} Orders`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {filter === 'all' 
                ? "You haven't made any rental orders yet. Start exploring our products!"
                : `No ${filter} orders found. Try changing the filter.`
              }
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;