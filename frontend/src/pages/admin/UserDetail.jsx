import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getUser, updateUserRole, updateUserStatus } from '../../api/users';
import { getUserBookings } from '../../api/bookings';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const UserDetail = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getUser(id);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load user details');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserBookings = async () => {
      setBookingsLoading(true);
      try {
        const response = await getUserBookings(id);
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching user bookings:', err);
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchUser();
    fetchUserBookings();
  }, [id]);

  const handleUpdateStatus = async () => {
    const newStatus = !user.isActive;
    const action = newStatus ? 'activate' : 'deactivate';
    
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      setProcessingAction(true);
      try {
        await updateUserStatus(id, { isActive: newStatus });
        toast.success(`User ${action}d successfully`);
        
        // Update user in state
        setUser(prev => ({ ...prev, isActive: newStatus }));
      } catch (err) {
        toast.error(`Failed to ${action} user`);
        console.error(`Error ${action}ing user:`, err);
      } finally {
        setProcessingAction(false);
      }
    }
  };

  const handleUpdateRole = async (newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      setProcessingAction(true);
      try {
        await updateUserRole(id, { role: newRole });
        toast.success(`User role updated to ${newRole} successfully`);
        
        // Update user in state
        setUser(prev => ({ ...prev, role: newRole }));
      } catch (err) {
        toast.error('Failed to update user role');
        console.error('Error updating user role:', err);
      } finally {
        setProcessingAction(false);
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format date with time
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <p className="text-red-500 text-xl">{error}</p>
            <button 
              onClick={() => navigate('/admin/users')}
              className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/admin/users')}
            className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>

        {/* User Profile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - User Info */}
          <div className="md:col-span-2 space-y-6">
            {/* User Information */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mr-4">
                  {user.profileImage ? (
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={user.profileImage}
                      alt={user.name}
                    />
                  ) : (
                    <span className="text-3xl font-medium text-gray-500 dark:text-gray-300">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                  <p>{user.address || 'Not provided'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p>{formatDate(user.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                    <p>{formatDate(user.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* User Bookings */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4">Booking History</h2>
              
              {bookingsLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner size="medium" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div 
                      key={booking._id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition duration-200`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Link 
                            to={`/admin/bookings/${booking._id}`}
                            className="font-medium hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {booking.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Total:</span> ${booking.totalPrice}
                        </p>
                        <Link 
                          to={`/admin/bookings/${booking._id}`}
                          className="text-sm text-primary-600 hover:text-primary-700 dark:hover:text-primary-400"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                  
                  {bookings.length > 5 && (
                    <div className="text-center pt-2">
                      <Link 
                        to={`/admin/bookings?userId=${user._id}`}
                        className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400 text-sm font-medium"
                      >
                        View All {bookings.length} Bookings
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  This user has no bookings yet
                </div>
              )}
            </motion.div>

            {/* Activity Log */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
              {user.activityLog && user.activityLog.length > 0 ? (
                <div className="space-y-4">
                  {user.activityLog.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 relative">
                        <div className="h-4 w-4 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        {index < user.activityLog.length - 1 && (
                          <div className="absolute top-4 bottom-0 left-2 w-0.5 -ml-px bg-gray-300 dark:bg-gray-600"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(activity.timestamp)}</p>
                        {activity.note && <p className="text-sm mt-1">{activity.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No activity recorded
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column - Actions */}
          <div className="space-y-6">
            {/* User Actions */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handleUpdateStatus}
                  disabled={processingAction}
                  className={`w-full py-2 px-4 rounded-md ${user.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center`}
                >
                  {processingAction ? (
                    <>
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    user.isActive ? 'Deactivate User' : 'Activate User'
                  )}
                </button>
                
                {user.role === 'user' ? (
                  <button
                    onClick={() => handleUpdateRole('admin')}
                    disabled={processingAction}
                    className="w-full py-2 px-4 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Promote to Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateRole('user')}
                    disabled={processingAction}
                    className="w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Demote to User
                  </button>
                )}
                
                <Link 
                  to={`/admin/bookings?userId=${user._id}`}
                  className="block w-full py-2 px-4 text-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition duration-200"
                >
                  View All Bookings
                </Link>
              </div>
            </motion.div>

            {/* User Stats */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 dark:text-gray-400">Total Bookings</p>
                  <p className="font-semibold">{bookings.length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 dark:text-gray-400">Active Bookings</p>
                  <p className="font-semibold">{bookings.filter(b => b.status === 'active' || b.status === 'confirmed').length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 dark:text-gray-400">Completed Bookings</p>
                  <p className="font-semibold">{bookings.filter(b => b.status === 'completed').length}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 dark:text-gray-400">Cancelled Bookings</p>
                  <p className="font-semibold">{bookings.filter(b => b.status === 'cancelled').length}</p>
                </div>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 dark:text-gray-400">Total Spent</p>
                    <p className="font-semibold">
                      ${bookings.reduce((total, booking) => total + (booking.totalPrice || 0), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-4">Admin Notes</h2>
              <textarea
                className={`w-full p-3 rounded-md border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                rows="4"
                placeholder="Add notes about this user (only visible to admins)"
                value={user.adminNotes || ''}
                readOnly
              ></textarea>
              <button
                className="mt-3 w-full py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition duration-200"
                onClick={() => toast.info('Note editing feature coming soon!')}
              >
                Save Notes
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;