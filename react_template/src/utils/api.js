// API utility functions for making HTTP requests
import { useAuth } from '../hooks/useAuth';

// Base API URL - in a real app, this would be your backend server
const API_BASE_URL = 'https://api.example.com';

// API service object with methods for common HTTP operations
export const apiService = {
  // Set the auth token for all requests
  setAuthToken: (token) => {
    apiService.token = token;
  },

  // Generic fetch wrapper with auth and error handling
  fetchWithAuth: async (endpoint, options = {}) => {
    // Add token to headers if available
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (apiService.token) {
      headers['Authorization'] = `Bearer ${apiService.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    // Return response data
    return response.json();
  },

  // HTTP GET request
  get: async (endpoint) => {
    return apiService.fetchWithAuth(endpoint, {
      method: 'GET',
    });
  },

  // HTTP POST request
  post: async (endpoint, data) => {
    return apiService.fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // HTTP PUT request
  put: async (endpoint, data) => {
    return apiService.fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // HTTP PATCH request
  patch: async (endpoint, data) => {
    return apiService.fetchWithAuth(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // HTTP DELETE request
  delete: async (endpoint) => {
    return apiService.fetchWithAuth(endpoint, {
      method: 'DELETE',
    });
  },

  // Auth endpoints
  auth: {
    login: async (credentials) => {
      return apiService.post('/auth/login', credentials);
    },
    signup: async (userData) => {
      return apiService.post('/auth/signup', userData);
    },
    logout: async () => {
      return apiService.post('/auth/logout', {});
    },
  },

  // MCQ endpoints
  mcq: {
    getAll: async () => {
      return apiService.get('/mcqs');
    },
    getById: async (id) => {
      return apiService.get(`/mcqs/${id}`);
    },
    create: async (mcqData) => {
      return apiService.post('/mcqs', mcqData);
    },
    update: async (id, mcqData) => {
      return apiService.put(`/mcqs/${id}`, mcqData);
    },
    delete: async (id) => {
      return apiService.delete(`/mcqs/${id}`);
    },
    togglePublish: async (id, isPublished) => {
      return apiService.patch(`/mcqs/${id}/publish`, { isPublished });
    },
    getPublished: async () => {
      return apiService.get('/mcqs/published');
    },
    submitAnswer: async (mcqId, answer) => {
      return apiService.post(`/mcqs/${mcqId}/answers`, { answer });
    },
  },
};