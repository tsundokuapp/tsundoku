'use client';

import {
  BookBookmark,
  BookOpenText,
  CaretDown,
  CaretRight,
  ChartBar,
  CurrencyDollar,
  GearSix,
  House,
  IdentificationBadge,
  SquaresFour,
  User,
  Users,
  UsersFour,
  WarningCircle,
  X,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  IS_ORIGIN_FILTER_DEV_ENABLED,
  NOVEL_ORIGIN_OPTIONS,
} from '@/features/novels/utils/originCategories';
import { cn } from '@/shared/utils/cn';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

interface WebappSidebarProps {
  variant?: 'webapp' | 'admin';
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const ADMIN_ROUTE_PREFIXES = [
  '/dashboard',
  '/staff',
  '/noveladmin',
  '/mangaadmin',
  '/staffadmin',
  '/useradmin',
  '/project',
];

export function WebappSidebar({
  variant = 'webapp',
  mobileOpen,
  onCloseMobile,
}: WebappSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const username = useAuthStore((state) => state.username);

  const activeOrigin = searchParams.get('origem') ?? '';
  const isNovelsRoute = pathname.startsWith('/novels');
  const [novelsExpanded, setNovelsExpanded] = useState(isNovelsRoute);

  useEffect(() => {
    if (isNovelsRoute) {
      setNovelsExpanded(true);
    }
  }, [isNovelsRoute]);

  useEffect(() => {
    onCloseMobile();
  }, [pathname, activeOrigin, onCloseMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const profileHref = username
    ? `/profile/${encodeURIComponent(username)}`
    : '/login';

  const isAdminDashboardActive =
    variant === 'admin'
      ? pathname === '/dashboard'
      : ADMIN_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const itemClass = (active: boolean) =>
    cn(
      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
      active
        ? 'bg-appSidebarSurface font-medium text-appSidebarText'
        : 'text-appSidebarText/90 hover:bg-appSidebarSurface/60 hover:text-appSidebarText',
    );

  const disabledItemClass =
    'flex w-full cursor-not-allowed items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-appSidebarMuted opacity-60';

  const sidebarContent = (
    <div className="flex h-full w-[260px] flex-col bg-appSidebarBackground text-appSidebarText">
      <div className="flex items-center justify-between px-5 pb-4 pt-5">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-appSidebarBorder bg-appSidebarSurface">
            <Image
              src="/cover-shadow.webp"
              alt="Logo Tsundoku"
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-base font-semibold tracking-tight text-appSidebarText">
            Tsundoku
          </span>
        </Link>

        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Fechar menu lateral"
          className="flex h-8 w-8 items-center justify-center rounded-md text-appSidebarMuted hover:bg-appSidebarSurface hover:text-appSidebarText lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <nav
        aria-label={
          variant === 'admin' ? 'Navegação administrativa' : 'Menu principal'
        }
        className="flex-1 space-y-5 overflow-y-auto px-4 pb-4"
      >
        {/* Grupo Menu */}
        <div className="border-t border-appSidebarBorder pt-3">
          <p className="mb-2 px-2 text-xs font-medium text-appSidebarMuted">
            Menu
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                className={itemClass(pathname === '/')}
              >
                <House size={18} weight="regular" />
                <span>Início</span>
              </Link>
            </li>

            <li>
              <div className="flex items-center">
                <Link
                  href="/novels"
                  aria-current={
                    isNovelsRoute && !activeOrigin ? 'page' : undefined
                  }
                  className={cn(itemClass(isNovelsRoute), 'flex-1')}
                >
                  <BookOpenText size={18} weight="regular" />
                  <span>Novels</span>
                </Link>
                <button
                  type="button"
                  aria-expanded={novelsExpanded}
                  aria-controls="v22-sidebar-novels-submenu"
                  aria-label={
                    novelsExpanded
                      ? 'Recolher subcategorias de Novels'
                      : 'Expandir subcategorias de Novels'
                  }
                  onClick={() => setNovelsExpanded((prev) => !prev)}
                  className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-appSidebarMuted transition-colors hover:bg-appSidebarSurface hover:text-appSidebarText"
                >
                  {novelsExpanded ? (
                    <CaretDown size={14} weight="bold" />
                  ) : (
                    <CaretRight size={14} weight="bold" />
                  )}
                </button>
              </div>

              {novelsExpanded && (
                <ul
                  id="v22-sidebar-novels-submenu"
                  className="mt-1 space-y-1 pl-9"
                >
                  {NOVEL_ORIGIN_OPTIONS.map((origin) => {
                    const isOriginActive =
                      isNovelsRoute && activeOrigin === origin.slug;

                    // TODO(backend-integration): Remover gate quando `tsundoku-api` expuser filtro real por nacionalidade/origem (`GET /api/obras/novels?origem=<slug>`).
                    // Em produção os subitens ficam visíveis na hierarquia do menu mas desabilitados até haver dados confiáveis.
                    if (!IS_ORIGIN_FILTER_DEV_ENABLED) {
                      return (
                        <li key={origin.slug}>
                          <span
                            aria-disabled="true"
                            title="Filtro por origem indisponível até suporte na API"
                            className="block cursor-not-allowed py-1 text-sm text-appSidebarMuted opacity-60"
                          >
                            {origin.label}
                          </span>
                        </li>
                      );
                    }

                    return (
                      <li key={origin.slug}>
                        <Link
                          href={`/novels?origem=${origin.slug}`}
                          aria-current={isOriginActive ? 'page' : undefined}
                          className={cn(
                            'block rounded px-1.5 py-1 text-sm transition-colors',
                            isOriginActive
                              ? 'font-semibold text-appSidebarText'
                              : 'text-appSidebarMuted hover:text-appSidebarText',
                          )}
                        >
                          {origin.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/comics"
                aria-current={
                  pathname.startsWith('/comics') ? 'page' : undefined
                }
                className={itemClass(pathname.startsWith('/comics'))}
              >
                <BookBookmark size={18} weight="regular" />
                <span>Comics</span>
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                aria-current={pathname === '/about' ? 'page' : undefined}
                className={itemClass(pathname === '/about')}
              >
                <User size={18} weight="regular" />
                <span>Sobre Nós</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Grupo Apoiador */}
        <div className="border-t border-appSidebarBorder pt-3">
          <p className="mb-2 px-2 text-xs font-medium text-appSidebarMuted">
            Apoiador
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href={profileHref}
                aria-current={
                  pathname.startsWith('/profile') ? 'page' : undefined
                }
                className={itemClass(pathname.startsWith('/profile'))}
              >
                <User size={18} weight="regular" />
                <span>Perfil</span>
              </Link>
            </li>

            <li>
              <a
                href={LINK_DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass(false)}
              >
                <CurrencyDollar size={18} weight="regular" />
                <span>Apoio</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Grupo Admin */}
        <div className="border-t border-appSidebarBorder pt-3">
          <p className="mb-2 px-2 text-xs font-medium text-appSidebarMuted">
            Admin
          </p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                aria-current={isAdminDashboardActive ? 'page' : undefined}
                className={itemClass(isAdminDashboardActive)}
              >
                <SquaresFour size={18} weight="regular" />
                <span>Dashboard</span>
              </Link>
            </li>

            {variant === 'admin' && (
              <>
                <li>
                  <Link
                    href="/staff"
                    aria-current={pathname === '/staff' ? 'page' : undefined}
                    className={itemClass(pathname === '/staff')}
                  >
                    <UsersFour size={18} weight="regular" />
                    <span>Staff</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/noveladmin"
                    aria-current={
                      pathname.startsWith('/noveladmin') ? 'page' : undefined
                    }
                    className={itemClass(pathname.startsWith('/noveladmin'))}
                  >
                    <BookOpenText size={18} weight="regular" />
                    <span>Novels (Admin)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mangaadmin"
                    aria-current={
                      pathname.startsWith('/mangaadmin') ? 'page' : undefined
                    }
                    className={itemClass(pathname.startsWith('/mangaadmin'))}
                  >
                    <BookBookmark size={18} weight="regular" />
                    <span>Mangás (Admin)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/staffadmin"
                    aria-current={
                      pathname.startsWith('/staffadmin') ? 'page' : undefined
                    }
                    className={itemClass(pathname.startsWith('/staffadmin'))}
                  >
                    <IdentificationBadge size={18} weight="regular" />
                    <span>Permissões</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/useradmin"
                    aria-current={
                      pathname.startsWith('/useradmin') ? 'page' : undefined
                    }
                    className={itemClass(pathname.startsWith('/useradmin'))}
                  >
                    <Users size={18} weight="regular" />
                    <span>Usuários</span>
                  </Link>
                </li>
              </>
            )}

            {/* TODO(backend-integration): Conectar Reports administrativos quando houver módulo de moderação/denúncias no `tsundoku-api`. */}
            <li>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Reports indisponíveis — endpoint administrativo pendente no backend"
                className={disabledItemClass}
              >
                <span className="flex items-center gap-3">
                  <WarningCircle size={18} weight="regular" />
                  <span>Reports</span>
                </span>
                <span className="rounded bg-appSidebarSurface px-1.5 py-0.5 text-[10px] text-appSidebarMuted">
                  Em breve
                </span>
              </button>
            </li>

            {/* TODO(backend-integration): Conectar Configurações do site/painel quando existir endpoint de parâmetros no backend. */}
            <li>
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Configurações indisponíveis — endpoint administrativo pendente no backend"
                className={disabledItemClass}
              >
                <span className="flex items-center gap-3">
                  <GearSix size={18} weight="regular" />
                  <span>Configurações</span>
                </span>
                <span className="rounded bg-appSidebarSurface px-1.5 py-0.5 text-[10px] text-appSidebarMuted">
                  Em breve
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* CTA Upgrade do Plano */}
      {/* TODO(backend-integration): Conectar CTA Upgrade do Plano ao fluxo de assinatura/apoiador no Torii ou gateway de pagamento quando disponível. */}
      <div className="px-4 pb-8 pt-2">
        <div className="flex justify-center">
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Planos de apoiador ainda não integrados — em breve"
            className="inline-flex cursor-not-allowed items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-appCtaGradientFrom to-appCtaGradientTo px-4 py-2 text-xs font-medium text-white opacity-80 shadow-sm"
          >
            <ChartBar size={14} weight="bold" />
            <span>Upgrade do Plano</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden border-r border-appSidebarBorder lg:block">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            aria-hidden="true"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
          />
          <aside
            data-testid="v22-mobile-drawer"
            className="relative z-10 h-full w-[260px] border-r border-appSidebarBorder shadow-2xl"
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
