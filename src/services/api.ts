import axios from 'axios';

const API_BASE_URL = 'https://akayai.vercel.app/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/signin', { email, password });
    return response.data;
  },
  
  signup: async (email: string, password: string, name: string) => {
    const response = await api.post('/signup', { email, password, name });
    return response.data;
  },
  
  requestPasswordReset: async (email: string) => {
    const response = await api.post('/request-reset-password', { email });
    return response.data;
  },
};