import api from './axios';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};