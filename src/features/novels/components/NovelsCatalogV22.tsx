'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePublicNovels } from '@/features/novels/hooks/usePublicNovels';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { BLUR_DATA_URL } from '@/shared/utils/image';

import { NovelCatalogFilters } from './NovelCatalogFilters';
import { filterAndSortNovels, NovelFilterState } from '../utils/filterNovels';
import {
  getOriginLabel,
  isValidNovelOriginSlug,
} from '../utils/originCategories';

export function NovelsCatalogV22() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data: novelsResponse,
    isLoading: isLoadingNovels,
    isError: isErrorNovels,
    refetch: refetchNovels,
  } = usePublicNovels();
  const { data: genresData = [] } = usePublicGenres();

  const initialOrigin = searchParams.get('origem') ?? '';
  const initialWorkType = searchParams.get('tipo') ?? '';

  const [filters, setFilters] = useState<NovelFilterState>({
    search: '',
    genres: [],
    origin: isValidNovelOriginSlug(initialOrigin) ? initialOrigin : '',
    status: '',
    workType: initialWorkType,
    orderBy: '',
  });

  useEffect(() => {
    const paramOrigin = searchParams.get('origem') ?? '';
    const paramType = searchParams.get('tipo') ?? '';
    setFilters((prev) => ({
      ...prev,
      origin: isValidNovelOriginSlug(paramOrigin) ? paramOrigin : '',
      workType: paramType || prev.workType,
    }));
  }, [searchParams]);

  const handleFiltersChange = useCallback(
    (patch: Partial<NovelFilterState>) => {
      setFilters((prev) => ({ ...prev, ...patch }));
      if (patch.origin !== undefined) {
        const params = new URLSearchParams(searchParams.toString());
        if (patch.origin) {
          params.set('origem', patch.origin);
        } else {
          params.delete('origem');
        }
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, {
          scroll: false,
        });
      }
    },
    [pathname, router, searchParams],
  );

  const handleClearAll = useCallback(() => {
    setFilters({
      search: '',
      genres: [],
      origin: '',
      status: '',
      workType: '',
      orderBy: '',
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete('origem');
    params.delete('tipo');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const realNovels = useMemo(() => novelsResponse ?? [], [novelsResponse]);

  const {
    items: filteredNovels,
    isOriginFixtureMode,
    originIgnoredInProd,
    availableWorkTypes,
  } = useMemo(
    () => filterAndSortNovels(realNovels, filters),
    [realNovels, filters],
  );

  const activeOriginLabel = getOriginLabel(filters.origin);
  const headingText = activeOriginLabel
    ? `Novels — ${activeOriginLabel}`
    : 'Novels';

  return (
    <div className="flex w-full flex-col gap-6 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold text-appTitle sm:text-2xl">
            {headingText}
          </h1>

          {filters.origin && (
            <button
              type="button"
              onClick={() => handleFiltersChange({ origin: '' })}
              className="rounded-full border border-appCardBorder bg-appCardBackground px-3 py-1 text-xs font-medium text-appText hover:bg-appGroupBackground"
            >
              Origem: {activeOriginLabel} ×
            </button>
          )}
        </div>

        <span className="text-xs text-appSubtitle">
          {filteredNovels.length}{' '}
          {filteredNovels.length === 1 ? 'obra' : 'obras'}
        </span>
      </div>

      <NovelCatalogFilters
        genres={genresData}
        workTypes={availableWorkTypes}
        filters={filters}
        onChange={handleFiltersChange}
        onClearAll={handleClearAll}
        variant="v22"
      />

      {isOriginFixtureMode && (
        <div className="border-appAccentCyan/40 rounded-lg border bg-appCardBackground px-4 py-2.5 text-xs text-appText">
          <strong>Modo desenvolvimento:</strong> exibindo fixtures de
          demonstração para a subcategoria <strong>{activeOriginLabel}</strong>.
          O filtro real depende de suporte a <code>?origem=</code> em{' '}
          <code>GET /api/obras/novels</code>.
        </div>
      )}

      {originIgnoredInProd && (
        <div className="rounded-lg border border-appCardBorder bg-appCardBackground px-4 py-2.5 text-xs text-appSubtitle">
          O filtro por nacionalidade/origem permanece desabilitado em produção
          até existir campo confiável na API.
        </div>
      )}

      {isLoadingNovels && !isOriginFixtureMode && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="aspect-[180/255] w-full rounded-lg bg-appGroupBackground" />
              <div className="mt-2 h-3.5 w-3/4 rounded bg-appGroupBackground" />
              <div className="mt-1 h-3 w-1/2 rounded bg-appGroupBackground" />
            </div>
          ))}
        </div>
      )}

      {!isLoadingNovels && isErrorNovels && !isOriginFixtureMode && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-appCardBorder bg-appCardBackground p-8 text-center">
          <p className="text-sm font-medium text-appText">
            Não foi possível carregar o catálogo de novels.
          </p>
          <button
            type="button"
            onClick={() => void refetchNovels()}
            className="rounded-md bg-appAccentCyan px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {(!isLoadingNovels || isOriginFixtureMode) &&
        !isErrorNovels &&
        filteredNovels.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-appCardBorder bg-appCardBackground p-8 text-center">
            <p className="text-sm text-appSubtitle">
              Nenhuma novel encontrada para os filtros selecionados.
            </p>
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-md bg-appAccentCyan px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
            >
              Limpar filtros
            </button>
          </div>
        )}

      {(!isLoadingNovels || isOriginFixtureMode) &&
        !isErrorNovels &&
        filteredNovels.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredNovels.map((novel) => (
              <article key={novel.id} className="group">
                <Link href={`/novels/${novel.slug}`} className="block">
                  <div className="relative aspect-[180/255] w-full overflow-hidden rounded-lg border border-appCardBorder bg-appCardBackground shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
                    <Image
                      src={novel.urlCapa}
                      alt={novel.titulo}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-2 line-clamp-2 text-xs font-semibold leading-snug text-appText sm:text-[13px]">
                    {novel.alias || novel.titulo}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-appSubtitle">
                    {novel.tipoObra}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
    </div>
  );
}
