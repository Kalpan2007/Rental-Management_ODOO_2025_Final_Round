import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle token expiration
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Only redirect to login if we're not already on the login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;