import api from './axios';

export const getProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductAvailability = async (id, startDate, endDate) => {
  const response = await api.get(`/products/availability/${id}`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const checkProductAvailability = async (id, dates) => {
  const response = await api.get(`/products/availability/${id}`, {
    params: dates,
  });
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};