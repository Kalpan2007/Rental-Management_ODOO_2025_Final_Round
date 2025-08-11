import api from './axios';

export const getBookings = async (params) => {
  try {
    const response = await api.get('/bookings', { params });
    return {
      data: response.data?.bookings || response.data || [],
      success: true
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      data: [],
      success: false,
      error: error.message || 'Failed to fetch bookings'
    };
  }
};

export const getAdminBookings = async (params) => {
  try {
    const response = await api.get('/bookings/admin', { params });
    return {
      data: response.data?.bookings || response.data || [],
      success: true
    };
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    return {
      data: [],
      success: false,
      error: error.message || 'Failed to fetch admin bookings'
    };
  }
};

export const getUserBookings = async (userId) => {
  try {
    const params = userId ? { userId } : {};
    const response = await api.get('/bookings/user', { params });
    return {
      data: response.data?.bookings || response.data || [],
      success: true
    };
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return {
      data: [],
      success: false,
      error: error.message || 'Failed to fetch user bookings'
    };
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return {
      data: response.data?.booking || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error fetching booking details:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to fetch booking details'
    };
  }
};

export const getBooking = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return {
      data: response.data?.booking || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to fetch booking'
    };
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return {
      data: response.data?.booking || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to create booking'
    };
  }
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}/status`, { status });
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};