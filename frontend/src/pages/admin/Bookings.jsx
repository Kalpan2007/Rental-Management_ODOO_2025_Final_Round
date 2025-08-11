import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getAdminBookings, updateBookingStatus } from '../../api/bookings';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const Bookings = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [processingBookingId, setProcessingBookingId] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    // Get page from URL or default to 1
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);

    // Get search term from URL
    const search = searchParams.get('search') || '';
    setSearchTerm(search);

    // Get status filter from URL
    const status = searchParams.get('status') || '';
    setFilterStatus(status);

    // Get sort from URL
    const sort = searchParams.get('sort') || 'createdAt';
    setSortField(sort);

    // Get order from URL
    const order = searchParams.get('order') || 'desc';
    setSortOrder(order);

    fetchBookings(page, search, status, sort, order);
  }, [searchParams]);

  const fetchBookings = async (page, search, status, sort, order) => {
    setLoading(true);
    try {
      const response = await getAdminBookings({
        page,
        limit: pageSize,
        search,
        status,
        sort,
        order
      });

      setBookings(response.data.bookings);
      setTotalPages(Math.ceil(response.data.total / pageSize));
      setLoading(false);
    } catch (err) {
      setError('Failed to load bookings');
      setLoading(false);
      console.error('Error fetching bookings:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateUrlAndFetch({ search: searchTerm, page: 1 });
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    updateUrlAndFetch({ status, page: 1 });
  };

  const handleSort = (field) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    updateUrlAndFetch({ sort: field, order: newOrder });
  };

  const updateUrlAndFetch = (params) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    // Update search params
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    
    navigate(`/admin/bookings?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    updateUrlAndFetch({ page });
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
      setProcessingBookingId(bookingId);
      try {
        await updateBookingStatus(bookingId, { status: newStatus });
        toast.success(`Booking marked as ${newStatus}`);
        
        // Update booking in the list
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      } catch (err) {
        toast.error('Failed to update booking status');
        console.error('Error updating booking status:', err);
      } finally {
        setProcessingBookingId(null);
      }
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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get available actions based on booking status
  const getAvailableActions = (booking) => {
    const actions = [];
    
    switch (booking.status) {
      case 'pending':
        actions.push({ label: 'Confirm', value: 'confirmed' });
        actions.push({ label: 'Cancel', value: 'cancelled' });
        break;
      case 'confirmed':
        actions.push({ label: 'Mark Active', value: 'active' });
        actions.push({ label: 'Cancel', value: 'cancelled' });
        break;
      case 'active':
        actions.push({ label: 'Complete', value: 'completed' });
        actions.push({ label: 'Cancel', value: 'cancelled' });
        break;
      case 'completed':
        // No actions for completed bookings
        break;
      case 'cancelled':
        // No actions for cancelled bookings
        break;
      default:
        break;
    }
    
    return actions;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Bookings Management</h1>

        {/* Filters and Search */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by customer name or product..."
                  className={`w-full pl-10 pr-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-primary-500 focus:border-primary-500`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md transition duration-200"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex space-x-4">
              <select
                className={`rounded-md border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} px-3 py-2 focus:ring-primary-500 focus:border-primary-500`}
                value={filterStatus}
                onChange={handleStatusChange}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-xl">{error}</p>
              <button 
                onClick={() => fetchBookings(currentPage, searchTerm, filterStatus, sortField, sortOrder)}
                className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('_id')}>
                        <div className="flex items-center">
                          <span>Booking ID</span>
                          {sortField === '_id' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('user.name')}>
                        <div className="flex items-center">
                          <span>Customer</span>
                          {sortField === 'user.name' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('product.name')}>
                        <div className="flex items-center">
                          <span>Product</span>
                          {sortField === 'product.name' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('startDate')}>
                        <div className="flex items-center">
                          <span>Dates</span>
                          {sortField === 'startDate' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('totalPrice')}>
                        <div className="flex items-center">
                          <span>Price</span>
                          {sortField === 'totalPrice' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                        <div className="flex items-center">
                          <span>Status</span>
                          {sortField === 'status' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                        <div className="flex items-center">
                          <span>Created</span>
                          {sortField === 'createdAt' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking._id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Link to={`/admin/bookings/${booking._id}`} className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400">
                              {booking._id.substring(booking._id.length - 8)}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{booking.user.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{booking.user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link to={`/products/${booking.product._id}`} className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400">
                              {booking.product.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div>{formatDate(booking.startDate)}</div>
                            <div className="text-gray-500 dark:text-gray-400">to</div>
                            <div>{formatDate(booking.endDate)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatCurrency(booking.totalPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDate(booking.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link 
                                to={`/admin/bookings/${booking._id}`}
                                className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                              >
                                View
                              </Link>
                              
                              {getAvailableActions(booking).length > 0 && (
                                <div className="relative inline-block text-left group">
                                  <button 
                                    type="button"
                                    className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                                    disabled={processingBookingId === booking._id}
                                  >
                                    {processingBookingId === booking._id ? (
                                      <LoadingSpinner size="small" />
                                    ) : (
                                      'Actions'
                                    )}
                                  </button>
                                  
                                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                      {getAvailableActions(booking).map((action, index) => (
                                        <button
                                          key={index}
                                          onClick={() => handleUpdateStatus(booking._id, action.value)}
                                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                          role="menuitem"
                                        >
                                          {action.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-6 py-10 text-center">
                          <p className="text-gray-500 dark:text-gray-400">No bookings found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, bookings.length + (currentPage - 1) * pageSize)}</span> of <span className="font-medium">{totalPages * pageSize}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">First</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Page numbers */}
                        {[...Array(totalPages).keys()].map(number => {
                          const page = number + 1;
                          // Show current page, and 1 page before and after
                          if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 border ${currentPage === page ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            // Show ellipsis
                            return (
                              <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Last</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <path fillRule="evenodd" d="M11.293 14.707a1 1 0 010-1.414L14.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Bookings;