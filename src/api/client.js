import axios from 'axios';

// API client configuration:
// Always use same-origin relative path ('') by default.
// - On Vercel: calls /api/... on current domain (e.g. https://shree-kamakshi-jewellery.vercel.app/api/...)
// - In Local Dev: calls /api/... which Vite dev server proxies to http://localhost:5000
// - External Backend: only used if VITE_API_BASE_URL is set to a non-localhost remote URL.
const rawBaseURL = (import.meta.env.VITE_API_BASE_URL || '').trim();
const baseURL = (rawBaseURL && !rawBaseURL.includes('localhost')) ? rawBaseURL : '';

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
