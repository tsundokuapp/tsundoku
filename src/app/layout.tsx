import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

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
      <body className="bg-white text-gray-800 dark:bg-slate-900 dark:text-white transition-colors duration-1000">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableColorScheme
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
