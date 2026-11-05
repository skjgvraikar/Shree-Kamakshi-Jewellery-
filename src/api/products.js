import apiClient from './client';
import fallbackData from '../data/fallback.json';

/**
 * Fetch product catalog
 * Falls back to fallback.json if backend API is unavailable
 */
export async function fetchProducts() {
  try {
    const response = await apiClient.get('/api/products');
    return { data: response.data, isFallback: false };
  } catch (error) {
    console.warn('Backend /api/products unavailable, loading fallback products:', error.message);
    return { data: fallbackData.products, isFallback: true };
  }
}

export async function createProduct(productData) {
  const response = await apiClient.post('/api/products', productData);
  return response.data;
}

export async function updateProduct(id, productData) {
  const response = await apiClient.put(`/api/products/${id}`, productData);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await apiClient.delete(`/api/products/${id}`);
  return response.data;
}
