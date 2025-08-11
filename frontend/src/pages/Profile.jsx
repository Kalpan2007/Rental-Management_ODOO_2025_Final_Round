import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className={`rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className="input w-full"
                      {...register('name', { 
                        required: 'Name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters'
                        }
                      })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className="input w-full bg-gray-100 cursor-not-allowed"
                      disabled
                      {...register('email')}
                    />
                    <p className="text-xs mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      className="input w-full"
                      {...register('phone', {
                        pattern: {
                          value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                          message: 'Invalid phone number format'
                        }
                      })}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                    <input
                      id="address"
                      type="text"
                      className="input w-full"
                      {...register('address')}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      reset();
                    }}
                    className="btn-secondary"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
                  <p className="mt-1">{user.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</h3>
                  <p className="mt-1">{user.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</h3>
                  <p className="mt-1">{user.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                  <p className="mt-1">{user.address || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                  <p className="mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h3>
                  <p className="mt-1">{user.isAdmin ? 'Administrator' : 'Customer'}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          className={`mt-8 rounded-lg shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold mb-6">Security</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Password</h3>
              <p className="text-sm mb-4">Change your password to keep your account secure.</p>
              <button className="btn-secondary">
                Change Password
              </button>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
              <p className="text-sm mb-4">Add an extra layer of security to your account.</p>
              <button className="btn-secondary">
                Enable 2FA
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;