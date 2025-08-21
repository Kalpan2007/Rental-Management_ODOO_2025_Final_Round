import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-toastify';
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const AdminSettings = () => {
  const { darkMode } = useTheme();
  const [settings, setSettings] = useState({
    siteName: 'RentalHub',
    siteDescription: 'Premium rental marketplace',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    registrationEnabled: true,
    commissionRate: 10,
    minRentalDuration: 1,
    maxRentalDuration: 365
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    // Mock save functionality
    toast.success('Settings saved successfully');
  };

  const settingSections = [
    {
      title: 'General Settings',
      icon: CogIcon,
      settings: [
        {
          key: 'siteName',
          label: 'Site Name',
          type: 'text',
          description: 'The name of your rental platform'
        },
        {
          key: 'siteDescription',
          label: 'Site Description',
          type: 'text',
          description: 'Brief description of your platform'
        },
        {
          key: 'currency',
          label: 'Default Currency',
          type: 'select',
          options: [
            { value: 'INR', label: '₹ Indian Rupee' },
            { value: 'USD', label: '$ US Dollar' },
            { value: 'EUR', label: '€ Euro' }
          ],
          description: 'Default currency for pricing'
        },
        {
          key: 'timezone',
          label: 'Timezone',
          type: 'select',
          options: [
            { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
            { value: 'America/New_York', label: 'America/New_York (EST)' },
            { value: 'Europe/London', label: 'Europe/London (GMT)' }
          ],
          description: 'Default timezone for the platform'
        }
      ]
    },
    {
      title: 'Business Settings',
      icon: CurrencyRupeeIcon,
      settings: [
        {
          key: 'commissionRate',
          label: 'Commission Rate (%)',
          type: 'number',
          min: 0,
          max: 50,
          description: 'Platform commission on each booking'
        },
        {
          key: 'minRentalDuration',
          label: 'Minimum Rental Duration (days)',
          type: 'number',
          min: 1,
          max: 30,
          description: 'Minimum rental period allowed'
        },
        {
          key: 'maxRentalDuration',
          label: 'Maximum Rental Duration (days)',
          type: 'number',
          min: 1,
          max: 365,
          description: 'Maximum rental period allowed'
        }
      ]
    },
    {
      title: 'Notification Settings',
      icon: BellIcon,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          type: 'toggle',
          description: 'Send email notifications to users'
        },
        {
          key: 'smsNotifications',
          label: 'SMS Notifications',
          type: 'toggle',
          description: 'Send SMS notifications to users'
        }
      ]
    },
    {
      title: 'Security Settings',
      icon: ShieldCheckIcon,
      settings: [
        {
          key: 'registrationEnabled',
          label: 'User Registration',
          type: 'toggle',
          description: 'Allow new user registrations'
        },
        {
          key: 'maintenanceMode',
          label: 'Maintenance Mode',
          type: 'toggle',
          description: 'Enable maintenance mode for the platform'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center">
            <CogIcon className={`h-8 w-8 mr-3 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <div>
              <h1 className={`text-3xl font-bold ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                Admin Settings
              </h1>
              <p className={`${
                darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
              }`}>
                Configure platform settings and preferences
              </p>
            </div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              className={`p-6 rounded-xl backdrop-blur-sm border ${
                darkMode 
                  ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                  : 'bg-white/80 border-[#d4a276]/30'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <section.icon className={`h-6 w-6 mr-3 ${
                  darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                }`} />
                <h2 className={`text-xl font-bold ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {section.title}
                </h2>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting, settingIndex) => (
                  <div key={settingIndex} className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className={`block font-medium mb-1 ${
                        darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                      }`}>
                        {setting.label}
                      </label>
                      <p className={`text-sm ${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="ml-6">
                      {setting.type === 'text' && (
                        <input
                          type="text"
                          value={settings[setting.key]}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className={`px-4 py-2 rounded-xl border-2 ${
                            darkMode
                              ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                              : 'border-[#d4a276] bg-white text-[#583101]'
                          }`}
                        />
                      )}
                      
                      {setting.type === 'number' && (
                        <input
                          type="number"
                          min={setting.min}
                          max={setting.max}
                          value={settings[setting.key]}
                          onChange={(e) => handleSettingChange(setting.key, parseInt(e.target.value))}
                          className={`px-4 py-2 rounded-xl border-2 w-24 ${
                            darkMode
                              ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                              : 'border-[#d4a276] bg-white text-[#583101]'
                          }`}
                        />
                      )}
                      
                      {setting.type === 'select' && (
                        <select
                          value={settings[setting.key]}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className={`px-4 py-2 rounded-xl border-2 ${
                            darkMode
                              ? 'border-[#8b5e34] bg-[#6f4518]/30 text-[#ffedd8]'
                              : 'border-[#d4a276] bg-white text-[#583101]'
                          }`}
                        >
                          {setting.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {setting.type === 'toggle' && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[setting.key]}
                            onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full peer transition-all ${
                            settings[setting.key]
                              ? darkMode ? 'bg-[#bc8a5f]' : 'bg-[#8b5e34]'
                              : darkMode ? 'bg-[#8b5e34]' : 'bg-gray-300'
                          } peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`} />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={saveSettings}
            className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
              darkMode
                ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8] shadow-lg hover:shadow-xl'
                : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8] shadow-lg hover:shadow-xl'
            }`}
          >
            Save All Settings
          </button>
        </motion.div>
       </div>
     </div>
   );
 };
 
-export default ProductDetail;