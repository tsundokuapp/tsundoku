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
    // Evita chamadas duplicadas (ex: StrictMode, re-renders)
    if (hasHydrated.current) return;

    // Se já existe token válido, não precisa fazer refresh
    if (accessToken && !isTokenExpired()) {
      return;
    }

    hasHydrated.current = true;

    const hydrateAuth = async () => {
      setIsPending(true);
      try {
        const { data } = await auth.get('refresh-token');

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
