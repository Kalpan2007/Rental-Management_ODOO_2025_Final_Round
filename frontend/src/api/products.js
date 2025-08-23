import api from './axios';

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/products', { params });
    return {
      data: response.data?.data || response.data || [],
      success: true,
      pagination: response.data?.pagination
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      data: [],
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch products'
    };
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return {
      data: {},
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to fetch product details'
    };
  }
};

export const getProduct = async (id) => {
  return getProductById(id);
};

export const getProductAvailability = async (id, startDate, endDate) => {
  try {
    const response = await api.get(`/products/availability/${id}`, {
      params: { startDate, endDate },
    });
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      data: {},
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to check availability'
    };
  }
};

export const checkProductAvailability = async (id, dates) => {
  return getProductAvailability(id, dates.startDate, dates.endDate);
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return {
      data: response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const moderateProduct = async (id, { status, reason }) => {
  try {
    const response = await api.post(`/products/${id}/moderate`, { status, reason });
    return {
      data: response.data?.data || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error moderating product:', error);
    throw error;
  }
};