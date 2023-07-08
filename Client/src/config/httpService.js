import { userAPI } from 'Constants/API';
import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

// Create an instance of axios with default configurations
const axiosInstance = axios.create({
  baseURL: userAPI,
});

// Get the token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Add an interceptor to set the token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle API requests

const httpService = {
  get: (url) => {
    return axiosInstance.get(url);
  },
  
  post: (url, data, includeToken = true) => {
    if (!includeToken) {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
    return axiosInstance.post(url, data);
  },
  
  put: (url, data) => {
    return axiosInstance.put(url, data);
  },
  
  delete: (url) => {
    return axiosInstance.delete(url);
  },
};

export { httpService };
