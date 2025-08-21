import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyRupeeIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const { darkMode } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Mock analytics data
        const mockAnalytics = {
          overview: {
            totalRevenue: 125000,
            revenueChange: 12.5,
            totalBookings: 450,
            bookingsChange: 8.3,
            activeUsers: 1250,
            usersChange: 15.2,
            avgOrderValue: 278,
            avgOrderChange: -2.1
          },
          charts: {
            revenue: [
              { date: '2024-01-01', amount: 15000 },
              { date: '2024-01-02', amount: 18000 },
              { date: '2024-01-03', amount: 22000 },
              { date: '2024-01-04', amount: 19000 },
              { date: '2024-01-05', amount: 25000 },
              { date: '2024-01-06', amount: 21000 },
              { date: '2024-01-07', amount: 28000 }
            ],
            categories: [
              { name: 'Electronics', value: 35, color: '#3B82F6' },
              { name: 'Photography', value: 25, color: '#8B5CF6' },
              { name: 'Audio Equipment', value: 20, color: '#10B981' },
              { name: 'Tools', value: 12, color: '#F59E0B' },
              { name: 'Others', value: 8, color: '#EF4444' }
            ]
          },
          topProducts: [
            { name: 'Professional DSLR Camera', bookings: 45, revenue: 22500 },
            { name: 'DJ Equipment Set', bookings: 38, revenue: 30400 },
            { name: 'Power Drill Set', bookings: 42, revenue: 12600 },
            { name: 'Gaming Console', bookings: 35, revenue: 10500 },
            { name: 'Camping Tent', bookings: 28, revenue: 8400 }
          ]
        };
        
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
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
              <ChartBarIcon className={`h-8 w-8 mr-3 ${
                darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
              }`} />
              <div>
                <h1 className={`text-3xl font-bold ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  Analytics Dashboard
                </h1>
                <p className={`${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
                }`}>
                  Comprehensive insights into your rental business
                </p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`px-4 py-2 rounded-xl border-2 ${
                darkMode
                  ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                  : 'border-[#d4a276] bg-white text-[#583101]'
              }`}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Revenue',
              value: `₹${analytics.overview.totalRevenue.toLocaleString()}`,
              change: analytics.overview.revenueChange,
              icon: CurrencyRupeeIcon,
              color: 'from-green-500 to-green-600'
            },
            {
              title: 'Total Bookings',
              value: analytics.overview.totalBookings.toLocaleString(),
              change: analytics.overview.bookingsChange,
              icon: ShoppingBagIcon,
              color: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Active Users',
              value: analytics.overview.activeUsers.toLocaleString(),
              change: analytics.overview.usersChange,
              icon: UsersIcon,
              color: 'from-purple-500 to-purple-600'
            },
            {
              title: 'Avg Order Value',
              value: `₹${analytics.overview.avgOrderValue}`,
              change: analytics.overview.avgOrderChange,
              icon: TrendingUpIcon,
              color: 'from-orange-500 to-orange-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-r ${stat.color} text-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.change > 0 ? (
                      <TrendingUpIcon className="h-4 w-4 text-white/80 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-white/80 mr-1" />
                    )}
                    <span className="text-white/80 text-sm">
                      {Math.abs(stat.change)}% {stat.change > 0 ? 'increase' : 'decrease'}
                    </span>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className={`p-6 rounded-xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className={`text-xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Revenue Trend
            </h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {analytics.charts.revenue.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      darkMode ? 'bg-[#bc8a5f]' : 'bg-[#8b5e34]'
                    }`}
                    style={{ 
                      height: `${(data.amount / Math.max(...analytics.charts.revenue.map(d => d.amount))) * 200}px` 
                    }}
                  />
                  <span className={`text-xs mt-2 ${
                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                  }`}>
                    {new Date(data.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            className={`p-6 rounded-xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className={`text-xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Category Distribution
            </h3>
            <div className="space-y-4">
              {analytics.charts.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className={`${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      {category.name}
                    </span>
                  </div>
                  <span className={`font-semibold ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    {category.value}%
                  </span>
                </div>
              ))}
            </div>
           </motion.div>
-
-          {/* Product Info */}
-          <div>
-            <div className="flex justify-between items-start">
-              <div>
-                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
-                {product.pricingRules && product.pricingRules.length > 0 && (
-                  <div className="text- text-brown-600 dark:text-brown-500">
-                    {product.pricingRules.map((rule, index) => (
-                      <p key={index}>
-                        ${rule.price} / {rule.durationType} 
-                        {rule.minimumDuration > 1 ? ` (min ${rule.minimumDuration} ${rule.durationType}s)` : ''}
-                      </p>
-                    ))}
-                  </div>
-                )}
-              </div>
-              <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
-                {product.status === 'approved' ? 'Available' : 'Unavailable'}
-              </span>
-            </div>
-
-            <div className="mt-6">
-              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
-              <p className="mb-6">{product.description}</p>
-              
-              <div className="grid grid-cols-2 gap-4 mb-6">
-                <div>
-                  <h3 className="text-sm font-medium">Category</h3>
-                  <p>{product.category}</p>
-                </div>
-                <div>
-                  <h3 className="text-sm font-medium">Condition</h3>
-                  <p>{product.condition}</p>
-                </div>
-                {product.brand && (
-                  <div>
-                    <h3 className="text-sm font-medium">Brand</h3>
-                    <p>{product.brand}</p>
-                  </div>
-                )}
-                {product.model && (
-                  <div>
-                    <h3 className="text-sm font-medium">Model</h3>
-                    <p>{product.model}</p>
-                  </div>
-                )}
-              </div>
-            </div>
-
-            {/* Booking Section */}
-            <div className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
-              <h2 className="text-xl font-semibold mb-4">Book This Product</h2>
-              
-              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
-                <div>
-                  <label className="block text-sm font-medium mb-1">Start Date</label>
-                  <DatePicker
-                    selected={startDate}
-                    onChange={date => setStartDate(date)}
-                    selectsStart
-                    startDate={startDate}
-                    endDate={endDate}
-                    minDate={new Date()}
-                    className="input w-full"
-                  />
-                </div>
-                <div>
-                  <label className="block text-sm font-medium mb-1">End Date</label>
-                  <DatePicker
-                    selected={endDate}
-                    onChange={date => setEndDate(date)}
-                    selectsEnd
-                    startDate={startDate}
-                    endDate={endDate}
-                    minDate={startDate}
-                    className="input w-full"
-                  />
-                </div>
-              </div>
-              
-              <div className="flex items-center justify-between mb-4">
-                <div>
-                  <p className="text-sm font-medium">Total Price</p>
-                  <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
-                </div>
-                <button 
-                  onClick={handleCheckAvailability}
-                  disabled={checkingAvailability}
-                  className="btn-secondary"
-                >
-                  {checkingAvailability ? (
-                    <>
-                      <LoadingSpinner size="small" />
-                      <span className="ml-2">Checking...</span>
-                    </>
-                  ) : 'Check Availability'}
-                </button>
-              </div>
-              
-              <button 
-                onClick={handleBookNow}
-                disabled={!isAvailable || checkingAvailability}
-                className={`w-full btn-primary ${(!isAvailable && isAvailable !== null) || checkingAvailability ? 'opacity-50 cursor-not-allowed' : ''}`}
-              >
-                Book Now
-              </button>
-              
-              {!isAuthenticated && (
-                <p className="text-sm mt-2 text-center">You need to <Link to="/login" className="text-primary-600 hover:underline">log in</Link> to book this product</p>
-              )}
-            </div>
-          </motion.div>
         </div>
 
-        {/* Related Products would go here */}
+        {/* Top Products Table */}
+        <motion.div
+          className={`p-6 rounded-xl backdrop-blur-sm border ${
+            darkMode 
+              ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
+              : 'bg-white/80 border-[#d4a276]/30'
+          }`}
+          initial={{ opacity: 0, y: 20 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ duration: 0.6, delay: 0.6 }}
+        >
+          <h3 className={`text-xl font-bold mb-6 ${
+            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
+          }`}>
+            Top Performing Products
+          </h3>
+          <div className="overflow-x-auto">
+            <table className="w-full">
+              <thead>
+                <tr className={`border-b ${
+                  darkMode ? 'border-[#8b5e34]' : 'border-[#d4a276]'
+                }`}>
+                  <th className={`text-left py-3 px-4 font-semibold ${
+                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
+                  }`}>
+                    Product
+                  </th>
+                  <th className={`text-left py-3 px-4 font-semibold ${
+                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
+                  }`}>
+                    Bookings
+                  </th>
+                  <th className={`text-left py-3 px-4 font-semibold ${
+                    darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
+                  }`}>
+                    Revenue
+                  </th>
+                </tr>
+              </thead>
+              <tbody>
+                {analytics.topProducts.map((product, index) => (
+                  <tr 
+                    key={index}
+                    className={`border-b ${
+                      darkMode ? 'border-[#8b5e34]/30' : 'border-[#d4a276]/30'
+                    }`}
+                  >
+                    <td className={`py-3 px-4 ${
+                      darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
+                    }`}>
+                      {product.name}
+                    </td>
+                    <td className={`py-3 px-4 ${
+                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
+                    }`}>
+                      {product.bookings}
+                    </td>
+                    <td className={`py-3 px-4 font-semibold ${
+                      darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
+                    }`}>
+                      ₹{product.revenue.toLocaleString()}
+                    </td>
+                  </tr>
+                ))}
+              </tbody>
+            </table>
+          </div>
+        </motion.div>
       </div>
     </div>
   );
 };
 
-export default ProductDetail;