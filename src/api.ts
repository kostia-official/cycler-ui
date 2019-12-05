import axios from 'axios';
import { config } from './config';

export const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 5000
});

api.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);
