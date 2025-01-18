'use client';

import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { useState } from 'react';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ModalProvider } from '@/contexts/ModalContext';
import { SearchBarProvider } from '@/contexts/SearchBarContext';
import { ToasterProvider } from '@/contexts/ToasterContext';

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
      <body className="bg-white text-gray-800 transition-colors duration-1000 dark:bg-slate-900 dark:text-white">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            enableSystem
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
