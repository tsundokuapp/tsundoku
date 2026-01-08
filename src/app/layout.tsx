'use client';
// Color Checked
import { Inter } from 'next/font/google';
import './globals.css';

import { setupInterceptors } from '@/services/api/interceptors';

import { Providers } from './providers';

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
  setupInterceptors();

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
