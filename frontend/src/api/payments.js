import api from './axios';

export const createPayment = async (data) => {
  try {
    const response = await api.post('/payments/create', data);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error creating payment:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create payment'
    };
  }
};

export const verifyPayment = async (sessionId) => {
  try {
    const response = await api.post('/payments/verify', { sessionId });
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to verify payment'
    };
  }
};

export const getPaymentsByBookingId = async (bookingId) => {
  try {
    const response = await api.get(`/payments/history/${bookingId}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch payment history'
    };
  }
};