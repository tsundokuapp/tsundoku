import type { AxiosInstance } from 'axios';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { api, apiPrivate, auth, authPrivate } from '.';
import { isRefreshTokenRequest, refreshAccessToken } from './refreshToken';

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

        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          !isRefreshTokenRequest(originalRequest.url)
        ) {
          originalRequest._retry = true;

          // refreshAccessToken() usa o cliente `authRefresh`, que não recebe
          // estes interceptors: um 401 da renovação rejeita aqui e libera a
          // requisição original, em vez de disparar outra renovação.
          const newToken = await refreshAccessToken();

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        }

        return Promise.reject(error);
      },
    );
  };

  attachAuthInterceptors(api);
  attachAuthInterceptors(apiPrivate);
  attachAuthInterceptors(auth);
  attachAuthInterceptors(authPrivate);
};
