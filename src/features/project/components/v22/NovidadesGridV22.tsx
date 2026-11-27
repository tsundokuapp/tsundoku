'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { IProjectsHome } from '@/features/project/api/types';
import { useProjects } from '@/features/project/hooks/useProject';
import { unwrapApiArrayResult } from '@/features/project/utils/unwrapApiResult';
import { getWorkDetailHref } from '@/features/project/utils/workRoutes';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export function NovidadesGridV22() {
  const { data, isLoading, isError, refetch } = useProjects();

  const { items, isApiPayloadError } = useMemo(
    () => unwrapApiArrayResult<IProjectsHome>(data),
    [data],
  );
  const hasError = isError || isApiPayloadError;
  const visibleItems = items.slice(0, 6);

  return (
    <section aria-labelledby="v22-novidades-heading" className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="v22-novidades-heading"
          className="text-lg font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Novidades
        </h2>
        <Link
          href="/novels"
          className="text-xs font-medium text-appAccentCyan hover:underline"
        >
          Ver catálogo
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="aspect-[180/255] w-full rounded-lg bg-appGroupBackground" />
              <div className="mt-2 h-3.5 w-3/4 rounded bg-appGroupBackground" />
              <div className="mt-1 h-3 w-1/2 rounded bg-appGroupBackground" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && hasError && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center">
          <p className="text-sm font-medium text-appText">
            Não foi possível carregar as novidades no momento.
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-md bg-appAccentCyan px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !hasError && visibleItems.length === 0 && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          Nenhuma novidade publicada no momento.
        </div>
      )}

      {!isLoading && !hasError && visibleItems.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {visibleItems.map((item) => (
            <article
              key={`${item.slugObra}-${item.slugCapitulo}`}
              className="group"
            >
              <Link
                href={getWorkDetailHref(item.tipoObra, item.slugObra)}
                className="block"
              >
                <div className="relative aspect-[180/255] w-full overflow-hidden rounded-lg border border-appCardBorder bg-appCardBackground shadow-sm transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Image
                    src={item.urlCapa}
                    alt={item.aliasObra}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 180px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-2 line-clamp-2 text-xs font-semibold leading-snug text-appText sm:text-[13px]">
                  {item.aliasObra}
                </h3>
                <p className="mt-0.5 text-[11px] text-appSubtitle">
                  {item.tipoObra}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
