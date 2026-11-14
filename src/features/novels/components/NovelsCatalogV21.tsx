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

export function NovelsCatalogV21() {
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
      setFilters((prev) => {
        const next = { ...prev, ...patch };
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
        return next;
      });
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

  const sectionHeading = isOriginFixtureMode
    ? `Light Novels — ${getOriginLabel(filters.origin)}`
    : filters.workType || 'Light Novels';

  return (
    <div className="flex w-full flex-col gap-10 pb-14">
      {/* Banner superior full-bleed (1054:415) */}
      <div className="relative h-[180px] w-full overflow-hidden rounded-b-[8px] bg-appCardBackground sm:h-[260px] lg:h-[370px]">
        <Image
          src="/banner-emilia.jpg"
          alt="Estante de Novels da Tsundoku"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 sm:px-6">
        <NovelCatalogFilters
          genres={genresData}
          workTypes={availableWorkTypes}
          filters={filters}
          onChange={handleFiltersChange}
          onClearAll={handleClearAll}
          variant="v21"
        />

        {isOriginFixtureMode && (
          <div className="border-appAccentCyan/40 rounded-lg border bg-appCardBackground px-4 py-2.5 text-xs text-appText">
            <strong>Modo desenvolvimento:</strong> exibindo obras de
            demonstração para a origem{' '}
            <strong>{getOriginLabel(filters.origin)}</strong>. A API{' '}
            <code>GET /api/obras/novels</code> ainda não retorna o campo{' '}
            <code>nacionalidade/origem</code>.
          </div>
        )}

        {originIgnoredInProd && (
          <div className="rounded-lg border border-appCardBorder bg-appCardBackground px-4 py-2.5 text-xs text-appSubtitle">
            O filtro por origem/nacionalidade permanece indisponível até suporte
            no servidor. Exibindo todo o catálogo.
          </div>
        )}

        <section aria-labelledby="v21-novels-grid-heading">
          <h2
            id="v21-novels-grid-heading"
            className="mb-6 text-xl font-bold text-appTitle sm:text-2xl"
          >
            {sectionHeading}
          </h2>

          {isLoadingNovels && !isOriginFixtureMode && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse rounded-[25px] border border-appCardBorder bg-appCardBackground p-4"
                >
                  <div className="aspect-[3/4] w-full rounded-[10px] bg-appGroupBackground" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-appGroupBackground" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-appGroupBackground" />
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
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredNovels.map((novel) => (
                  <article
                    key={novel.id}
                    className="flex flex-col rounded-[25px] border border-appCardBorder bg-appCardBackground p-4 shadow-sm transition-transform hover:-translate-y-1"
                  >
                    <Link href={`/novels/${novel.slug}`} className="block">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px] bg-appGroupBackground">
                        <Image
                          src={novel.urlCapa}
                          alt={novel.titulo}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="mt-4 truncate text-base font-medium text-appTitle">
                        {novel.alias || novel.titulo}
                      </h3>
                    </Link>

                    <div className="mt-2 space-y-1 text-xs">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-appTitle">
                          Autor:
                        </span>
                        <span className="truncate text-appSubtitle">
                          {novel.autor || 'Equipe Tsundoku'}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-appTitle">
                          Volume:
                        </span>
                        <span className="truncate text-appSubtitle">
                          {novel.descritivoVolume || 'Único'}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-appTitle">Tipo:</span>
                        <span className="truncate text-appSubtitle">
                          {novel.tipoObra}
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
        </section>
      </div>
    </div>
  );
}
