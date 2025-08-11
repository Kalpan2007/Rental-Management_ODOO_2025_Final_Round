import React, { useState } from 'react';
import { FaDownload, FaCalendar } from 'react-icons/fa';
import Button from '../components/Button';

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [dateRange, setDateRange] = useState('last30');

  const reports = [
    { id: 'revenue', name: 'Revenue Report', description: 'Detailed breakdown of revenue from all rentals' },
    { id: 'products', name: 'Product Performance', description: 'Analysis of product rentals and popularity' },
    { id: 'customers', name: 'Customer Analytics', description: 'Customer behavior and rental patterns' },
    { id: 'inventory', name: 'Inventory Status', description: 'Current inventory levels and utilization' },
  ];

  const mockData = {
    revenue: [
      { date: '2024-01-15', revenue: 1200, orders: 8 },
      { date: '2024-01-16', revenue: 950, orders: 6 },
      { date: '2024-01-17', revenue: 1500, orders: 10 },
    ],
    products: [
      { name: 'Gaming PC', rentals: 45, revenue: 6750 },
      { name: 'VR Headset', rentals: 32, revenue: 2560 },
      { name: 'Gaming Console', rentals: 28, revenue: 2800 },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <FaDownload /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-1 space-y-4">
          {reports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${selectedReport === report.id ? 'bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              <h3 className="text-white font-medium">{report.name}</h3>
              <p className="text-slate-400 text-sm mt-1">{report.description}</p>
            </button>
          ))}
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 rounded-lg p-6">
            {selectedReport === 'revenue' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Revenue Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: 'Total Revenue', value: '$12,450', change: '+15%' },
                    { label: 'Average Order Value', value: '$150', change: '+8%' },
                    { label: 'Total Orders', value: '83', change: '+12%' },
                  ].map((stat, index) => (
                    <div key={index} className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-slate-400 text-sm">{stat.label}</h3>
                      <div className="flex items-end gap-2 mt-2">
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                        <span className="text-green-500 text-sm">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-700 pt-6">
                  <h3 className="text-lg font-medium text-white mb-4">Daily Revenue</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-400 text-sm">
                        <th className="text-left py-2">Date</th>
                        <th className="text-right py-2">Revenue</th>
                        <th className="text-right py-2">Orders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.revenue.map((day, index) => (
                        <tr key={index} className="border-t border-slate-700">
                          <td className="py-3 text-white">{day.date}</td>
                          <td className="py-3 text-right text-white">${day.revenue}</td>
                          <td className="py-3 text-right text-white">{day.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedReport === 'products' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Product Performance</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-400 text-sm">
                        <th className="text-left py-2">Product</th>
                        <th className="text-right py-2">Total Rentals</th>
                        <th className="text-right py-2">Revenue</th>
                        <th className="text-right py-2">Utilization</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.products.map((product, index) => (
                        <tr key={index} className="border-t border-slate-700">
                          <td className="py-3 text-white">{product.name}</td>
                          <td className="py-3 text-right text-white">{product.rentals}</td>
                          <td className="py-3 text-right text-white">${product.revenue}</td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end">
                              <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-purple-600"
                                  style={{ width: `${(product.rentals / 50) * 100}%` }}
                                />
                              </div>
                              <span className="text-white ml-2">{Math.round((product.rentals / 50) * 100)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedReport === 'customers' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Customer Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-4">Customer Segments</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Regular Customers', value: '65%', color: 'bg-purple-600' },
                        { label: 'Premium Members', value: '25%', color: 'bg-blue-600' },
                        { label: 'New Users', value: '10%', color: 'bg-green-600' },
                      ].map((segment, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-400">{segment.label}</span>
                            <span className="text-white">{segment.value}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${segment.color}`}
                              style={{ width: segment.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-4">Rental Duration</h3>
                    <div className="space-y-4">
                      {[
                        { label: '1-3 Days', value: '30%' },
                        { label: '4-7 Days', value: '45%' },
                        { label: '8-14 Days', value: '15%' },
                        { label: '15+ Days', value: '10%' },
                      ].map((duration, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-400">{duration.label}</span>
                            <span className="text-white">{duration.value}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-600"
                              style={{ width: duration.value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'inventory' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Inventory Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: 'Gaming PC', total: 20, available: 12, maintenance: 2 },
                    { name: 'VR Headset', total: 15, available: 8, maintenance: 1 },
                    { name: 'Gaming Console', total: 25, available: 15, maintenance: 3 },
                    { name: 'Gaming Laptop', total: 10, available: 5, maintenance: 1 },
                    { name: 'Racing Wheel', total: 8, available: 6, maintenance: 0 },
                    { name: 'Gaming Chair', total: 12, available: 7, maintenance: 1 },
                  ].map((item, index) => (
                    <div key={index} className="bg-slate-700 rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">{item.name}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Total Units</span>
                          <span className="text-white">{item.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Available</span>
                          <span className="text-green-500">{item.available}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">In Maintenance</span>
                          <span className="text-yellow-500">{item.maintenance}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Rented</span>
                          <span className="text-purple-500">
                            {item.total - item.available - item.maintenance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;