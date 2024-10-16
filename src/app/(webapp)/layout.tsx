import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { FooterBar } from '@/components/footer/FooterBar';
import { HeaderBar } from '@/components/header/HeaderBar';

export default function webappLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w[1600px] mx-auto grid min-h-screen w-full grid-rows-[min-content_1fr_min-content]">
      <HeaderBar />
      <main className="flex flex-col gap-12 px-44 py-16 font-normal">
        {children}
      </main>
      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
