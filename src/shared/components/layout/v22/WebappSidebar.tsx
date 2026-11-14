'use client';

import type { Icon } from '@phosphor-icons/react';
import {
  BookBookmark,
  BookOpenText,
  CaretDown,
  CaretLeft,
  CaretRight,
  ChartBar,
  CurrencyDollar,
  FileText,
  FolderSimple,
  GearSix,
  House,
  IdentificationBadge,
  Newspaper,
  SignOut,
  SquaresFour,
  Tag,
  User,
  Users,
  UsersFour,
  WarningCircle,
  X,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { canAccessAdmin } from '@/core/auth/components/AdminGuard';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  IS_ORIGIN_FILTER_DEV_ENABLED,
  NOVEL_ORIGIN_OPTIONS,
} from '@/features/novels/utils/originCategories';
import { cn } from '@/shared/utils/cn';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

export const ADMIN_ROUTE_PREFIXES = [
  '/dashboard',
  '/noveladmin',
  '/mangaadmin',
  '/generos',
  '/admin/generos',
  '/useradmin',
  '/staffadmin',
  '/staff',
  '/project',
  '/admin/posts',
  '/admin/blog/categorias',
];

interface WebappSidebarProps {
  variant?: 'webapp' | 'admin';
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface AdminNavItem {
  id: string;
  label: string;
  href: string;
  icon: Icon;
}

interface AdminNavGroup {
  id: string;
  title: string;
  items: AdminNavItem[];
}

const ADMIN_GROUPS: AdminNavGroup[] = [
  {
    id: 'principal',
    title: 'Principal',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: SquaresFour,
      },
      {
        id: 'novels',
        label: 'Novels',
        href: '/noveladmin',
        icon: BookOpenText,
      },
      {
        id: 'mangas',
        label: 'Mangás',
        href: '/mangaadmin',
        icon: BookBookmark,
      },
      { id: 'volumes', label: 'Volumes', href: '/project', icon: BookBookmark },
      {
        id: 'capitulos',
        label: 'Capítulos',
        href: '/project/capitulos',
        icon: FileText,
      },
      { id: 'generos', label: 'Gêneros', href: '/admin/generos', icon: Tag },
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    items: [
      { id: 'posts', label: 'Posts', href: '/admin/posts', icon: Newspaper },
      {
        id: 'categorias',
        label: 'Categorias',
        href: '/admin/blog/categorias',
        icon: FolderSimple,
      },
    ],
  },
  {
    id: 'admin',
    title: 'Admin',
    items: [
      { id: 'usuarios', label: 'Usuários', href: '/useradmin', icon: Users },
      {
        id: 'permissoes',
        label: 'Permissões',
        href: '/staffadmin',
        icon: IdentificationBadge,
      },
      { id: 'staff', label: 'Staff', href: '/staff', icon: UsersFour },
      {
        id: 'estatisticas',
        label: 'Estatísticas',
        href: '/dashboard?tab=estatisticas',
        icon: ChartBar,
      },
    ],
  },
];

function isAdminItemActive(
  item: AdminNavItem,
  pathname: string,
  searchParams?: { get: (name: string) => string | null } | null,
): boolean {
  if (item.id === 'dashboard') {
    const isEstatisticasTab = searchParams?.get('tab') === 'estatisticas';
    return pathname === '/dashboard' && !isEstatisticasTab;
  }
  if (item.id === 'novels') {
    return pathname.startsWith('/noveladmin');
  }
  if (item.id === 'mangas') {
    return pathname.startsWith('/mangaadmin');
  }
  if (item.id === 'volumes') {
    return pathname.startsWith('/project') && !pathname.includes('capitulo');
  }
  if (item.id === 'capitulos') {
    return (
      pathname.startsWith('/project/capitulos') ||
      (pathname.startsWith('/project') && pathname.includes('capitulo'))
    );
  }
  if (item.id === 'estatisticas') {
    return (
      (pathname === '/dashboard' &&
        searchParams?.get('tab') === 'estatisticas') ||
      pathname === '/dashboard/stats' ||
      pathname === '/admin/estatisticas'
    );
  }
  return pathname.startsWith(item.href);
}

export function WebappSidebar({
  variant = 'webapp',
  mobileOpen,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: WebappSidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { username, position, isPending, hasHydrated, logout } = useAuthStore();

  const canShowAdminGroup =
    hasHydrated && !isPending && canAccessAdmin(username, position);

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

  const handleLogout = useCallback(() => {
    logout();
    router.push('/');
  }, [logout, router]);

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

  // --- Webapp Variant Sidebar Content ---
  const webappSidebarContent = (
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
        aria-label="Menu principal"
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
                title="Comunidade e informações de apoio no Discord"
                aria-label="Apoio à Tsundoku no Discord (abre em nova aba)"
                className={itemClass(false)}
              >
                <CurrencyDollar size={18} weight="regular" />
                <span>Apoio (Discord)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Grupo Admin — visível somente após hidratação para perfis Staff/Admin */}
        {canShowAdminGroup && (
          <div
            data-testid="v22-sidebar-admin-group"
            className="border-t border-appSidebarBorder pt-3"
          >
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
        )}
      </nav>

      {/* CTA Upgrade do Plano */}
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

  // --- Admin Variant Sidebar Content (Desktop & Mobile) ---
  const renderAdminSidebarContent = (isMobile: boolean) => {
    const collapsed = !isMobile && isCollapsed;

    return (
      <div
        className={cn(
          'flex h-full flex-col bg-[#202024] text-[#e1e1e6]',
          isMobile ? 'w-[207px]' : collapsed ? 'w-[80px]' : 'w-[200px]',
        )}
      >
        {/* Header com Logo */}
        <div
          className={cn(
            'flex items-center pb-2 pt-4',
            isMobile
              ? 'justify-between px-3'
              : collapsed
                ? 'justify-center px-2'
                : 'justify-between px-3',
          )}
        >
          <Link
            href="/"
            aria-label="Página inicial do Tsundoku"
            className="flex items-center gap-2 hover:opacity-90"
          >
            <div className="relative size-[40px] shrink-0 overflow-hidden rounded-full border border-appSidebarBorder bg-appSidebarSurface">
              <Image
                src="/cover-shadow.webp"
                alt="Logo Tsundoku"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            {!collapsed && (
              <span className="text-sm font-bold tracking-tight text-[#e1e1e6]">
                Tsundoku
              </span>
            )}
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Fechar menu lateral"
              className="flex h-8 w-8 items-center justify-center rounded-md text-appSidebarMuted hover:bg-appSidebarSurface hover:text-appSidebarText"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Card de Usuário */}
        <div className="flex flex-col items-center justify-center pb-3 pt-2">
          <div
            className={cn(
              'relative overflow-hidden rounded-[8px] border border-[#259cc1] bg-appSidebarSurface',
              isMobile
                ? 'size-[80px]'
                : collapsed
                  ? 'size-[50px]'
                  : 'size-[100px]',
            )}
          >
            <Image
              src="/cover-shadow.webp"
              alt={
                username ? `Avatar de ${username}` : 'Avatar do Administrador'
              }
              fill
              sizes={isMobile ? '80px' : collapsed ? '50px' : '100px'}
              className="object-cover"
            />
          </div>

          {!collapsed && (
            <span className="mt-2 max-w-[180px] truncate text-center text-sm font-bold text-[#259cc1]">
              {username || 'Admin'}
            </span>
          )}
        </div>

        {/* Navegação Administrativa Agrupada */}
        <nav
          data-testid="v22-sidebar-admin-group"
          aria-label="Navegação administrativa"
          className="flex-1 space-y-4 overflow-y-auto overflow-x-hidden px-2 pb-2"
        >
          {ADMIN_GROUPS.map((group) => (
            <div
              key={group.id}
              className="flex flex-col items-center space-y-1"
            >
              <p
                className={cn(
                  'text-xs font-normal text-[#e1e1e6]',
                  collapsed ? 'sr-only' : 'mb-1 w-[180px] px-2',
                )}
              >
                {group.title}
              </p>

              <ul className="flex flex-col items-center space-y-1">
                {group.items.map((item) => {
                  const active = isAdminItemActive(
                    item,
                    pathname,
                    searchParams,
                  );
                  const Icon = item.icon;

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        title={item.label}
                        aria-label={item.label}
                        className={cn(
                          'rounded-md text-xs transition-colors',
                          collapsed
                            ? 'flex h-[27px] w-[34px] items-center justify-center'
                            : 'flex h-[27px] w-[180px] items-center gap-2 px-2',
                          active
                            ? 'bg-[#259cc1] font-medium text-[#121214]'
                            : 'text-[#e1e1e6] hover:bg-[#259cc1]/15 hover:text-[#259cc1]',
                        )}
                      >
                        <Icon size={16} weight={active ? 'bold' : 'regular'} />
                        <span
                          className={cn('truncate', collapsed ? 'sr-only' : '')}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Rodapé: Site, Sair e Toggle Recolher/Expandir */}
        <div className="flex flex-col items-center space-y-1 border-t border-white/10 pb-3 pt-2">
          <p
            className={cn(
              'text-xs font-normal text-[#e1e1e6]',
              collapsed ? 'sr-only' : 'mb-1 w-[180px] px-2',
            )}
          >
            Rodapé
          </p>

          <ul className="flex flex-col items-center space-y-1">
            <li>
              <Link
                href="/"
                aria-current={pathname === '/' ? 'page' : undefined}
                title="Retornar ao Site"
                aria-label="Retornar ao Site"
                className={cn(
                  'rounded-md text-xs transition-colors',
                  collapsed
                    ? 'flex h-[27px] w-[34px] items-center justify-center'
                    : 'flex h-[27px] w-[180px] items-center gap-2 px-2',
                  pathname === '/'
                    ? 'bg-[#259cc1] font-medium text-[#121214]'
                    : 'text-[#e1e1e6] hover:bg-[#259cc1]/15 hover:text-[#259cc1]',
                )}
              >
                <House
                  size={16}
                  weight={pathname === '/' ? 'bold' : 'regular'}
                />
                <span className={cn('truncate', collapsed ? 'sr-only' : '')}>
                  Retornar ao Site
                </span>
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={handleLogout}
                title="Sair"
                aria-label="Sair da conta"
                className={cn(
                  'rounded-md text-xs transition-colors',
                  collapsed
                    ? 'flex h-[27px] w-[34px] items-center justify-center'
                    : 'flex h-[27px] w-[180px] items-center gap-2 px-2',
                  'text-[#e1e1e6] hover:bg-[#259cc1]/15 hover:text-[#259cc1]',
                )}
              >
                <SignOut size={16} weight="regular" />
                <span className={cn('truncate', collapsed ? 'sr-only' : '')}>
                  Sair
                </span>
              </button>
            </li>

            {!isMobile && onToggleCollapse && (
              <li>
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  title={collapsed ? 'Expandir menu' : 'Recolher menu'}
                  aria-label={
                    collapsed
                      ? 'Expandir menu lateral'
                      : 'Recolher menu lateral'
                  }
                  className={cn(
                    'rounded-md text-xs transition-colors',
                    collapsed
                      ? 'flex h-[27px] w-[34px] items-center justify-center'
                      : 'flex h-[27px] w-[180px] items-center justify-between px-2',
                    'text-[#e1e1e6] hover:bg-[#259cc1]/15 hover:text-[#259cc1]',
                  )}
                >
                  {collapsed ? (
                    <CaretRight size={16} weight="bold" />
                  ) : (
                    <>
                      <span>Menu</span>
                      <CaretLeft size={16} weight="bold" />
                    </>
                  )}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Aside */}
      <aside
        data-testid="v22-desktop-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-30 hidden transition-all duration-300 lg:block',
          variant === 'admin'
            ? cn(
                'rounded-br-[24px] rounded-tr-[24px] border-r-2 border-[#259cc1] bg-[#202024]',
                isCollapsed ? 'w-[80px]' : 'w-[200px]',
              )
            : 'w-[260px] border-r border-appSidebarBorder bg-appSidebarBackground',
        )}
      >
        {variant === 'admin'
          ? renderAdminSidebarContent(false)
          : webappSidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            aria-hidden="true"
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
          />
          <aside
            data-testid="v22-mobile-drawer"
            className={cn(
              'relative z-10 h-full border-r shadow-2xl transition-all',
              variant === 'admin'
                ? 'w-[207px] border-[#259cc1] bg-[#202024]'
                : 'w-[260px] border-appSidebarBorder bg-appSidebarBackground',
            )}
          >
            {variant === 'admin'
              ? renderAdminSidebarContent(true)
              : webappSidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
