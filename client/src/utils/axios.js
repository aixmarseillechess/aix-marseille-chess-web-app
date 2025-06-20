import axios from 'axios';
import {configDotenv} from "dotenv";
configDotenv();

// Get the API URL from environment variables or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received from:', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance; 