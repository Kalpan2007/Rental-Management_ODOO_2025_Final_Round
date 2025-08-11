import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminAnalytics = () => {
  // Mock data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [3000, 3500, 4200, 4800, 5100, 5800],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const productRentalsData = {
    labels: ['Gaming PC', 'VR Headset', 'Console', 'Gaming Laptop', 'Accessories'],
    datasets: [
      {
        label: 'Product Rentals',
        data: [45, 32, 28, 25, 20],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
      },
    ],
  };

  const customerTypeData = {
    labels: ['Regular', 'Premium', 'Business'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: [
          'rgba(147, 51, 234, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Revenue Trend</h2>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                },
                x: {
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                },
              },
              plugins: {
                legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } },
              },
            }}
          />
        </div>

        {/* Product Rentals */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Product Rentals</h2>
          <Bar
            data={productRentalsData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                },
                x: {
                  grid: { color: 'rgba(255, 255, 255, 0.1)' },
                  ticks: { color: 'rgba(255, 255, 255, 0.7)' },
                },
              },
              plugins: {
                legend: { labels: { color: 'rgba(255, 255, 255, 0.7)' } },
              },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Types */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Customer Types</h2>
          <div className="w-full max-w-[300px] mx-auto">
            <Doughnut
              data={customerTypeData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: 'rgba(255, 255, 255, 0.7)' },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Rentals', value: '156', change: '+12%' },
              { label: 'New Customers', value: '45', change: '+8%' },
              { label: 'Average Rental Duration', value: '7.5 days', change: '+5%' },
              { label: 'Customer Satisfaction', value: '4.8/5', change: '+2%' },
            ].map((metric, index) => (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-slate-400 text-sm">{metric.label}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className="text-green-500 text-sm">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;