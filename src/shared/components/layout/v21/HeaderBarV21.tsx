'use client';

import { BookOpen, CaretDown, List } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { canAccessAdmin } from '@/core/auth/components/AdminGuard';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  IS_ORIGIN_FILTER_DEV_ENABLED,
  NOVEL_ORIGIN_OPTIONS,
} from '@/features/novels/utils/originCategories';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { ThemeToggle } from '@/shared/components/ui/theme/ThemeToggle';
import { ThemeToggleList } from '@/shared/components/ui/theme/ThemeToggleList';
import { cn } from '@/shared/utils/cn';
import { withV21LayoutParam } from '@/shared/utils/layoutParam';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { HeaderButtonLogin } from '../header/HeaderButtonLogin';
import { InlineSearchBar } from '../search/InlineSearchBar';

export function HeaderBarV21() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const layoutParam = searchParams.get('layout') ?? 'v2.1';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [novelsDropdownOpen, setNovelsDropdownOpen] = useState(false);
  const { username, position, isPending, hasHydrated } = useAuthStore();
  const showAdminLink =
    hasHydrated && !isPending && canAccessAdmin(username, position);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Novels', href: '/novels', hasDropdown: true },
    { label: 'Comics', href: '/comics' },
    { label: 'Blog', href: '/blog' },
    { label: 'Sobre Nós', href: '/about' },
  ];

  const isRouteActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 h-[60px] w-full border-b border-appCardBorder bg-appCardBackground shadow-[0_5px_10px_0_rgba(0,0,0,0.22)]">
      <div className="mx-auto flex h-full w-full max-w-[1366px] items-center justify-between gap-3 px-4 lg:px-10">
        {/* Mobile left trigger + search (1321:35402) */}
        <div className="flex flex-1 items-center gap-3 lg:hidden">
          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                data-testid="v21-mobile-menu-trigger"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-appText transition-colors hover:bg-appGroupBackground"
              >
                <List size={24} />
              </button>
            </DialogTrigger>
            <DialogContent className="!left-0 !right-auto !top-0 flex h-full w-[240px] max-w-[80vw] !translate-x-0 !translate-y-0 flex-col border-r border-appCardBorder bg-appCardBackground p-0 sm:rounded-none">
              <div className="flex items-center gap-3 border-b border-appCardBorder px-5 py-4">
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-appGroupBackground">
                  <Image
                    src="/cover-shadow.webp"
                    alt="Logo Tsundoku"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <DialogTitle className="text-sm font-bold text-appText">
                  Tsundoku
                </DialogTitle>
              </div>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-1 flex-col gap-2 px-3 py-5"
              >
                {navItems.map((item) => {
                  const active = isRouteActive(item.href);
                  return (
                    <DialogClose asChild key={item.href}>
                      <Link
                        href={withV21LayoutParam(item.href, layoutParam)}
                        className={cn(
                          'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          active
                            ? 'border-l-2 border-appAccentCyan bg-appGroupBackground font-bold text-appText'
                            : 'text-appText hover:bg-appGroupBackground',
                        )}
                      >
                        <BookOpen size={16} className="shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </DialogClose>
                  );
                })}

                <div className="mt-2 border-t border-appCardBorder pt-3">
                  <Link
                    href={LINK_DISCORD}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-md px-3 py-2 text-xs font-medium text-appSubtitle hover:bg-appGroupBackground hover:text-appText"
                  >
                    Apoio (Discord)
                  </Link>
                  {showAdminLink ? (
                    <DialogClose asChild>
                      <Link
                        href="/dashboard"
                        className="block rounded-md px-3 py-2 text-xs font-medium text-appAccentCyan hover:bg-appGroupBackground"
                      >
                        Dashboard Admin
                      </Link>
                    </DialogClose>
                  ) : null}
                </div>
              </nav>

              <div className="border-t border-appCardBorder p-4">
                <ThemeToggleList />
              </div>
            </DialogContent>
          </Dialog>

          <InlineSearchBar
            placeholder="Pesquisar..."
            variant="pill"
            className="flex-1"
          />
        </div>

        {/* Desktop Left: Logo + Links (1024:149) */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href={withV21LayoutParam('/', layoutParam)}
            aria-label="Tsundoku Traduções - Início"
            className="flex items-center gap-2.5"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-appCardBorder bg-appGroupBackground">
              <Image
                src="/cover-shadow.webp"
                alt="Tsundoku"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="sr-only">Tsundoku Traduções</span>
          </Link>

          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-6"
          >
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              const targetHref = withV21LayoutParam(item.href, layoutParam);
              if (!item.hasDropdown) {
                return (
                  <Link
                    key={item.href}
                    href={targetHref}
                    className={cn(
                      'relative py-2 text-sm font-medium text-appText transition-colors hover:text-appAccentCyan',
                      active && 'font-semibold',
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-appAccentCyan" />
                    ) : null}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setNovelsDropdownOpen(true)}
                  onMouseLeave={() => setNovelsDropdownOpen(false)}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={targetHref}
                      className={cn(
                        'relative py-2 text-sm font-medium text-appText transition-colors hover:text-appAccentCyan',
                        active && 'font-semibold',
                      )}
                    >
                      {item.label}
                      {active ? (
                        <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-appAccentCyan" />
                      ) : null}
                    </Link>
                    <button
                      type="button"
                      aria-label="Submenu de Novels"
                      aria-expanded={novelsDropdownOpen}
                      onClick={() => setNovelsDropdownOpen((prev) => !prev)}
                      className="text-appSubtitle hover:text-appText"
                    >
                      <CaretDown size={12} weight="bold" />
                    </button>
                  </div>

                  {novelsDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[180px] rounded-md border border-appCardBorder bg-appCardBackground p-1.5 shadow-lg">
                      <Link
                        href={withV21LayoutParam('/novels', layoutParam)}
                        onClick={() => setNovelsDropdownOpen(false)}
                        className="block rounded px-3 py-1.5 text-xs font-medium text-appText hover:bg-appGroupBackground"
                      >
                        Todas as Novels
                      </Link>
                      {NOVEL_ORIGIN_OPTIONS.map((origin) =>
                        IS_ORIGIN_FILTER_DEV_ENABLED ? (
                          <Link
                            key={origin.slug}
                            href={withV21LayoutParam(
                              `/novels?origem=${origin.slug}`,
                              layoutParam,
                            )}
                            onClick={() => setNovelsDropdownOpen(false)}
                            className="block rounded px-3 py-1.5 text-xs text-appSubtitle hover:bg-appGroupBackground hover:text-appText"
                          >
                            {origin.label}
                          </Link>
                        ) : (
                          <span
                            key={origin.slug}
                            aria-disabled="true"
                            title="Em breve — aguardando suporte na API"
                            className="text-appSubtitle/50 block cursor-not-allowed rounded px-3 py-1.5 text-xs"
                          >
                            {origin.label} (em breve)
                          </span>
                        ),
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right: Search (Desktop) + ThemeToggle + Login */}
        <div className="flex items-center gap-2 sm:gap-3">
          <InlineSearchBar
            placeholder="Novel, Comic, Gênero..."
            variant="pill"
            className="hidden w-[280px] lg:block xl:w-[310px]"
          />
          <ThemeToggle buttonClassName="text-appText hover:bg-appGroupBackground" />
          <div className="lg:hidden">
            <HeaderButtonLogin
              compact
              compactStyle="ghost"
              compactLoggedView="icon"
              loggedOutLabel="Login"
              textTone="surface"
            />
          </div>
          <div className="hidden lg:block">
            <HeaderButtonLogin
              compact={false}
              compactStyle="ghost"
              compactLoggedView="user-info"
              loggedOutLabel="Login"
              textTone="surface"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
