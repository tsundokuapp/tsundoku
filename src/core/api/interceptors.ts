import type { AxiosInstance } from 'axios';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { api, apiPrivate } from '.';
import { refreshAccessToken } from './refreshToken';

export const setupInterceptors = () => {
  const attachAuthInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.use((config) => {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await refreshAccessToken();

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );
  };

  attachAuthInterceptors(api);
  attachAuthInterceptors(apiPrivate);
};
