'use client';
// Color Checked
// Components Checked
import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { FooterBar } from '@/components/footer/FooterBar';
import { HeaderBar } from '@/components/header/HeaderBar';

export default function WebappLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <HeaderBar className="z-10" />

      <main className="flex-1">{children}</main>

      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
