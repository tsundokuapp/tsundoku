import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { FooterBar } from '@/components/footer/FooterBar';
import { HeaderBar } from '@/components/header/HeaderBar';

export default function webappLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full grid-rows-[min-content_1fr_min-content]">
      <HeaderBar />
      <main className="mx-auto flex w-full flex-col gap-12 px-20 pb-16 pt-8 font-normal">
        {children}
      </main>
      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
