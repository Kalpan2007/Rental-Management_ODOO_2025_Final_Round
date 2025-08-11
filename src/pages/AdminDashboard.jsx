import React from 'react';
import { FaUsers, FaBox, FaCalendarCheck, FaRupeeSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  // Mock data for statistics
  const stats = [
    { id: 1, title: 'Total Users', value: '1,234', icon: FaUsers, change: '+12%', color: 'bg-blue-500' },
    { id: 2, title: 'Total Products', value: '456', icon: FaBox, change: '+8%', color: 'bg-purple-500' },
    { id: 3, title: 'Active Bookings', value: '89', icon: FaCalendarCheck, change: '+15%', color: 'bg-green-500' },
    { id: 4, title: 'Revenue', value: '₹45,678', icon: FaRupeeSign, change: '+20%', color: 'bg-yellow-500' },
  ];

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
  ];

  const bookingsData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 50 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 60 },
    { name: 'Jun', value: 55 },
  ];

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'booked', product: 'Camera Sony A7III', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'returned', product: 'DJI Mavic Air 2', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'booked', product: 'MacBook Pro', time: '5 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'cancelled', product: 'iPhone 13 Pro', time: '6 hours ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-lg p-6 dark:bg-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2 dark:text-white">{stat.value}</h3>
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-slate-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-slate-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Bookings Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-slate-800">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-300 font-medium">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{activity.user}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.action} {activity.product}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;