import apiClient from './client';
import fallbackData from '../data/fallback.json';

/**
 * Fetch shop settings, business hours, and about details
 * Falls back to fallback.json if backend API is unavailable
 */
export async function fetchSettings() {
  try {
    const response = await apiClient.get('/api/settings');
    return { data: response.data, isFallback: false };
  } catch (error) {
    console.warn('Backend /api/settings unavailable, loading fallback settings:', error.message);
    return { data: fallbackData.settings, isFallback: true };
  }
}

export async function updateSettings(settingsData) {
  const response = await apiClient.put('/api/settings', settingsData);
  return response.data;
}
