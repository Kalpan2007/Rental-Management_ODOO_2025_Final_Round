import api from './axios';

export const getBookings = async (params = {}) => {
  try {
    const response = await api.get('/bookings', { params });
    return {
      data: response.data?.data || response.data || [],
      success: true,
      pagination: response.data?.pagination
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      data: [],
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch bookings'
    };
  }
};

export const getAdminBookings = async (params = {}) => {
  try {
    const response = await api.get('/bookings', { params });
    return {
      data: response.data?.data || response.data || [],
      success: true,
      pagination: response.data?.pagination
    };
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return {
      data: [],
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch admin bookings'
    };
  }
};

export const getUserBookings = async (userId) => {
  try {
    const params = userId ? { userId } : {};
    const response = await api.get('/bookings', { params });
    return {
      data: response.data?.data || response.data || [],
      success: true
    };
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return {
      data: [],
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch user bookings'
    };
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return {
      data: {},
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch booking details'
    };
  }
};

export const getBooking = async (id) => {
  return getBookingById(id);
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      data: {},
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to create booking'
    };
  }
};

export const updateBookingStatus = async (id, statusData) => {
  try {
    const response = await api.put(`/bookings/${id}/status`, statusData);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/${id}/cancel`);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};