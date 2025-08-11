import React, { useState } from 'react';
import { FaSave, FaBell, FaLock, FaPalette, FaCog } from 'react-icons/fa';
import Button from '../components/Button';
import Input from '../components/Input';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Gaming Gear Rental',
    supportEmail: 'support@example.com',
    maxRentalDays: '30',
    defaultCurrency: 'USD',
    // Notification settings
    emailNotifications: true,
    bookingAlerts: true,
    marketingEmails: false,
    // Security settings
    twoFactorAuth: false,
    passwordExpiry: '90',
    sessionTimeout: '30',
    // Theme settings
    primaryColor: '#9333ea',
    darkMode: true,
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaLock },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">System Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-lg p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800 rounded-lg p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <Input
                  label="Site Name"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                />
                <Input
                  label="Support Email"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                />
                <Input
                  label="Maximum Rental Days"
                  type="number"
                  value={settings.maxRentalDays}
                  onChange={(e) => handleChange('maxRentalDays', e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Default Currency</label>
                  <select
                    value={settings.defaultCurrency}
                    onChange={(e) => handleChange('defaultCurrency', e.target.value)}
                    className="w-full bg-slate-700 text-white rounded-lg px-3 py-2"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications' },
                  { key: 'bookingAlerts', label: 'Booking Alerts' },
                  { key: 'marketingEmails', label: 'Marketing Emails' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-white">{item.label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[item.key]}
                        onChange={(e) => handleChange(item.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white">Two-Factor Authentication</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <Input
                  label="Password Expiry (days)"
                  type="number"
                  value={settings.passwordExpiry}
                  onChange={(e) => handleChange('passwordExpiry', e.target.value)}
                />
                <Input
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                />
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => handleChange('darkMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <FaSave /> Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;