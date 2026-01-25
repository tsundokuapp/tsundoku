'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { FooterBar } from '@/shared/components/layout/footer/FooterBar';
import { HeaderBar } from '@/shared/components/layout/header/HeaderBar';
import { ScrollToTopButton } from '@/shared/components/ui/ScrollToTopButton';
import { useBannerStore } from '@/shared/stores/useBannerStore';

export default function WebappLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const parts = path.split('/');

  const { banner } = useBannerStore();
  const isNovelOrMangaPage =
    parts.length > 2 && (parts[1] === 'novels' || parts[1] === 'comics');

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <HeaderBar className="z-10" />
      {isNovelOrMangaPage && (
        <div className="relative h-auto max-h-64 w-full overflow-hidden">
          <Image
            src={banner}
            overrideSrc="/banner.jpg"
            alt="Banner"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      <main className="mx-auto w-full max-w-[1300px] flex-1 px-4 py-8">
        {children}
      </main>

      <ScrollToTopButton />
      <FooterBar />
    </div>
  );
}
