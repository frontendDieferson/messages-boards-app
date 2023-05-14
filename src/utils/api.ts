import { Notice } from '@/types/types';


import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getNotices = async (): Promise<Notice[]> => {
    try {
      const response = await apiRequest<Notice[]>('/notices', 'GET');
      return response;
    } catch (error) {
      throw new Error('Falha ao obter os recados');
    }
  };

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const apiRequest = async <T>(
  endpoint: string,
  method: AxiosRequestConfig['method'],
  data?: AxiosRequestConfig['data']
): Promise<T> => {
  try {
    const response = await api.request<T>({
      url: endpoint,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
