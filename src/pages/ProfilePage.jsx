import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CameraIcon,
  KeyIcon,
  SaveIcon
} from '@heroicons/react/outline';
import Button from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', name: 'Profile Information', icon: UserIcon },
    { id: 'password', name: 'Change Password', icon: KeyIcon }
  ];

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl ring-4 ring-violet-500/30 object-cover"
          />
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors">
            <CameraIcon className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
          <p className="text-slate-400">{user?.email}</p>
          <span className="inline-block px-2 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full mt-1 capitalize">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Card>
        <div className="border-b border-slate-700">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-violet-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={profileData.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  icon={<UserIcon className="w-5 h-5" />}
                  required
                />

                <Input
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  icon={<MailIcon className="w-5 h-5" />}
                  required
                />

                <Input
                  type="tel"
                  label="Phone Number"
                  placeholder="+91 12345 67890"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  icon={<PhoneIcon className="w-5 h-5" />}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={loading}
                  icon={<SaveIcon className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="max-w-md space-y-4">
                <Input
                  type="password"
                  label="Current Password"
                  placeholder="Enter your current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  icon={<KeyIcon className="w-5 h-5" />}
                  required
                />

                <Input
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  icon={<KeyIcon className="w-5 h-5" />}
                  required
                />

                <Input
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  icon={<KeyIcon className="w-5 h-5" />}
                  required
                />
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <h3 className="text-yellow-300 font-medium mb-2">Password Requirements</h3>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• At least 6 characters long</li>
                  <li>• Include both letters and numbers</li>
                  <li>• Avoid using common passwords</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={loading}
                  icon={<SaveIcon className="w-4 h-4" />}
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;