import { useEffect, useRef } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

export const useAuthHydration = () => {
  const {
    setUsername,
    setAccessToken,
    setTsunId,
    setIsPending,
    setHasHydrated,
    accessToken,
    isTokenExpired,
  } = useAuthStore();

  const hasHydrated = useRef(false);

  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    if (accessToken && !isTokenExpired()) {
      setHasHydrated(true);
      return;
    }

    const hydrateAuth = async () => {
      setIsPending(true);
      try {
        const { data } = await auth.get('refresh-token');

        setAccessToken(data.accessToken);
        setUsername(data.usuario);
        setTsunId(data.tsunId);
      } catch (error) {
        console.log('Fail to refresh token in useAuthHydration');
      } finally {
        setIsPending(false);
        setHasHydrated(true);
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
