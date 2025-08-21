import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  XCircleIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const PaymentCancel = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`rounded-2xl shadow-2xl p-8 text-center backdrop-blur-sm border ${
            darkMode 
              ? 'bg-[#603808]/90 border-[#8b5e34]/50' 
              : 'bg-white/90 border-[#d4a276]/30'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Cancel Icon */}
          <motion.div
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
              darkMode ? 'bg-red-900/30' : 'bg-red-100'
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          >
            <XCircleIcon className="h-16 w-16 text-red-600 dark:text-red-400" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Payment Cancelled
            </h1>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Your payment was cancelled and no charges were made
            </p>
          </motion.div>

          {/* Reasons */}
          <motion.div
            className={`rounded-xl p-6 mb-8 text-left border-2 ${
              darkMode 
                ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                : 'bg-[#f3d5b5]/30 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className={`font-bold text-lg mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Common reasons for cancellation:
            </h3>
            <ul className={`space-y-2 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
            }`}>
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
              <Link 
                to="/products" 
                className={`flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Products
              </Link>
              <Link 
                to="/support" 
                className={`flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
                Need Help?
              </Link>
            </div>
            
            <Link 
              to="/" 
              className={`w-full flex items-center justify-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                darkMode
                  ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
              }`}
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className={`mt-8 p-6 rounded-xl border-2 ${
              darkMode 
                ? 'bg-yellow-900/20 border-yellow-800' 
                : 'bg-yellow-50 border-yellow-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className={`font-bold text-lg mb-3 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              Having trouble with payment?
            </h4>
            <p className={`text-sm mb-4 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              Our support team is here to help you complete your booking
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link 
                to="/contact" 
                className={`hover:underline text-sm font-semibold ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              >
                Contact Support
              </Link>
              <span className={`hidden sm:inline ${
                darkMode ? 'text-yellow-400' : 'text-yellow-600'
              }`}>
                •
              </span>
              <Link 
                to="/faq" 
                className={`hover:underline text-sm font-semibold ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
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