import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    <html lang="pt">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
