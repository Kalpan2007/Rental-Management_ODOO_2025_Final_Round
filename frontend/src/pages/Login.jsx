import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Get redirect path from location state or default to home
  const from = location.state?.from || '/';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    mode: 'onBlur' // Better UX with validation on blur
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      await login({
        email: data.email.trim(),
        password: data.password
      });
      
      navigate(from, { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to login. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
          darkMode ? 'bg-[#a47148]' : 'bg-[#bc8a5f]'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
          darkMode ? 'bg-[#8b5e34]' : 'bg-[#d4a276]'
        }`} />
      </div>

      <motion.div 
        className={`relative max-w-md w-full space-y-8 p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
          darkMode 
            ? 'bg-[#603808]/90 border-[#8b5e34]/50 shadow-2xl shadow-[#583101]/50' 
            : 'bg-white/90 border-[#d4a276]/30 shadow-2xl shadow-[#bc8a5f]/20'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className={`text-3xl font-bold mb-2 ${
            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
          }`}>
            Welcome Back
          </h2>
          <p className={`text-sm ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Sign in to continue to your account
          </p>
          <p className={`mt-4 text-sm ${
            darkMode ? 'text-[#d4a276]' : 'text-[#6f4518]'
          }`}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className={`font-semibold transition-colors duration-200 hover:underline ${
                darkMode 
                  ? 'text-[#f3d5b5] hover:text-[#ffedd8]' 
                  : 'text-[#8b5e34] hover:text-[#6f4518]'
              }`}
            >
              Create one here
            </Link>
          </p>
        </motion.div>
        
        {/* Error Alert */}
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative"
            role="alert"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Form */}
        <motion.form 
          className="space-y-6" 
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : darkMode
                    ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                    : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                }`}
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                      : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                  }`}
                  placeholder="Enter your password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                    darkMode 
                      ? 'text-[#d4a276] hover:text-[#f3d5b5]' 
                      : 'text-[#8b5e34] hover:text-[#6f4518]'
                  }`}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </motion.p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded border-2 transition-colors ${
                  darkMode
                    ? 'border-[#8b5e34] text-[#bc8a5f] focus:ring-[#bc8a5f] bg-[#6f4518]'
                    : 'border-[#d4a276] text-[#8b5e34] focus:ring-[#8b5e34] bg-white'
                }`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
              }`}>
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link 
                to="/forgot-password" 
                className={`font-medium transition-colors duration-200 hover:underline ${
                  darkMode 
                    ? 'text-[#f3d5b5] hover:text-[#ffedd8]' 
                    : 'text-[#8b5e34] hover:text-[#6f4518]'
                }`}
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] focus:ring-[#bc8a5f] focus:ring-offset-[#603808] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] focus:ring-[#8b5e34] focus:ring-offset-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            transition={{ duration: 0.1 }}
          >
            {loading ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;