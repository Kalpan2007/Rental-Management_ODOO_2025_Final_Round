import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login, signup, verifyOtp, logout } from '../api/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const { token, user: userData } = await login(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    try {
      setLoading(true);
      const response = await signup(userData);
      setError(null);
      toast.success('Account created! Please check your email for OTP verification.');
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otpData) => {
    try {
      setLoading(true);
      const { token, user: userData } = await verifyOtp(otpData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setError(null);
      toast.success('Account verified successfully!');
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = async (userData) => {
    try {
      // This would typically make an API call to update user data
      setUser(prev => ({ ...prev, ...userData }));
      localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};