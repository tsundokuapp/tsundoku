'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { ScrollToTopButton } from '@/shared/components/ui/ScrollToTopButton';
import { useBannerStore } from '@/shared/stores/useBannerStore';
import { BLUR_DATA_URL } from '@/shared/utils/image';

import { HeaderBarV21 } from './HeaderBarV21';
import { FooterV2 } from '../footer/FooterV2';

interface WebappShellV21Props {
  children: ReactNode;
}

export function WebappShellV21({ children }: WebappShellV21Props) {
  const pathname = usePathname();
  const banner = useBannerStore((state) => state.banner);

  const isWorkDetailRoute =
    /^\/(novels|comics)\/[^/]+$/.test(pathname) && banner;
  const isNovelsCatalog = pathname === '/novels';

  return (
    <div className="flex min-h-screen flex-col bg-appSurfaceBackground text-appText">
      <HeaderBarV21 />

      {isWorkDetailRoute ? (
        <div className="relative h-[220px] w-full overflow-hidden bg-appCardBackground sm:h-[300px]">
          <Image
            src={banner}
            alt="Capa da obra"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        </div>
      ) : null}

      <main
        className={
          isNovelsCatalog
            ? 'w-full flex-1'
            : 'mx-auto w-full max-w-[1300px] flex-1 px-4 py-4 sm:px-6'
        }
      >
        {children}
      </main>

      <ScrollToTopButton />
      <FooterV2 />
    </div>
  );
}
