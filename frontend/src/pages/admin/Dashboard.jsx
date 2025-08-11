import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { getRevenueReport, getMostRentedProducts, getOverdueReturns } from '../../api/reports';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const Dashboard = () => {
  const { darkMode } = useTheme();
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [overdueReturns, setOverdueReturns] = useState([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState({
    revenue: true,
    products: true,
    overdue: true
  });
  const [error, setError] = useState({
    revenue: null,
    products: null,
    overdue: null
  });

  // Fetch revenue data
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await getRevenueReport({ period: 'monthly', limit: 6 });
        setRevenueData(response.data.revenueData);
        setBookingStats(response.data.bookingStats);
        setLoading(prev => ({ ...prev, revenue: false }));
      } catch (err) {
        setError(prev => ({ ...prev, revenue: 'Failed to load revenue data' }));
        setLoading(prev => ({ ...prev, revenue: false }));
        console.error('Error fetching revenue data:', err);
      }
    };

    fetchRevenueData();
  }, []);

  // Fetch top products
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await getMostRentedProducts({ limit: 5 });
        setTopProducts(response.data);
        setLoading(prev => ({ ...prev, products: false }));
      } catch (err) {
        setError(prev => ({ ...prev, products: 'Failed to load top products' }));
        setLoading(prev => ({ ...prev, products: false }));
        console.error('Error fetching top products:', err);
      }
    };

    fetchTopProducts();
  }, []);

  // Fetch overdue returns
  useEffect(() => {
    const fetchOverdueReturns = async () => {
      try {
        const response = await getOverdueReturns();
        setOverdueReturns(response.data);
        setLoading(prev => ({ ...prev, overdue: false }));
      } catch (err) {
        setError(prev => ({ ...prev, overdue: 'Failed to load overdue returns' }));
        setLoading(prev => ({ ...prev, overdue: false }));
        console.error('Error fetching overdue returns:', err);
      }
    };

    fetchOverdueReturns();
  }, []);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Bookings', value: bookingStats.total, color: 'bg-blue-500' },
            { title: 'Active Bookings', value: bookingStats.active, color: 'bg-green-500' },
            { title: 'Completed', value: bookingStats.completed, color: 'bg-purple-500' },
            { title: 'Cancelled', value: bookingStats.cancelled, color: 'bg-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`h-2 ${stat.color}`}></div>
              <div className="p-5">
                <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">{stat.title}</h2>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Revenue Chart */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
          {loading.revenue ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner size="medium" />
            </div>
          ) : error.revenue ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error.revenue}</p>
            </div>
          ) : (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: darkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    tick={{ fill: darkMode ? '#e5e7eb' : '#374151' }}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Revenue']}
                    contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff', borderColor: darkMode ? '#374151' : '#e5e7eb' }}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Top Rented Products</h2>
              <Link to="/admin/products" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            {loading.products ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner size="medium" />
              </div>
            ) : error.products ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error.products}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.length > 0 ? (
                  <>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={topProducts}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="rentCount"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {topProducts.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [value, props.payload.name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4">
                      {topProducts.map((product, index) => (
                        <div key={product._id} className="flex items-center justify-between py-2 border-b last:border-0">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span>{product.name}</span>
                          </div>
                          <span className="font-medium">{product.rentCount} rentals</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center py-10">No rental data available</p>
                )}
              </div>
            )}
          </motion.div>
          
          {/* Overdue Returns */}
          <motion.div
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Overdue Returns</h2>
              <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Bookings
              </Link>
            </div>
            {loading.overdue ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner size="medium" />
              </div>
            ) : error.overdue ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error.overdue}</p>
              </div>
            ) : (
              <div>
                {overdueReturns.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Days Overdue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {overdueReturns.map((booking) => {
                          const dueDate = new Date(booking.endDate);
                          const today = new Date();
                          const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
                          
                          return (
                            <tr key={booking._id}>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <Link to={`/products/${booking.product._id}`} className="hover:text-primary-600">
                                  {booking.product.name}
                                </Link>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">{booking.user.name}</td>
                              <td className="px-4 py-4 whitespace-nowrap">{formatDate(booking.endDate)}</td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  {daysOverdue} {daysOverdue === 1 ? 'day' : 'days'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-10">No overdue returns</p>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Quick Actions */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Add Product', link: '/admin/products/new', icon: '📦' },
              { title: 'Manage Bookings', link: '/admin/bookings', icon: '📅' },
              { title: 'View Reports', link: '/admin/reports', icon: '📊' },
              { title: 'Manage Users', link: '/admin/users', icon: '👥' }
            ].map((action, index) => (
              <Link 
                key={index}
                to={action.link}
                className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} flex items-center transition duration-200`}
              >
                <span className="text-2xl mr-3">{action.icon}</span>
                <span className="font-medium">{action.title}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;