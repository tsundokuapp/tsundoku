'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ModalProvider } from '@/contexts/ModalContext';
import { SearchBarProvider } from '@/contexts/SearchBarContext';
import { ToasterProvider } from '@/contexts/ToasterContext';
import { auth } from '@/services/api/api';
import { useAuthStore } from '@/store/useAuthStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUsername, setAccessToken } = useAuthStore();

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const { data } = await auth.get('refresh-token');

        setAccessToken(data.accessToken);
        setUsername(data.userName);
      } catch {
        console.log('Fail to refresh token in authProvider');
      }
    };

    hydrateAuth();
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          themes={['theme-light', 'theme-sepia', 'theme-blue', 'theme-dark']}
          attribute="class"
          defaultTheme="theme-light"
          enableColorScheme
        >
          <ToasterProvider>
            <SearchBarProvider>
              <ModalProvider>{children}</ModalProvider>
            </SearchBarProvider>
          </ToasterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
