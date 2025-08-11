import React, { useState } from 'react';
import { FaBell, FaCheck, FaTrash, FaExclamationCircle, FaInfoCircle, FaUserPlus, FaShoppingCart } from 'react-icons/fa';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'New Booking Request',
      message: 'John Doe has requested to rent Gaming PC for 5 days',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'System Update',
      message: 'System maintenance scheduled for tonight at 2 AM',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'success',
      title: 'New User Registration',
      message: 'Jane Smith has created a new account',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Inventory Alert',
      message: 'VR Headset stock is running low (2 units remaining)',
      time: '5 hours ago',
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <FaExclamationCircle className="text-red-500" size={20} />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" size={20} />;
      case 'success':
        return <FaUserPlus className="text-green-500" size={20} />;
      case 'warning':
        return <FaShoppingCart className="text-yellow-500" size={20} />;
      default:
        return <FaBell className="text-purple-500" size={20} />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <div className="flex space-x-4">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <FaCheck size={16} /> Mark All as Read
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-2"
          >
            <FaTrash size={16} /> Clear All
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 transition-colors ${notification.read ? 'bg-slate-800' : 'bg-slate-700'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{notification.title}</h3>
                        <p className="text-slate-400 mt-1">{notification.message}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-slate-500">{notification.time}</span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-purple-500 hover:text-purple-600"
                          >
                            <FaCheck size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FaBell className="text-slate-600 mx-auto mb-4" size={48} />
            <h3 className="text-white font-medium">No Notifications</h3>
            <p className="text-slate-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Notification Filters */}
      <div className="mt-6 bg-slate-800 rounded-lg p-4">
        <h2 className="text-white font-medium mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-3">
          {['All', 'Unread', 'Alerts', 'Info', 'Success', 'Warning'].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full text-sm font-medium bg-slate-700 text-white hover:bg-slate-600 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;