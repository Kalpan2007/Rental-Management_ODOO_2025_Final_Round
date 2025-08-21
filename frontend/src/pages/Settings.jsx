import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'payments', label: 'Payments', icon: CreditCardIcon },
    { id: 'preferences', label: 'Preferences', icon: GlobeAltIcon }
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateUser(data);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          className="input w-full"
                          {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          className="input w-full"
                          disabled
                          {...register('email')}
                        />
                        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          className="input w-full"
                          {...register('phone')}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input
                          type="text"
                          className="input w-full"
                          {...register('address')}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    {[
                      { title: 'Email Notifications', description: 'Receive notifications via email' },
                      { title: 'SMS Notifications', description: 'Receive notifications via SMS' },
                      { title: 'Booking Updates', description: 'Get notified about booking status changes' },
                      { title: 'Payment Alerts', description: 'Receive payment confirmation and receipts' },
                      { title: 'Marketing Emails', description: 'Receive promotional offers and updates' }
                    ].map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{setting.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-semibold mb-2">Change Password</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Update your password to keep your account secure
                      </p>
                      <button className="btn-primary">Change Password</button>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="btn-secondary">Enable 2FA</button>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-semibold mb-2">Login Sessions</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Manage your active login sessions
                      </p>
                      <button className="btn-secondary">View Sessions</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payments Tab */}
              {activeTab === 'payments' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Settings</h2>
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-semibold mb-2">Payment Methods</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Manage your saved payment methods
                      </p>
                      <button className="btn-primary">Manage Payment Methods</button>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h3 className="font-semibold mb-2">Billing History</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        View your payment history and download receipts
                      </p>
                      <button className="btn-secondary">View History</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Switch between light and dark themes
                        </p>
                      </div>
                      <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-yellow-500 text-yellow-900' 
                            : 'bg-gray-700 text-yellow-400'
                        }`}
                      >
                        {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Choose your preferred language
                        </p>
                      </div>
                      <select className="input w-32">
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="mr">Marathi</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Currency</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Display prices in your preferred currency
                        </p>
                      </div>
                      <select className="input w-32">
                        <option value="INR">₹ INR</option>
                        <option value="USD">$ USD</option>
                        <option value="EUR">€ EUR</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;