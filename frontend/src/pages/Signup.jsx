import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { EyeIcon, EyeSlashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    mode: 'onBlur' // Better UX with validation on blur
  });
  
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      
      await signup({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password
      });
      
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Failed to create account. Please try again.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    const strengthConfig = {
      0: { label: '', color: '' },
      1: { label: 'Very Weak', color: 'bg-red-500' },
      2: { label: 'Weak', color: 'bg-orange-500' },
      3: { label: 'Fair', color: 'bg-yellow-500' },
      4: { label: 'Good', color: 'bg-blue-500' },
      5: { label: 'Strong', color: 'bg-green-500' }
    };
    
    return { strength, ...strengthConfig[strength], checks };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300 ${
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
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 ${
          darkMode ? 'bg-[#bc8a5f]' : 'bg-[#a47148]'
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
            Create Account
          </h2>
          <p className={`text-sm ${
            darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
          }`}>
            Join us today and get started
          </p>
          <p className={`mt-4 text-sm ${
            darkMode ? 'text-[#d4a276]' : 'text-[#6f4518]'
          }`}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className={`font-semibold transition-colors duration-200 hover:underline ${
                darkMode 
                  ? 'text-[#f3d5b5] hover:text-[#ffedd8]' 
                  : 'text-[#8b5e34] hover:text-[#6f4518]'
              }`}
            >
              Sign in here
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
                <XMarkIcon className="h-5 w-5 text-red-400" />
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
            {/* Full Name Field */}
            <div className="relative">
              <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                    : darkMode
                    ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                    : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                }`}
                placeholder="Enter your full name"
                {...register('name', { 
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long'
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Name can only contain letters and spaces'
                  }
                })}
              />
              {errors.name && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </motion.p>
              )}
            </div>

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
                placeholder="Enter your email address"
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
                  <XMarkIcon className="w-4 h-4 mr-1" />
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
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                      : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                  }`}
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {password && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                    }`}>
                      Password Strength: {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    />
                  </div>
                </motion.div>
              )}

              {errors.password && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-[#f3d5b5]' : 'text-[#6f4518]'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                      : confirmPassword && confirmPassword === password
                      ? 'border-green-300 focus:border-green-500 focus:ring-green-500/20'
                      : darkMode
                      ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8] placeholder-[#d4a276] focus:border-[#bc8a5f] focus:ring-[#bc8a5f]/20'
                      : 'border-[#d4a276] bg-white text-[#583101] placeholder-[#8b5e34] focus:border-[#8b5e34] focus:ring-[#8b5e34]/20'
                  }`}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors ${
                    darkMode 
                      ? 'text-[#d4a276] hover:text-[#f3d5b5]' 
                      : 'text-[#8b5e34] hover:text-[#6f4518]'
                  }`}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
                
                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2">
                    {confirmPassword === password ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  className="text-red-500 text-sm mt-1 flex items-center"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className={`h-4 w-4 mt-0.5 rounded border-2 transition-colors ${
                  darkMode
                    ? 'border-[#8b5e34] text-[#bc8a5f] focus:ring-[#bc8a5f] bg-[#6f4518]'
                    : 'border-[#d4a276] text-[#8b5e34] focus:ring-[#8b5e34] bg-white'
                }`}
                {...register('terms', { 
                  required: 'You must agree to the terms and conditions'
                })}
              />
              <label htmlFor="terms" className={`ml-3 block text-sm ${
                darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
              }`}>
                I agree to the{' '}
                <Link 
                  to="/terms" 
                  className={`font-medium transition-colors duration-200 hover:underline ${
                    darkMode 
                      ? 'text-[#f3d5b5] hover:text-[#ffedd8]' 
                      : 'text-[#8b5e34] hover:text-[#6f4518]'
                  }`}
                >
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link 
                  to="/privacy" 
                  className={`font-medium transition-colors duration-200 hover:underline ${
                    darkMode 
                      ? 'text-[#f3d5b5] hover:text-[#ffedd8]' 
                      : 'text-[#8b5e34] hover:text-[#6f4518]'
                  }`}
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <motion.p 
                className="text-red-500 text-sm flex items-center ml-7"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                {errors.terms.message}
              </motion.p>
            )}
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
                <span className="ml-2">Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;