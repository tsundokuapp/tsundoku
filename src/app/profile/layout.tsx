import type { ReactNode } from 'react';

import { FooterBar } from '@/shared/components/layout/footer/FooterBar';
import { HeaderBar } from '@/shared/components/layout/header/HeaderBar';
import { ScrollToTopButton } from '@/shared/components/ui/ScrollToTopButton';

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
