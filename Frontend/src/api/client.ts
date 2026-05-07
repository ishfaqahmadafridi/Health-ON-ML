import axios from 'axios';
import type { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Global Axios Instance
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Useful for adding auth tokens, custom headers, or logging
 */
apiClient.interceptors.request.use(
  (config) => {
    // console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Example: Add Auth Token if available
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Useful for unified error handling and data extraction
 */
apiClient.interceptors.response.use(
  (response) => {
    // console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    // Global Error Handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      
      const message = (error.response.data as any)?.message || error.message;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);

export default apiClient;
