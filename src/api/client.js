import axios from 'axios';

// When running on Vercel or same-origin domain, relative URL ('') automatically targets the current domain:
// e.g. https://shree-kamakshi-jewellery.vercel.app/api/...
// If a custom external API URL is explicitly configured in VITE_API_BASE_URL, use that instead.
const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
