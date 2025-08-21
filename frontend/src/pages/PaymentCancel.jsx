import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  XCircleIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const PaymentCancel = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 text-center`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Cancel Icon */}
          <motion.div
            className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <XCircleIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              Payment Cancelled
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your payment was cancelled and no charges were made
            </p>
          </motion.div>

          {/* Reasons */}
          <motion.div
            className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-6 mb-8 text-left`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="font-semibold text-lg mb-4">Common reasons for cancellation:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                You clicked the back button during payment
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                Payment window was closed
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                Session timeout occurred
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                You chose to cancel the transaction
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/products" className="btn-primary flex items-center justify-center">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Products
              </Link>
              <Link to="/support" className="btn-secondary flex items-center justify-center">
                <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
                Need Help?
              </Link>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className={`mt-8 p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} border ${darkMode ? 'border-yellow-800' : 'border-yellow-200'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
              Having trouble with payment?
            </h4>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
              Our support team is here to help you complete your booking
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                to="/contact" 
                className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium"
              >
                Contact Support
              </Link>
              <span className="hidden sm:inline text-yellow-600 dark:text-yellow-400">•</span>
              <Link 
                to="/faq" 
                className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm font-medium"
              >
                Payment FAQ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentCancel;