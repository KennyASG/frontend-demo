// lib/api.ts
import axios from 'axios';

// URL de tu API backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://10.241.222.216:31000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT a todas las peticiones
api.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);