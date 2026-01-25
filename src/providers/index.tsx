'use client';

import { useEffect, useRef } from 'react';

import { setupInterceptors } from '@/core/api/interceptors';
import { useAuthHydration } from '@/core/auth/hooks/useAuthHydration';
import { SearchBarOverlay } from '@/shared/components/feedback/SearchBarOverlay';
import { ToasterConfig } from '@/shared/components/feedback/ToasterConfig';
import { ModalProvider } from '@/shared/contexts/ModalContext';
import { SearchBarProvider } from '@/shared/contexts/SearchBarContext';
import { ToasterProvider } from '@/shared/contexts/ToasterContext';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  const interceptorsInitialized = useRef(false);

  useEffect(() => {
    if (!interceptorsInitialized.current) {
      setupInterceptors();
      interceptorsInitialized.current = true;
    }
  }, []);

  useAuthHydration();

  return (
    <>
      <QueryProvider>
        <ThemeProvider
          themes={['theme-light', 'theme-sepia', 'theme-blue', 'theme-dark']}
          attribute="class"
          defaultTheme="theme-light"
          enableColorScheme
        >
          <ToasterProvider>
            <ToasterConfig />
            <SearchBarProvider>
              <SearchBarOverlay />
              <ModalProvider>{children}</ModalProvider>
            </SearchBarProvider>
          </ToasterProvider>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
