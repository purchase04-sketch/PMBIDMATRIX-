import axios from 'axios';

const BASE_URL = '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pmbidmatrix_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
};

// Suppliers
export const supplierAPI = {
  getAll: (params?: any) => api.get('/supplier', { params }),
  getById: (id: string) => api.get(`/supplier/${id}`),
  create: (data: any) => api.post('/supplier', data),
  update: (id: string, data: any) => api.put(`/supplier/${id}`, data),
};

// RFQ
export const rfqAPI = {
  getAll: (params?: any) => api.get('/rfq', { params }),
  getById: (id: string) => api.get(`/rfq/${id}`),
  create: (data: any) => api.post('/rfq', data),
  publish: (id: string) => api.put(`/rfq/${id}/publish`),
};

// Auctions
export const auctionAPI = {
  getAll: (params?: any) => api.get('/auction', { params }),
  getById: (id: string) => api.get(`/auction/${id}`),
  create: (data: any) => api.post('/auction', data),
  start: (id: string) => api.put(`/auction/${id}/start`),
};

// Bids
export const bidAPI = {
  submit: (data: any) => api.post('/bid', data),
  getForAuction: (auctionId: string) => api.get(`/bid/auction/${auctionId}`),
  getHistory: (supplierId: string) => api.get(`/bid/history/${supplierId}`),
};

// Purchase Orders
export const poAPI = {
  getAll: (params?: any) => api.get('/po', { params }),
  getById: (id: string) => api.get(`/po/${id}`),
  create: (data: any) => api.post('/po', data),
  approve: (id: string) => api.put(`/po/${id}/approve`),
};

// Commodity
export const commodityAPI = {
  getAll: () => api.get('/commodity'),
  getById: (id: string) => api.get(`/commodity/${id}`),
  getHedging: (id: string) => api.get(`/commodity/${id}/hedging`),
};

// AI Copilot
export const copilotAPI = {
  query: (query: string) => api.post('/copilot/query', { query }),
  getSuggestions: () => api.get('/copilot/suggestions'),
};

// Digital Twin
export const digitalTwinAPI = {
  getScenarios: () => api.get('/digital-twin/scenarios'),
  simulate: (data: any) => api.post('/digital-twin/simulate', data),
};

// Dashboard
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getSavings: () => api.get('/dashboard/savings'),
  getEfficiency: () => api.get('/dashboard/efficiency'),
};

// Notifications
export const notificationAPI = {
  getAll: () => api.get('/notification'),
  markRead: (id: string) => api.put(`/notification/${id}/read`),
  getUnreadCount: () => api.get('/notification/unread-count'),
};

export default api;
