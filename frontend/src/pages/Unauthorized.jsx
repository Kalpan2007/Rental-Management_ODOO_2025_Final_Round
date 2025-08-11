import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Unauthorized = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div 
        className={`max-w-md w-full p-8 rounded-lg shadow-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 mb-6"
        >
          <svg 
            className="w-12 h-12 text-red-600 dark:text-red-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V8m0 0V6m0 2h2M9 10h2"
            />
          </svg>
        </motion.div>
        
        <motion.h1 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Access Denied
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Sorry, you don't have permission to access this page. This area is restricted to authorized personnel only.
        </motion.p>
        
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            to="/"
            className="block w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
          >
            Return to Home
          </Link>
          
          <Link 
            to="/login"
            className="block w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition duration-200"
          >
            Login with Different Account
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;