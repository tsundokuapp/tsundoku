import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export default function webappLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w[1600px] grid-rows-[min-content_1fr_min-content]">
      <Header />
      <main className="flex flex-col gap-12 py-16 px-44">{children}</main>
      <Footer />
    </div>
  );
}
