'use client';

import { List } from '@phosphor-icons/react/dist/ssr';

import { HeaderButtonLogin } from '@/shared/components/layout/header/HeaderButtonLogin';
import { InlineSearchBar } from '@/shared/components/layout/search/InlineSearchBar';
import { ThemeToggle } from '@/shared/components/ui/theme/ThemeToggle';

import { AdminBreadcrumbs } from './AdminBreadcrumbs';

interface WebappTopbarProps {
  onOpenMobileSidebar: () => void;
  variant?: 'webapp' | 'admin';
}

export function WebappTopbar({
  onOpenMobileSidebar,
  variant = 'webapp',
}: WebappTopbarProps) {
  if (variant === 'admin') {
    return (
      <header className="bg-appSurfaceBackground/95 sticky top-0 z-20 w-full backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={onOpenMobileSidebar}
              data-testid="v22-mobile-menu-trigger"
              aria-label="Abrir menu lateral"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground lg:hidden"
            >
              <List size={20} weight="bold" />
            </button>

            <AdminBreadcrumbs />
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <ThemeToggle buttonClassName="text-appText hover:bg-appGroupBackground" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-appSurfaceBackground/95 sticky top-0 z-20 w-full backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1220px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            data-testid="v22-mobile-menu-trigger"
            aria-label="Abrir menu lateral"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground lg:hidden"
          >
            <List size={20} weight="bold" />
          </button>

          <InlineSearchBar
            variant="bordered"
            placeholder="Novel, Comic, Gênero..."
            className="w-full max-w-[282px]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <ThemeToggle buttonClassName="text-appText hover:bg-appGroupBackground" />
          <HeaderButtonLogin
            compact
            compactStyle="gradient"
            compactLoggedView="user-info"
            loggedOutLabel="Login / Sign up"
            textTone="surface"
          />
        </div>
      </div>
    </header>
  );
}
