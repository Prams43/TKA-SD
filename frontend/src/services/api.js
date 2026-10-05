import axios from 'axios';

// Gunakan URL dari .env frontend jika ada, atau fallback ke '/api' (lewat proxy Vite) / 'http://localhost:5000/api'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor untuk menyertakan token JWT pada setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error response secara global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika token tidak valid / kedaluwarsa (401), hapus dari localStorage
    if (error.response && error.response.status === 401) {
      // Hanya hapus jika ada token tersimpan sebelumnya (menghindari redirect loop saat login gagal)
      const existingToken = localStorage.getItem('token');
      if (existingToken && !error.config.url.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.hash = '#/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
