import api from './axios';

export const getReports = async (params) => {
  const response = await api.get('/reports', { params });
  return response.data;
};

export const getRevenueReport = async (params) => {
  const response = await api.get('/reports/revenue', { params });
  return response.data;
};

export const getMostRentedProducts = async () => {
  const response = await api.get('/reports/most-rented');
  return response.data;
};

export const getOverdueReturns = async () => {
  const response = await api.get('/reports/overdue');
  return response.data;
};

export const exportReport = async (reportType, params) => {
  const response = await api.get(`/reports/export?type=${reportType}`, {
    params,
    responseType: 'blob',
  });
  return response.data;
};

export const downloadReport = async ({ format, ...params }) => {
  const response = await api.get(`/reports/download?format=${format}`, {
    params,
    responseType: 'blob',
  });
  return response.data;
};