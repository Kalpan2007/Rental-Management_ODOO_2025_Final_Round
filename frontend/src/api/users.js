import api from './axios';

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/users/change-password', passwordData);
  return response.data;
};

// Admin functions
export const getAllUsers = async (params) => {
  const response = await api.get('/users', { params });
  return response.data;
};

export const getUsers = async (params) => {
  const response = await api.get('/users', { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUserStatus = async (id, status) => {
  const response = await api.put(`/users/${id}/status`, { status });
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.put(`/users/${id}/role`, { role });
  return response.data;
};