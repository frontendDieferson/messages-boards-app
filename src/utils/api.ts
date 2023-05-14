import { Notice, NoticeData } from '@/types/types';


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
  } catch (error: unknown) {
    if (error instanceof Error){
      throw new Error('Erro ao criar o Recado:' + error.message)
    } else {
      throw new Error('Erro desconhecido ao criar o recado')
    }
  } 
};

export default async function createNotice(noticeData: NoticeData): Promise<any> {
  try {
    // Fazer uma chamada POST para a rota de criação de recados na sua API
    const response = await axios.post('/api/notices', noticeData);
    return response.data;
  } catch (error) {
    // Lidar com erros de criação de recado, como falha na conexão com a API
    throw new Error('Erro ao criar o recado.');
  }
}




