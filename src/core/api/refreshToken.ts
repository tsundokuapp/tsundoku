import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { authRefresh } from '.';

export const REFRESH_TOKEN_PATH = 'refresh-token';

export interface IRefreshSessionData {
  accessToken: string;
  usuario?: string;
  tsunId?: string;
}

let refreshPromise: Promise<IRefreshSessionData> | null = null;

/** Indica se a URL de uma requisição aponta para a renovação de sessão. */
export const isRefreshTokenRequest = (url?: string) => {
  if (!url) return false;
  const path = url.split('?')[0].replace(/\/+$/, '');
  return path === REFRESH_TOKEN_PATH || path.endsWith(`/${REFRESH_TOKEN_PATH}`);
};

/**
 * Renova a sessão no Torii. Chamadas concorrentes compartilham a mesma
 * requisição (o Torii rotaciona o refresh token a cada uso). A chamada usa o
 * cliente `authRefresh`, sem interceptors, então uma falha (inclusive `401`)
 * rejeita imediatamente todas as chamadas em espera.
 */
export const refreshSession = (): Promise<IRefreshSessionData> => {
  if (!refreshPromise) {
    refreshPromise = authRefresh
      .get<IRefreshSessionData>(REFRESH_TOKEN_PATH)
      .then(({ data }) => {
        if (!data?.accessToken) {
          throw new Error('Resposta de renovação de sessão sem accessToken.');
        }
        useAuthStore.getState().setAccessToken(data.accessToken);
        return data;
      })
      .catch((err) => {
        useAuthStore.getState().setAccessToken(null);
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

export const refreshAccessToken = async (): Promise<string> => {
  const { accessToken } = await refreshSession();
  return accessToken;
};
