'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { FooterBar } from '@/components/footer/FooterBar';
import { HeaderBar } from '@/components/header/HeaderBar';

export default function WebappLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const parts = path.split('/');

  return (
    <div className="mx-auto grid min-h-screen w-full grid-rows-[min-content_1fr_min-content]">
      <HeaderBar />
      {parts.length > 2 && (
        <div className="relative h-64 w-full overflow-hidden blur-sm">
          <Image
            src="/banner-emilia.jpg"
            overrideSrc="/banner-emilia.jpg"
            alt="Banner"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      <main className="mx-auto flex w-full flex-col gap-12 px-20 pb-16 pt-8 font-normal">
        {children}
      </main>
      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
