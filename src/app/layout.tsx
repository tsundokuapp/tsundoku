'use client';
// Color Checked
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import './globals.css';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ModalProvider } from '@/contexts/ModalContext';
import { SearchBarProvider } from '@/contexts/SearchBarContext';
import { ToasterProvider } from '@/contexts/ToasterContext';
import { auth } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';

// Definição da Fonte Inter como a padrão do projeto
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  useEffect(() => {
    auth
      .post('refresh-token')
      .then((res) => {
        useAuthStore.getState().setAccessToken(res.data.accessToken);
      })
      .catch(() => {
        useAuthStore.getState().setAccessToken(null);
      });
  }, []);

  return (
    <html suppressHydrationWarning className={inter.variable} lang="pt-BR">
      <head>
        <meta name="title" content={'Tsundoku Traduções'} />
        <meta
          name="description"
          content={
            'Tradução de Light Novels, Web Novels e Mangás com qualidade'
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="bg-appBackground text-appText transition-colors duration-100">
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
      </body>
    </html>
  );
}
