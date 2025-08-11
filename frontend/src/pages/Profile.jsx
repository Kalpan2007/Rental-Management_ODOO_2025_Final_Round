import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    }
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUser(data);
      setIsEditing(false);
      toast.success('Profile updated successfully');
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: darkMode ? '#583101' : '#FFEDD8' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        background: darkMode 
          ? 'linear-gradient(135deg, #583101 0%, #603808 25%, #6F4518 50%, #8B5E34 75%, #A47148 100%)'
          : 'linear-gradient(135deg, #FFEDD8 0%, #F3D5B5 25%, #E7BC91 50%, #D4A276 75%, #BC8A5F 100%)',
        color: darkMode ? '#FFEDD8' : '#583101'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div 
            className="w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl border-4"
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, #A47148 0%, #BC8A5F 100%)' 
                : 'linear-gradient(135deg, #8B5E34 0%, #6F4518 100%)',
              color: '#FFEDD8',
              borderColor: darkMode ? '#BC8A5F' : '#D4A276'
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <h1 className="text-4xl font-bold mb-3" style={{ color: darkMode ? '#FFEDD8' : '#583101' }}>
            {user.name || 'User'}
          </h1>
          <p 
            className="text-xl font-medium"
            style={{ color: darkMode ? '#F3D5B5' : '#8B5E34' }}
          >
            {user.isAdmin ? '👑 Administrator' : '✨ Customer'}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            className="flex rounded-2xl p-2 shadow-xl border-2"
            style={{
              backgroundColor: darkMode ? '#6F4518' : '#F3D5B5',
              borderColor: darkMode ? '#8B5E34' : '#D4A276'
            }}
          >
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'security', label: 'Security', icon: '🔒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: activeTab === tab.id
                    ? darkMode ? '#A47148' : '#8B5E34'
                    : 'transparent',
                  color: activeTab === tab.id
                    ? '#FFEDD8'
                    : darkMode ? '#F3D5B5' : '#6F4518',
                  boxShadow: activeTab === tab.id ? '0 8px 25px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Profile Section */}
              <motion.div
                className="rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border-2"
                style={{
                  backgroundColor: darkMode ? 'rgba(111, 69, 24, 0.9)' : 'rgba(255, 237, 216, 0.95)',
                  borderColor: darkMode ? '#A47148' : '#BC8A5F'
                }}
                variants={itemVariants}
              >
                <div className="px-10 py-10">
                  <div className="flex justify-between items-center mb-10">
                    <h2 
                      className="text-3xl font-bold flex items-center"
                      style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                    >
                      <span className="mr-4 text-2xl">📋</span>
                      Personal Information
                    </h2>
                    {!isEditing && (
                      <motion.button
                        onClick={() => setIsEditing(true)}
                        className="px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105"
                        style={{
                          backgroundColor: darkMode ? '#A47148' : '#8B5E34',
                          color: '#FFEDD8',
                          borderColor: darkMode ? '#BC8A5F' : '#6F4518'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ✏️ Edit Profile
                      </motion.button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.form
                        key="editing"
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                          <motion.div variants={itemVariants}>
                            <label 
                              htmlFor="name" 
                              className="block text-sm font-bold mb-3 flex items-center"
                              style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                            >
                              <span className="mr-2">👤</span>
                              Full Name
                            </label>
                            <input
                              id="name"
                              type="text"
                              className="w-full px-5 py-4 rounded-xl border-3 transition-all duration-300 focus:outline-none focus:ring-4 text-lg font-medium"
                              style={{
                                borderColor: errors.name
                                  ? '#DC2626'
                                  : darkMode ? '#8B5E34' : '#BC8A5F',
                                backgroundColor: darkMode ? '#603808' : '#FFEDD8',
                                color: darkMode ? '#FFEDD8' : '#583101',
                                boxShadow: errors.name 
                                  ? '0 0 0 4px rgba(220, 38, 38, 0.2)'
                                  : `0 0 0 4px ${darkMode ? 'rgba(164, 113, 72, 0.3)' : 'rgba(188, 138, 95, 0.3)'}`
                              }}
                              placeholder="Enter your full name"
                              {...register('name', { 
                                required: 'Name is required',
                                minLength: {
                                  value: 2,
                                  message: 'Name must be at least 2 characters'
                                }
                              })}
                            />
                            {errors.name && (
                              <motion.p 
                                className="text-red-600 text-sm mt-2 flex items-center font-semibold"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                ⚠️ {errors.name.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label 
                              htmlFor="email" 
                              className="block text-sm font-bold mb-3 flex items-center"
                              style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                            >
                              <span className="mr-2">📧</span>
                              Email Address
                            </label>
                            <input
                              id="email"
                              type="email"
                              className="w-full px-5 py-4 rounded-xl border-3 transition-all duration-300 cursor-not-allowed text-lg font-medium"
                              style={{
                                borderColor: darkMode ? '#8B5E34' : '#A47148',
                                backgroundColor: darkMode ? '#583101' : '#E7BC91',
                                color: darkMode ? '#D4A276' : '#6F4518'
                              }}
                              disabled
                              {...register('email')}
                            />
                            <p 
                              className="text-sm mt-2 flex items-center"
                              style={{ color: darkMode ? '#D4A276' : '#8B5E34' }}
                            >
                              <span className="mr-1">🔒</span>
                              Email cannot be changed for security reasons
                            </p>
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label 
                              htmlFor="phone" 
                              className="block text-sm font-bold mb-3 flex items-center"
                              style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                            >
                              <span className="mr-2">📞</span>
                              Phone Number
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              className="w-full px-5 py-4 rounded-xl border-3 transition-all duration-300 focus:outline-none focus:ring-4 text-lg font-medium"
                              style={{
                                borderColor: errors.phone
                                  ? '#DC2626'
                                  : darkMode ? '#8B5E34' : '#BC8A5F',
                                backgroundColor: darkMode ? '#603808' : '#FFEDD8',
                                color: darkMode ? '#FFEDD8' : '#583101',
                                boxShadow: errors.phone 
                                  ? '0 0 0 4px rgba(220, 38, 38, 0.2)'
                                  : `0 0 0 4px ${darkMode ? 'rgba(164, 113, 72, 0.3)' : 'rgba(188, 138, 95, 0.3)'}`
                              }}
                              placeholder="Enter your phone number"
                              {...register('phone', {
                                pattern: {
                                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                  message: 'Invalid phone number format'
                                }
                              })}
                            />
                            {errors.phone && (
                              <motion.p 
                                className="text-red-600 text-sm mt-2 flex items-center font-semibold"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                ⚠️ {errors.phone.message}
                              </motion.p>
                            )}
                          </motion.div>
                          
                          <motion.div variants={itemVariants}>
                            <label 
                              htmlFor="address" 
                              className="block text-sm font-bold mb-3 flex items-center"
                              style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                            >
                              <span className="mr-2">🏠</span>
                              Address
                            </label>
                            <input
                              id="address"
                              type="text"
                              className="w-full px-5 py-4 rounded-xl border-3 transition-all duration-300 focus:outline-none focus:ring-4 text-lg font-medium"
                              style={{
                                borderColor: darkMode ? '#8B5E34' : '#BC8A5F',
                                backgroundColor: darkMode ? '#603808' : '#FFEDD8',
                                color: darkMode ? '#FFEDD8' : '#583101',
                                boxShadow: `0 0 0 4px ${darkMode ? 'rgba(164, 113, 72, 0.3)' : 'rgba(188, 138, 95, 0.3)'}`
                              }}
                              placeholder="Enter your address"
                              {...register('address')}
                            />
                          </motion.div>
                        </div>
                        
                        <div className="flex justify-end space-x-6">
                          <motion.button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              reset();
                            }}
                            className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105"
                            style={{
                              backgroundColor: darkMode ? '#8B5E34' : '#D4A276',
                              color: darkMode ? '#F3D5B5' : '#583101',
                              borderColor: darkMode ? '#A47148' : '#BC8A5F'
                            }}
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ❌ Cancel
                          </motion.button>
                          <motion.button
                            type="submit"
                            className="px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                              backgroundColor: darkMode ? '#BC8A5F' : '#6F4518',
                              color: '#FFEDD8',
                              borderColor: darkMode ? '#D4A276' : '#8B5E34'
                            }}
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                          >
                            {loading ? (
                              <>
                                <LoadingSpinner size="small" />
                                <span className="ml-3">Saving...</span>
                              </>
                            ) : (
                              <>💾 Save Changes</>
                            )}
                          </motion.button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="viewing"
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {[
                          { icon: '👤', label: 'Full Name', value: user.name },
                          { icon: '📧', label: 'Email Address', value: user.email },
                          { icon: '📞', label: 'Phone Number', value: user.phone || 'Not provided' },
                          { icon: '🏠', label: 'Address', value: user.address || 'Not provided' },
                          { icon: '📅', label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString() },
                          { icon: '👑', label: 'Account Type', value: user.isAdmin ? 'Administrator' : 'Customer' }
                        ].map((item, index) => (
                          <motion.div
                            key={item.label}
                            className="p-8 rounded-2xl transition-all duration-300 shadow-lg border-2 transform hover:scale-105"
                            style={{
                              backgroundColor: darkMode ? 'rgba(139, 94, 52, 0.6)' : 'rgba(231, 188, 145, 0.7)',
                              borderColor: darkMode ? '#A47148' : '#BC8A5F'
                            }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                          >
                            <h3 
                              className="text-sm font-bold mb-3 flex items-center"
                              style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                            >
                              <span className="mr-2 text-lg">{item.icon}</span>
                              {item.label}
                            </h3>
                            <p 
                              className="text-xl font-semibold"
                              style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                            >
                              {item.value}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Security Section */}
              <motion.div
                className="rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border-2"
                style={{
                  backgroundColor: darkMode ? 'rgba(111, 69, 24, 0.9)' : 'rgba(255, 237, 216, 0.95)',
                  borderColor: darkMode ? '#A47148' : '#BC8A5F'
                }}
                variants={itemVariants}
              >
                <div className="px-10 py-10">
                  <h2 
                    className="text-3xl font-bold mb-10 flex items-center"
                    style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                  >
                    <span className="mr-4 text-2xl">🔒</span>
                    Security Settings
                  </h2>
                  
                  <div className="space-y-8">
                    <motion.div
                      className="p-8 rounded-2xl border-2 transition-all duration-300 shadow-lg transform hover:scale-102"
                      style={{
                        backgroundColor: darkMode ? 'rgba(139, 94, 52, 0.6)' : 'rgba(231, 188, 145, 0.7)',
                        borderColor: darkMode ? '#BC8A5F' : '#D4A276'
                      }}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 
                            className="text-xl font-bold mb-3 flex items-center"
                            style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                          >
                            <span className="mr-3">🔐</span>
                            Password Security
                          </h3>
                          <p 
                            className="text-base mb-4 leading-relaxed"
                            style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                          >
                            Keep your account secure with a strong password. We recommend using at least 8 characters with a mix of letters, numbers, and symbols.
                          </p>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: '#22C55E' }}
                            ></div>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: darkMode ? '#D4A276' : '#8B5E34' }}
                            >
                              Password last updated 30 days ago
                            </span>
                          </div>
                        </div>
                        <motion.button
                          className="ml-6 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105"
                          style={{
                            backgroundColor: darkMode ? '#A47148' : '#8B5E34',
                            color: '#FFEDD8',
                            borderColor: darkMode ? '#BC8A5F' : '#6F4518'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Change Password
                        </motion.button>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="p-8 rounded-2xl border-2 transition-all duration-300 shadow-lg transform hover:scale-102"
                      style={{
                        backgroundColor: darkMode ? 'rgba(139, 94, 52, 0.6)' : 'rgba(231, 188, 145, 0.7)',
                        borderColor: darkMode ? '#BC8A5F' : '#D4A276'
                      }}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 
                            className="text-xl font-bold mb-3 flex items-center"
                            style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                          >
                            <span className="mr-3">🛡️</span>
                            Two-Factor Authentication
                          </h3>
                          <p 
                            className="text-base mb-4 leading-relaxed"
                            style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                          >
                            Add an extra layer of protection to your account. Enable 2FA using your phone or authenticator app for enhanced security.
                          </p>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: '#EF4444' }}
                            ></div>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: darkMode ? '#D4A276' : '#8B5E34' }}
                            >
                              2FA is currently disabled
                            </span>
                          </div>
                        </div>
                        <motion.button
                          className="ml-6 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105"
                          style={{
                            backgroundColor: darkMode ? '#D4A276' : '#A47148',
                            color: darkMode ? '#583101' : '#FFEDD8',
                            borderColor: darkMode ? '#E7BC91' : '#8B5E34'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Enable 2FA
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-8 rounded-2xl border-2 transition-all duration-300 shadow-lg transform hover:scale-102"
                      style={{
                        backgroundColor: darkMode ? 'rgba(139, 94, 52, 0.6)' : 'rgba(231, 188, 145, 0.7)',
                        borderColor: darkMode ? '#BC8A5F' : '#D4A276'
                      }}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 
                            className="text-xl font-bold mb-3 flex items-center"
                            style={{ color: darkMode ? '#FFEDD8' : '#583101' }}
                          >
                            <span className="mr-3">📱</span>
                            Active Sessions
                          </h3>
                          <p 
                            className="text-base mb-4 leading-relaxed"
                            style={{ color: darkMode ? '#F3D5B5' : '#6F4518' }}
                          >
                            Monitor and manage your login sessions across all devices and locations. Log out from devices you don't recognize.
                          </p>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: '#3B82F6' }}
                            ></div>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: darkMode ? '#D4A276' : '#8B5E34' }}
                            >
                              3 active sessions detected
                            </span>
                          </div>
                        </div>
                        <motion.button
                          className="ml-6 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl border-2 transform hover:scale-105"
                          style={{
                            backgroundColor: darkMode ? '#BC8A5F' : '#6F4518',
                            color: '#FFEDD8',
                            borderColor: darkMode ? '#D4A276' : '#8B5E34'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Manage Sessions
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;