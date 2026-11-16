import axios from 'axios';

import { selectAPI, selectAuthAPI } from './request';

const timeout = 10000;

export const api = axios.create({
  baseURL: selectAPI(),
  timeout: timeout,
});

export const apiPrivate = axios.create({
  baseURL: selectAPI(),
  timeout: timeout,
  withCredentials: true,
});

export const auth = axios.create({
  baseURL: selectAuthAPI(),
  timeout: timeout,
  withCredentials: true,
});

export const authPrivate = axios.create({
  baseURL: selectAuthAPI(),
  timeout: timeout,
  withCredentials: true,
});

/**
 * Cliente exclusivo da renovação de sessão (`GET refresh-token`).
 *
 * Não recebe os interceptors de retry de `setupInterceptors()`: um `401`
 * do próprio refresh precisa encerrar a tentativa, e não disparar outra
 * renovação que aguardaria a si mesma. O Torii lê o refresh token apenas do
 * cookie `tsun_refresh_token`, então nenhum header Authorization é enviado.
 */
export const authRefresh = axios.create({
  baseURL: selectAuthAPI(),
  timeout: timeout,
  withCredentials: true,
});
