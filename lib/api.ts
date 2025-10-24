import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Interceptor JWT
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// AUTH (Puerto 3000)
// ========================================
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
  getUsers: () => 
    api.get('/admin/users'),
};

// ========================================
// CONCERTS (Puerto 3001)
// ========================================
export const concertAPI = {
  getAll: () => 
    api.get('http://localhost:3001/concert/concerts'),
  getById: (id: any) => 
    api.get(`http://localhost:3001/concert/concert/${id}`),
  create: (data: any) => 
    api.post('http://localhost:3001/concert/admin/concert', data),
  update: (id: any, data: any) => 
    api.put(`http://localhost:3001/concert/admin/concert/${id}`, data),
  delete: (id: any) => 
    api.delete(`http://localhost:3001/concert/admin/concert/${id}`),
};

// ========================================
// VENUES (Puerto 3002)
// ========================================
export const venueAPI = {
  getAll: () => 
    api.get('http://localhost:3002/venue/venues'),
  getById: (id: any) => 
    api.get(`http://localhost:3002/venue/${id}`),
  getSections: (id: any) => 
    api.get(`http://localhost:3002/venue/${id}/sections`),
  create: (data: any) => 
    api.post('http://localhost:3002/admin/venue', data),
  createSection: (venueId: any, data: any) => 
    api.post(`http://localhost:3002/admin/venue/${venueId}/section`, data),
};

// ========================================
// TICKETS (Puerto 3003)
// ========================================
export const ticketAPI = {
  getTypes: (concertId: any) => 
    api.get(`http://localhost:3003/concert/${concertId}/ticket-types`),
  createType: (concertId: any, data: any) => 
    api.post(`http://localhost:3003/admin/concert/${concertId}/ticket-type`, data),
  reserve: (data: any) => 
    api.post('http://localhost:3003/ticket/reserve', data),
  getReservations: () => 
    api.post('http://localhost:3003/ticket/reservations'),
  releaseExpired: () => 
    api.post('http://localhost:3003/admin/tickets/release-expired'),
};

// ========================================
// ORDERS (Puerto 3004)
// ========================================
export const orderAPI = {
  create: (data: any) => 
    api.post('http://localhost:3004/order', data),
  getById: (id: any) => 
    api.get(`http://localhost:3004/order/${id}`),
  confirm: (orderId: any) => 
    api.post(`http://localhost:3004/order/${orderId}/confirm`),
  getUserOrders: (userId: any) => 
    api.get(`http://localhost:3004/order/orders/user/${userId}`),
  getAllOrders: () => 
    api.get('http://localhost:3004/order/admin/orders'),
  getSalesByConcert: (concertId: any) => 
    api.get(`http://localhost:3004/order/admin/concert/${concertId}/sales`),
};

// ========================================
// NOTIFICATIONS (Puerto 3005)
// ========================================
export const notificationAPI = {
  sendTickets: (orderId: any) => 
    api.post(`http://localhost:3005/notification/order/${orderId}/send-tickets`),
  sendConfirmation: (orderId: any) => 
    api.post(`http://localhost:3005/notification/order/${orderId}/send-confirmation`),
  getAll: () => 
    api.get('http://localhost:3005/notification/notifications'),
};

export default api;