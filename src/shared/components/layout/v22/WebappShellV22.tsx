'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode, Suspense, useCallback, useState } from 'react';

import { FooterV2 } from '@/shared/components/layout/footer/FooterV2';
import { ScrollToTopButton } from '@/shared/components/ui/ScrollToTopButton';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useBannerStore } from '@/shared/stores/useBannerStore';
import { cn } from '@/shared/utils/cn';
import { BLUR_DATA_URL } from '@/shared/utils/image';

import { WebappSidebar } from './WebappSidebar';
import { WebappTopbar } from './WebappTopbar';

interface WebappShellV22Props {
  children: ReactNode;
  variant?: 'webapp' | 'admin';
}

export function WebappShellV22({
  children,
  variant = 'webapp',
}: WebappShellV22Props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [storedCollapsed, setStoredCollapsed, isHydrated] =
    useLocalStorage<boolean>('tsundoku-admin-sidebar-collapsed', false);
  const isCollapsed = isHydrated ? storedCollapsed : false;

  const handleToggleCollapse = useCallback(() => {
    setStoredCollapsed((prev) => !prev);
  }, [setStoredCollapsed]);

  const pathname = usePathname();
  const banner = useBannerStore((state) => state.banner);

  const handleCloseMobile = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const isWorkDetailRoute =
    variant === 'webapp' &&
    /^\/(novels|comics)\/[^/]+$/.test(pathname) &&
    banner;

  const sidebarPadding =
    variant === 'admin'
      ? isCollapsed
        ? 'lg:pl-[80px]'
        : 'lg:pl-[200px]'
      : 'lg:pl-[260px]';

  return (
    <div className="min-h-screen bg-appSurfaceBackground text-appText">
      <Suspense fallback={null}>
        <WebappSidebar
          variant={variant}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={handleCloseMobile}
          isCollapsed={variant === 'admin' ? isCollapsed : false}
          onToggleCollapse={handleToggleCollapse}
        />
      </Suspense>

      <div
        className={cn(
          'flex min-h-screen flex-col transition-[padding] duration-300',
          sidebarPadding,
        )}
      >
        <WebappTopbar
          variant={variant}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        {isWorkDetailRoute ? (
          <div className="mx-auto w-full max-w-[1220px] px-4 pt-2 sm:px-6 lg:px-8">
            <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-appCardBackground sm:h-[280px]">
              <Image
                src={banner}
                alt="Capa da obra"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1140px"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          </div>
        ) : null}

        <main className="mx-auto w-full max-w-[1220px] flex-1 px-4 py-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <ScrollToTopButton />
        {variant === 'webapp' && (
          <FooterV2 className="border-t-0 bg-transparent" />
        )}
      </div>
    </div>
  );
}
