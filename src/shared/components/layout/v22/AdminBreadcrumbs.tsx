'use client';

import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  noveladmin: 'Novels',
  mangaadmin: 'Mangás',
  generos: 'Gêneros',
  useradmin: 'Usuários',
  staffadmin: 'Permissões',
  staff: 'Staff',
  project: 'Obras',
  capitulos: 'Capítulos',
  posts: 'Posts',
  categorias: 'Categorias',
  estatisticas: 'Estatísticas',
  blog: 'Blog',
};

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const router = useRouter();

  const rawSegments = pathname.split('/').filter(Boolean);
  const segments =
    rawSegments.length > 0 && rawSegments[0].toLowerCase() === 'admin'
      ? rawSegments.slice(1)
      : rawSegments;

  const isNestedRoute = segments.length > 1;

  return (
    <nav
      aria-label="Trilha de navegação administrativa"
      className="flex items-center gap-1.5 text-xs text-appSidebarText"
    >
      {isNestedRoute && (
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Voltar à página anterior"
          className="mr-1 flex h-7 w-7 items-center justify-center rounded-md border border-appCardBorder bg-appCardBackground text-appSidebarMuted transition-colors hover:text-appText"
        >
          <ArrowLeft size={14} weight="bold" />
        </button>
      )}

      <Link
        href="/dashboard"
        className="text-appSidebarMuted transition-colors hover:text-appText"
      >
        Admin
      </Link>

      {segments.map((segment, index) => {
        const label =
          ROUTE_LABELS[segment.toLowerCase()] || decodeURIComponent(segment);
        const isLast = index === segments.length - 1;
        const rawIndex =
          rawSegments.length > 0 && rawSegments[0].toLowerCase() === 'admin'
            ? index + 1
            : index;
        const href = `/${rawSegments.slice(0, rawIndex + 1).join('/')}`;

        return (
          <div key={href} className="flex items-center gap-1.5">
            <span className="text-appSidebarMuted" aria-hidden="true">
              /
            </span>
            {isLast ? (
              <span
                aria-current="page"
                className="font-semibold text-appSidebarText"
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="text-appSidebarMuted transition-colors hover:text-appText"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
