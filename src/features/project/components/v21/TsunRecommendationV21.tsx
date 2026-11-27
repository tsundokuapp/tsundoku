'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { IProjectRecomendations } from '@/features/project/api/types';
import { useRecomendations } from '@/features/project/hooks/useProject';
import { unwrapApiArrayResult } from '@/features/project/utils/unwrapApiResult';
import { getWorkDetailHref } from '@/features/project/utils/workRoutes';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export function TsunRecommendationV21() {
  const { data, isLoading, isError, refetch } = useRecomendations();
  const [activeIndex, setActiveIndex] = useState(0);

  const { items, isApiPayloadError } = useMemo(
    () => unwrapApiArrayResult<IProjectRecomendations>(data),
    [data],
  );
  const hasError = isError || isApiPayloadError;
  const safeIndex = items.length > 0 ? activeIndex % items.length : 0;
  const activeItem = items[safeIndex];

  return (
    <section aria-labelledby="v21-recomendacao-heading" className="w-full">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="v21-recomendacao-heading"
          className="text-base font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Recomendação da Tsun
        </h2>

        {items.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Recomendação anterior"
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + items.length) % items.length,
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Próxima recomendação"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % items.length)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="flex animate-pulse flex-row gap-4 rounded-xl border border-appCardBorder bg-appCardBackground p-4 lg:gap-9 lg:p-6">
          <div className="h-[180px] w-[120px] shrink-0 rounded-[12px] bg-appGroupBackground lg:h-[420px] lg:w-[300px]" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 rounded bg-appGroupBackground" />
            <div className="h-4 w-full rounded bg-appGroupBackground" />
            <div className="h-4 w-5/6 rounded bg-appGroupBackground" />
          </div>
        </div>
      )}

      {!isLoading && hasError && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center">
          <p className="text-sm font-medium text-appText">
            Não foi possível carregar as recomendações da Tsun.
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

      {!isLoading && !hasError && !activeItem && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          Nenhuma recomendação disponível no momento.
        </div>
      )}

      {!isLoading && !hasError && activeItem && (
        <div className="flex flex-row items-start gap-4 sm:gap-6 lg:gap-10">
          <Link
            href={getWorkDetailHref(activeItem.tipoObra, activeItem.slugObra)}
            className="relative h-[180px] w-[120px] shrink-0 overflow-hidden rounded-[8px] border border-appCardBorder bg-appCardBackground shadow-md transition-transform hover:scale-[1.01] sm:h-[280px] sm:w-[200px] lg:h-[460px] lg:w-[345px] lg:rounded-[16px]"
          >
            <Image
              src={activeItem.capa}
              alt={activeItem.titulo}
              fill
              sizes="(max-width: 640px) 120px, (max-width: 1024px) 200px, 345px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              className="object-cover"
            />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <Link
              href={getWorkDetailHref(activeItem.tipoObra, activeItem.slugObra)}
              className="text-sm font-bold text-appTitle hover:text-appAccentCyan sm:text-xl lg:text-2xl"
            >
              {activeItem.titulo}
            </Link>

            <div className="text-justify text-xs leading-relaxed text-appText sm:text-sm lg:text-[15px]">
              <span className="font-bold text-appTitle sm:text-base lg:text-lg">
                Sinopse:{' '}
              </span>
              <span className="whitespace-pre-line">
                {activeItem.sinopse || 'Sinopse não cadastrada para esta obra.'}
              </span>
            </div>

            <div className="pt-2">
              <Link
                href={getWorkDetailHref(
                  activeItem.tipoObra,
                  activeItem.slugObra,
                )}
                className="inline-flex items-center rounded-[4px] bg-appAccentCyan px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 sm:text-sm"
              >
                Acessar obra
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
