import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  XCircleIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
  // RefreshIcon
  
} from '@heroicons/react/24/outline';

const PaymentCancel = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className={`rounded-3xl shadow-2xl p-12 text-center backdrop-blur-sm border ${
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
            className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center mb-8 ${
              darkMode ? 'bg-red-900/30' : 'bg-red-100'
            }`}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            <XCircleIcon className="h-20 w-20 text-red-600 dark:text-red-400" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className={`text-5xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Payment Cancelled
            </h1>
            <p className={`text-2xl mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Your payment was cancelled and no charges were made
            </p>
          </motion.div>

          {/* Reasons */}
          <motion.div
            className={`rounded-2xl p-8 mb-8 text-left border-2 ${
              darkMode 
                ? 'bg-[#8b5e34]/20 border-[#bc8a5f]/30' 
                : 'bg-[#f3d5b5]/30 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className={`font-bold text-xl mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Common reasons for cancellation:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className={`space-y-3 ${
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
              </ul>
              <ul className={`space-y-3 ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
              }`}>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  You chose to cancel the transaction
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Card details were incorrect
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                  Insufficient funds
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link 
                to="/products" 
                className={`flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                <ArrowLeftIcon className="h-6 w-6 mr-3" />
                Back to Products
              </Link>
              
              <button
                onClick={() => window.location.reload()}
                className={`flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                {/* <RefreshIcon className="h-6 w-6 mr-3" /> */}
                Try Again
              </button>
            </div>
            
            <Link 
              to="/" 
              className={`w-full flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 border-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                darkMode
                  ? 'border-[#8b5e34] text-[#e7bc91] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                  : 'border-[#d4a276] text-[#6f4518] hover:bg-[#d4a276] hover:text-[#583101]'
              }`}
            >
              <HomeIcon className="h-6 w-6 mr-3" />
              Go Home
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className={`mt-12 p-8 rounded-2xl border-2 ${
              darkMode 
                ? 'bg-yellow-900/20 border-yellow-800' 
                : 'bg-yellow-50 border-yellow-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h4 className={`font-bold text-xl mb-4 flex items-center justify-center ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              <QuestionMarkCircleIcon className="h-6 w-6 mr-2" />
              Having trouble with payment?
            </h4>
            <p className={`text-center mb-6 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              Our support team is here to help you complete your booking with custom pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                }`}
              >
                📞 Contact Support
              </Link>
              <Link 
                to="/faq" 
                className={`py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white'
                    : 'border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white'
                }`}
              >
                ❓ Payment FAQ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentCancel;