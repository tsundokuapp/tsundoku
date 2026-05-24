import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { auth } from '.';

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

export const refreshAccessToken = async () => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const { data } = await auth.get('refresh-token');

    useAuthStore.getState().setAccessToken(data.accessToken);

    failedQueue.forEach((p) => p.resolve(data.accessToken));
    failedQueue = [];

    return data.accessToken;
  } catch (err) {
    useAuthStore.getState().setAccessToken(null);

    failedQueue.forEach((p) => p.reject(err));
    failedQueue = [];

    throw err;
  } finally {
    isRefreshing = false;
  }
};
