import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getReports, downloadReport } from '../../api/reports';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Import chart components (assuming they exist)
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';

const Reports = () => {
  const { darkMode } = useTheme();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  const [reportType, setReportType] = useState('revenue'); // 'revenue', 'bookings', 'products', 'users'
  const [downloadingReport, setDownloadingReport] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, [timeRange, reportType]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await getReports({
        timeRange,
        type: reportType
      });
      setReportData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load report data');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (format) => {
    setDownloadingReport(true);
    try {
      await downloadReport({
        timeRange,
        type: reportType,
        format // 'pdf', 'csv', 'excel'
      });
      toast.success(`Report downloaded successfully in ${format.toUpperCase()} format`);
    } catch (err) {
      toast.error(`Failed to download report: ${err.message}`);
      console.error('Error downloading report:', err);
    } finally {
      setDownloadingReport(false);
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

  // Get time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case 'week':
        return 'Last 7 Days';
      case 'month':
        return 'Last 30 Days';
      case 'quarter':
        return 'Last 3 Months';
      case 'year':
        return 'Last 12 Months';
      default:
        return 'Custom Range';
    }
  };

  // Get report type label
  const getReportTypeLabel = () => {
    switch (reportType) {
      case 'revenue':
        return 'Revenue Analysis';
      case 'bookings':
        return 'Booking Statistics';
      case 'products':
        return 'Product Performance';
      case 'users':
        return 'User Activity';
      default:
        return 'Custom Report';
    }
  };

  // Render summary cards based on report type
  const renderSummaryCards = () => {
    if (!reportData || !reportData.summary) return null;
    
    const { summary } = reportData;
    
    switch (reportType) {
      case 'revenue':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard 
              title="Total Revenue" 
              value={formatCurrency(summary.totalRevenue)}
              change={summary.revenueChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            />
            <SummaryCard 
              title="Average Order Value" 
              value={formatCurrency(summary.avgOrderValue)}
              change={summary.avgOrderValueChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>}
            />
            <SummaryCard 
              title="Completed Bookings" 
              value={summary.completedBookings}
              change={summary.completedBookingsChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>}
            />
            <SummaryCard 
              title="Conversion Rate" 
              value={`${summary.conversionRate}%`}
              change={summary.conversionRateChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>}
            />
          </div>
        );
      
      case 'bookings':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard 
              title="Total Bookings" 
              value={summary.totalBookings}
              change={summary.totalBookingsChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>}
            />
            <SummaryCard 
              title="Active Bookings" 
              value={summary.activeBookings}
              change={summary.activeBookingsChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            />
            <SummaryCard 
              title="Cancellation Rate" 
              value={`${summary.cancellationRate}%`}
              change={summary.cancellationRateChange}
              isNegative={true} // Lower is better for cancellation rate
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>}
            />
            <SummaryCard 
              title="Avg. Booking Duration" 
              value={`${summary.avgDuration} days`}
              change={summary.avgDurationChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            />
          </div>
        );
      
      case 'products':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard 
              title="Total Products" 
              value={summary.totalProducts}
              change={summary.totalProductsChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>}
            />
            <SummaryCard 
              title="Active Products" 
              value={summary.activeProducts}
              change={summary.activeProductsChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>}
            />
            <SummaryCard 
              title="Avg. Product Rating" 
              value={summary.avgRating.toFixed(1)}
              change={summary.avgRatingChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>}
            />
            <SummaryCard 
              title="Utilization Rate" 
              value={`${summary.utilizationRate}%`}
              change={summary.utilizationRateChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>}
            />
          </div>
        );
      
      case 'users':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard 
              title="Total Users" 
              value={summary.totalUsers}
              change={summary.totalUsersChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>}
            />
            <SummaryCard 
              title="New Users" 
              value={summary.newUsers}
              change={summary.newUsersChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>}
            />
            <SummaryCard 
              title="Active Users" 
              value={summary.activeUsers}
              change={summary.activeUsersChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            />
            <SummaryCard 
              title="Avg. Bookings per User" 
              value={summary.avgBookingsPerUser.toFixed(1)}
              change={summary.avgBookingsPerUserChange}
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render main chart based on report type
  const renderMainChart = () => {
    if (!reportData || !reportData.chartData) return null;
    
    const { chartData } = reportData;
    
    switch (reportType) {
      case 'revenue':
        return (
          <LineChart 
            data={chartData}
            title="Revenue Over Time"
            xAxisLabel="Date"
            yAxisLabel="Revenue"
            tooltipFormat={(value) => formatCurrency(value)}
            darkMode={darkMode}
          />
        );
      
      case 'bookings':
        return (
          <BarChart 
            data={chartData}
            title="Bookings by Status"
            xAxisLabel="Status"
            yAxisLabel="Number of Bookings"
            darkMode={darkMode}
          />
        );
      
      case 'products':
        return (
          <BarChart 
            data={chartData}
            title="Top Performing Products"
            xAxisLabel="Product"
            yAxisLabel="Bookings"
            darkMode={darkMode}
          />
        );
      
      case 'users':
        return (
          <LineChart 
            data={chartData}
            title="User Growth"
            xAxisLabel="Date"
            yAxisLabel="Users"
            darkMode={darkMode}
          />
        );
      
      default:
        return null;
    }
  };

  // Render secondary charts based on report type
  const renderSecondaryCharts = () => {
    if (!reportData || !reportData.secondaryCharts) return null;
    
    const { secondaryCharts } = reportData;
    
    switch (reportType) {
      case 'revenue':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
              <PieChart 
                data={secondaryCharts.revenueByCategory}
                darkMode={darkMode}
              />
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Revenue by Payment Method</h3>
              <PieChart 
                data={secondaryCharts.revenueByPaymentMethod}
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      
      case 'bookings':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Bookings by Category</h3>
              <PieChart 
                data={secondaryCharts.bookingsByCategory}
                darkMode={darkMode}
              />
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Bookings by Duration</h3>
              <BarChart 
                data={secondaryCharts.bookingsByDuration}
                xAxisLabel="Duration (days)"
                yAxisLabel="Number of Bookings"
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Products by Category</h3>
              <PieChart 
                data={secondaryCharts.productsByCategory}
                darkMode={darkMode}
              />
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Product Availability</h3>
              <PieChart 
                data={secondaryCharts.productAvailability}
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      
      case 'users':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">Users by Role</h3>
              <PieChart 
                data={secondaryCharts.usersByRole}
                darkMode={darkMode}
              />
            </div>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h3 className="text-lg font-semibold mb-4">User Activity</h3>
              <BarChart 
                data={secondaryCharts.userActivity}
                xAxisLabel="Activity Type"
                yAxisLabel="Count"
                darkMode={darkMode}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Render data table based on report type
  const renderDataTable = () => {
    if (!reportData || !reportData.tableData || reportData.tableData.length === 0) return null;
    
    const { tableData, tableColumns } = reportData;
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              {tableColumns.map((column, index) => (
                <th 
                  key={index}
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td 
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">{getReportTypeLabel()}</h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <select
              className={`rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="revenue">Revenue</option>
              <option value="bookings">Bookings</option>
              <option value="products">Products</option>
              <option value="users">Users</option>
            </select>
            <select
              className={`rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last 12 Months</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded dark:bg-red-900 dark:text-red-300 dark:border-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSummaryCards()}
        </motion.div>

        {/* Main Chart */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{getReportTypeLabel()} - {getTimeRangeLabel()}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownloadReport('pdf')}
                disabled={downloadingReport}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                PDF
              </button>
              <button
                onClick={() => handleDownloadReport('csv')}
                disabled={downloadingReport}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                CSV
              </button>
              <button
                onClick={() => handleDownloadReport('excel')}
                disabled={downloadingReport}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Excel
              </button>
            </div>
          </div>
          <div className="h-80">
            {renderMainChart()}
          </div>
        </motion.div>

        {/* Secondary Charts */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {renderSecondaryCharts()}
        </motion.div>

        {/* Data Table */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="p-6 pb-0">
            <h2 className="text-xl font-semibold mb-4">Detailed Data</h2>
          </div>
          {renderDataTable()}
        </motion.div>
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, change, icon, isNegative = false }) => {
  const { darkMode } = useTheme();
  
  // Determine if change is positive or negative
  const isPositiveChange = isNegative ? change < 0 : change > 0;
  const isNegativeChange = isNegative ? change > 0 : change < 0;
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          {isPositiveChange && (
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {isNegativeChange && (
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {change === 0 && (
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          )}
          <span 
            className={`ml-1 text-sm ${isPositiveChange ? 'text-green-500' : isNegativeChange ? 'text-red-500' : 'text-gray-500'}`}
          >
            {Math.abs(change)}% {isPositiveChange ? 'increase' : isNegativeChange ? 'decrease' : 'no change'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Reports;