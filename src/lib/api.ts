import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

// API base URL - Update this if backend is running on different port
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle specific status codes
    switch (status) {
      case 401:
        // Clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        window.location.href = '/login';
        break;
      case 403:
        toast.error(data?.message || 'You do not have permission to perform this action.');
        break;
      case 404:
        toast.error(data?.message || 'Resource not found.');
        break;
      case 400:
        toast.error(data?.message || 'Invalid request.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(data?.message || 'An error occurred.');
    }

    return Promise.reject(error);
  }
);

// Error handling helper
export const handleApiError = (error: any, customMessage?: string) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || customMessage || 'An error occurred';
    toast.error(message);
  } else {
    toast.error(customMessage || 'An unexpected error occurred');
  }
  console.error('API Error:', error);
};

// Authentication API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  getMyProducts: () => api.get('/products/user/my-products'),
};

// Jobs API
export const jobsAPI = {
  getAll: (params?: any) => api.get('/jobs', { params }),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`),
  apply: (jobId: string, data: any) => api.post(`/jobs/${jobId}/apply`, data),
  getApplications: (jobId: string) => api.get(`/jobs/${jobId}/applications`),
  getMyApplications: () => api.get('/jobs/applications/my-applications'),
  getMyJobs: () => api.get('/jobs/user/my-jobs'),
};

// Investor Requests API
export const investorRequestsAPI = {
  getAll: (params?: any) => api.get('/investor-requests', { params }),
  getById: (id: string) => api.get(`/investor-requests/${id}`),
  create: (data: any) => api.post('/investor-requests', data),
  update: (id: string, data: any) => api.put(`/investor-requests/${id}`, data),
  delete: (id: string) => api.delete(`/investor-requests/${id}`),
  toggleBookmark: (id: string) => api.post(`/investor-requests/${id}/bookmark`),
  getBookmarked: () => api.get('/investor-requests/user/bookmarks'),
};

// Community Stories API
export const communityStoriesAPI = {
  getAll: (params?: any) => api.get('/community-stories', { params }),
  getById: (id: string) => api.get(`/community-stories/${id}`),
  create: (data: any) => api.post('/community-stories', data),
  update: (id: string, data: any) => api.put(`/community-stories/${id}`, data),
  delete: (id: string) => api.delete(`/community-stories/${id}`),
  moderate: (id: string, data: any) => api.put(`/community-stories/${id}/moderate`, data),
};

// Story Packs API
export const storyPacksAPI = {
  getAll: (params?: any) => api.get('/stories/packs', { params }),
  getById: (id: string) => api.get(`/stories/packs/${id}`),
  getStory: (id: string) => api.get(`/stories/${id}`),
  completeStory: (id: string, data: any) => api.post(`/stories/${id}/complete`, data),
};

// Messages API
export const messagesAPI = {
  getThreads: () => api.get('/messages/threads'),
  createThread: (data: any) => api.post('/messages/threads', data),
  getThreadMessages: (threadId: string, params?: any) => 
    api.get(`/messages/threads/${threadId}`, { params }),
  sendMessage: (data: any) => api.post('/messages', data),
  markAsRead: (threadId: string) => api.put(`/messages/threads/${threadId}/read`),
};

// Progress API
export const progressAPI = {
  getProgress: () => api.get('/progress'),
  awardBadge: (badgeId: string) => api.post(`/progress/badges/${badgeId}`),
  getAllBadges: () => api.get('/progress/badges'),
  getLeaderboard: (params?: any) => api.get('/progress/leaderboard', { params }),
};

// Helper functions
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export default api;
