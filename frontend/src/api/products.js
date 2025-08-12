import api from './axios';

export const getProducts = async (params) => {
  try {
    const response = await api.get('/products', { params });
    // Handle both old and new response formats
    if (response.data?.success !== undefined) {
      // New format with success field
      return {
        data: response.data?.data || [],
        success: response.data?.success,
        error: response.data?.error
      };
    } else {
      // Old format for backward compatibility
      return {
        data: response.data?.products || response.data || [],
        success: true
      };
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      data: [],
      success: false,
      error: error.message || 'Failed to fetch products'
    };
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    // Handle both old and new response formats
    if (response.data?.success !== undefined) {
      // New format with success field
      return {
        data: response.data?.data || {},
        success: response.data?.success,
        error: response.data?.error
      };
    } else {
      // Old format for backward compatibility
      return {
        data: response.data?.product || response.data || {},
        success: true
      };
    }
  } catch (error) {
    console.error('Error fetching product details:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to fetch product details'
    };
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return {
      data: response.data?.product || response.data || {},
      success: true
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to fetch product'
    };
  }
};

export const getProductAvailability = async (id, startDate, endDate) => {
  const response = await api.get(`/products/availability/${id}`, {
    params: { startDate, endDate },
  });
  return response.data;
};

export const checkProductAvailability = async (id, dates) => {
  try {
    const response = await api.get(`/products/availability/${id}`, {
      params: dates,
    });
    return {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.error('Error checking product availability:', error);
    return {
      data: {},
      success: false,
      error: error.message || 'Failed to check product availability'
    };
  }
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

export const moderateProduct = async (id, { status, reason }) => {
  const response = await api.post(`/products/${id}/moderate`, { status, reason });
  return response.data;
};