import { useEffect, useRef } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

export const useAuthHydration = () => {
  const {
    setUsername,
    setAccessToken,
    setTsunId,
    setIsPending,
    accessToken,
    isTokenExpired,
  } = useAuthStore();

  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    if (accessToken && !isTokenExpired()) {
      return;
    }

    const hydrateAuth = async () => {
      setIsPending(true);
      try {
        const { data } = await auth.get('/auth/refresh-token');

        setAccessToken(data.accessToken);
        setUsername(data.userName);
        setTsunId(data.TsunId);
      } catch (error) {
        console.log('Fail to refresh token in useAuthHydration');
      } finally {
        setIsPending(false);
      }
    };

    hydrateAuth();
  }, [
    accessToken,
    isTokenExpired,
    setAccessToken,
    setIsPending,
    setTsunId,
    setUsername,
  ]);
};
