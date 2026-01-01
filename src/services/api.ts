import axios from 'axios';

import { useAuthStore } from '@/store/useAuthStore';

const selectAPI = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true') {
    return process.env.NEXT_PUBLIC_PROD_URL_API;
  }

  if (process.env.NEXT_PUBLIC_DOCKER_UP === 'true') {
    return process.env.NEXT_PUBLIC_API_URL_DOCKER;
  }

  return process.env.NEXT_PUBLIC_API_URL;
};

export const api = axios.create({
  baseURL: selectAPI(),
  // TODO: Separar em dois axios para a API privada onde é enviada a credencial
  // withCredentials: true,
});

const selectAuthAPI = () => {
  if (process.env.NEXT_PUBLIC_IS_PRODUCTION_TORII === 'true') {
    return process.env.NEXT_PUBLIC_PROD_URL_API_TORII;
  }

  if (process.env.NEXT_PUBLIC_TORII_DOCKER_UP === 'true') {
    return process.env.NEXT_PUBLIC_TORII_URL_DOCKER;
  }

  return process.env.NEXT_PUBLIC_TORII_URL;
};

export const auth = axios.create({
  baseURL: selectAuthAPI(),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await auth.post('refresh-token');

        useAuthStore.getState().setAccessToken(data.accessToken);

        failedQueue.forEach((p) => p.resolve(data.accessToken));
        failedQueue = [];

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().setAccessToken(null);
        failedQueue.forEach((p) => p.reject(err));
        failedQueue = [];
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
