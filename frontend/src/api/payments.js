import api from './axios';

export const createPaymentIntent = async (bookingId) => {
  const response = await api.post('/payments/create-intent', { bookingId });
  return response.data;
};

export const createPayment = async ({ bookingId }) => {
  const response = await api.post('/payments/create', { bookingId });
  return response.data;
};

export const confirmPayment = async (paymentIntentId, bookingId) => {
  const response = await api.post('/payments/confirm', {
    paymentIntentId,
    bookingId,
  });
  return response.data;
};

export const getPaymentsByBookingId = async (bookingId) => {
  const response = await api.get(`/payments/booking/${bookingId}`);
  return response.data;
};