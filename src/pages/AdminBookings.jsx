import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: 'John Doe',
      product: 'Gaming PC',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      status: 'Pending',
      total: 750
    },
    {
      id: 2,
      customer: 'Jane Smith',
      product: 'VR Headset',
      startDate: '2024-01-18',
      endDate: '2024-01-22',
      status: 'Approved',
      total: 320
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      product: 'Gaming Console',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'Completed',
      total: 500
    }
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Approved':
        return 'bg-green-500/20 text-green-500';
      case 'Completed':
        return 'bg-blue-500/20 text-blue-500';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-slate-500/20 text-slate-500';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Bookings Management</h1>

      {/* Bookings Table */}
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 text-white">{booking.customer}</td>
                <td className="px-6 py-4 text-white">{booking.product}</td>
                <td className="px-6 py-4 text-white">
                  <div className="text-sm">
                    <div>From: {booking.startDate}</div>
                    <div>To: {booking.endDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">${booking.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setSelectedBooking(booking)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEye size={18} />
                    </button>
                    {booking.status === 'Pending' && (
                      <>
                        <button className="text-green-500 hover:text-green-600">
                          <FaCheck size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-600">
                          <FaTimes size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Customer</p>
                  <p className="text-white">{selectedBooking.customer}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Product</p>
                  <p className="text-white">{selectedBooking.product}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Start Date</p>
                  <p className="text-white">{selectedBooking.startDate}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">End Date</p>
                  <p className="text-white">{selectedBooking.endDate}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Total Amount</p>
                  <p className="text-white">${selectedBooking.total}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;