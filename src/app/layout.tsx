import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ModalProvider } from '@/contexts/ModalContext';
import { SearchBarProvider } from '@/contexts/SearchBarContext';
import { ToasterProvider } from '@/contexts/ToasterContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title:
    'Tsundoku Traduções - Tradução de Light Novels, Web Novels e Mangás com qualidade',
  description: 'Tradução de Light Novels, Web Novels e Mangás com qualidade',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="pt">
      <body className="bg-white text-gray-800 transition-colors duration-1000 dark:bg-slate-900 dark:text-white">
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
      </body>
    </html>
  );
}
