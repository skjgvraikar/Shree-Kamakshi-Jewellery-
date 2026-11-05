import apiClient from './client';
import fallbackData from '../data/fallback.json';

/**
 * Fetch live gold and silver rates
 * Falls back to fallback.json if backend API is unavailable
 */
export async function fetchRates() {
  try {
    const response = await apiClient.get('/api/rates');
    return { data: response.data, isFallback: false };
  } catch (error) {
    console.warn('Backend /api/rates unavailable, loading fallback rates:', error.message);
    return { data: fallbackData.rates, isFallback: true };
  }
}

export async function updateRates(ratesData) {
  const response = await apiClient.put('/api/rates', ratesData);
  return response.data;
}
