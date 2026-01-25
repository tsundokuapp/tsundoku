import { useEffect } from 'react';

import { auth } from '@/core/api';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

export const useAuthHydration = () => {
  const { setUsername, setAccessToken, setTsunId, setIsPending } =
    useAuthStore();

  useEffect(() => {
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
  }, [setAccessToken, setIsPending, setTsunId, setUsername]);
};
