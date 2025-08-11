import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserPayments } from '../../api/payments';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const response = await getUserPayments();
        setPayments(response.data);
      } catch (err) {
        setError('Failed to load payment history. Please try again later.');
        console.error('Error fetching payments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-4">No Payment History</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You haven't made any payments yet. Start by booking a product!
        </p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Booking
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {payments.map((payment) => (
              <motion.tr 
                key={payment._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-750"
              >
                <td className="py-4 px-4 whitespace-nowrap">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-mono text-sm">
                  {payment.transactionId || payment._id.substring(0, 10)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {payment.booking ? (
                    <Link 
                      to={`/bookings/${payment.booking._id}`}
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
                    >
                      {payment.booking.product?.name || 'Booking'}
                    </Link>
                  ) : 'N/A'}
                </td>
                <td className="py-4 px-4 whitespace-nowrap font-medium">
                  ${(payment.amount / 100).toFixed(2)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === 'succeeded' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;