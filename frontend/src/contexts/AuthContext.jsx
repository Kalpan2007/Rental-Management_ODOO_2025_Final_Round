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
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        // Clear localStorage if either token or user is missing
        if (!token || !storedUser || storedUser === 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setLoading(false);
          return;
        }
        
        // Try to parse stored user data
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          } else {
            // Invalid user data
            localStorage.removeItem('user');
          }
        } catch (parseError) {
          console.error('Failed to parse stored user data:', parseError);
          localStorage.removeItem('user');
        }
        
        // Try to get fresh data from server
        try {
          const userData = await getCurrentUser();
          if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          // Only clear auth on 401 Unauthorized
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          }
          // For other errors, keep using the stored user data
        }
      } catch (error) {
        console.error('Error in authentication initialization:', error);
        // Reset auth state on critical errors
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setLoading(true);
      const { token, user } = await login(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (userData) => {
    try {
      setLoading(true);
      const result = await signup(userData);
      // Signup only sends OTP, doesn't return token and user yet
      toast.success(result.message || 'OTP sent to your email');
      return { email: userData.email, message: result.message };
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      toast.error(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const { token, user } = await verifyOtp(email, otp);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setError(null);
      toast.success('Account verified successfully');
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
      toast.error(err.response?.data?.message || 'OTP verification failed');
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

  const value = {
    user,
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};