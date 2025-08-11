import api from './axios';

export const getBookings = async (params) => {
  const response = await api.get('/bookings', { params });
  return response.data;
};

export const getAdminBookings = async (params) => {
  const response = await api.get('/bookings/admin', { params });
  return response.data;
};

export const getUserBookings = async (userId) => {
  const params = userId ? { userId } : {};
  const response = await api.get('/bookings/user', { params });
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}/status`, { status });
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};