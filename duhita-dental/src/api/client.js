import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const client = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token to requests if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('duhita_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper for resolving file URLs (e.g. /uploads/image.jpg -> http://localhost:5001/uploads/image.jpg)
export const resolveFileUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const host = API_BASE_URL.replace('/api', '');
  return `${host}${url.startsWith('/') ? url : '/' + url}`;
};

export default client;
