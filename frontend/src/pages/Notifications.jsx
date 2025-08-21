import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  BellIcon,
  CheckIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Mock notifications data
        const mockNotifications = [
          {
            id: '1',
            type: 'booking_confirmed',
            title: 'Booking Confirmed',
            message: 'Your booking for Professional Camera has been confirmed',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            read: false,
            icon: CheckCircleIcon,
            color: 'text-green-500'
          },
          {
            id: '2',
            type: 'payment_received',
            title: 'Payment Received',
            message: 'You received ₹500 for DJ Equipment Set rental',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            read: false,
            icon: CurrencyRupeeIcon,
            color: 'text-green-500'
          },
          {
            id: '3',
            type: 'reminder',
            title: 'Pickup Reminder',
            message: 'Don\'t forget to pickup your rented camera tomorrow at 10 AM',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
            read: true,
            icon: InformationCircleIcon,
            color: 'text-blue-500'
          },
          {
            id: '4',
            type: 'warning',
            title: 'Return Reminder',
            message: 'Your rental period ends in 2 days. Please arrange return',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            read: true,
            icon: ExclamationTriangleIcon,
            color: 'text-orange-500'
          }
        ];
        
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay updated with your rental activities
                </p>
              </div>
            </div>
            {notifications.some(n => !n.read) && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary text-sm"
              >
                Mark All Read
              </button>
            )}
          </div>
        </motion.div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'read', label: 'Read' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
                {filterOption.key === 'unread' && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 ${
                  !notification.read ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <notification.icon className={`h-6 w-6 ${notification.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold mb-1">{notification.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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
            <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">
              {filter === 'all' ? 'No Notifications' : `No ${filter} Notifications`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'all' 
                ? "You're all caught up! New notifications will appear here."
                : `No ${filter} notifications found.`
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notifications;