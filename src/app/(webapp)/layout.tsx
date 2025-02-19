'use client';
// Color Checked
// Components Checked
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
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <HeaderBar className="z-50" />
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
      <main className="mx-auto w-full max-w-[1300px] flex-1 px-4 py-8 sm:py-16">
        {children}
      </main>

      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
