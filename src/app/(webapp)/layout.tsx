import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { Footer } from '@/components/footer/Footer';
import { Header } from '@/components/header/Header';

export default function webappLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w[1600px] mx-auto grid min-h-screen w-full grid-rows-[min-content_1fr_min-content]">
      <Header />
      <main className="flex flex-col gap-12 px-44 py-16">{children}</main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
