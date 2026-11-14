'use client';

import {
  BookmarkSimple,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { IProjectsHome } from '@/features/project/api/types';
import { useProjects } from '@/features/project/hooks/useProject';
import { unwrapApiArrayResult } from '@/features/project/utils/unwrapApiResult';
import {
  getReaderChapterHref,
  getWorkDetailHref,
} from '@/features/project/utils/workRoutes';
import { cn } from '@/shared/utils/cn';
import { BLUR_DATA_URL } from '@/shared/utils/image';

function getDisplayVolume(item: IProjectsHome): string {
  return item.numeroVolume?.trim() || 'Único';
}

function getDisplayChapterLabel(item: IProjectsHome): string {
  const num = item.numeroCapitulo?.trim();
  const part = item.parteCapitulo?.trim();
  if (!num) return 'Ler agora';
  return part ? `Capítulo ${num}.${part}` : `Capítulo ${num}`;
}

export function NovidadesShowcaseV21() {
  const { data, isLoading, isError, refetch } = useProjects();
  const [spotlightOffset, setSpotlightOffset] = useState(0);

  const { items, isApiPayloadError } = useMemo(
    () => unwrapApiArrayResult<IProjectsHome>(data),
    [data],
  );
  const hasError = isError || isApiPayloadError;

  const desktopSlots = useMemo(() => {
    if (items.length === 0)
      return { slots: [] as IProjectsHome[], centerPos: 0 };
    if (items.length <= 5) {
      const centerPos = Math.floor(items.length / 2);
      return { slots: items, centerPos };
    }

    const rotated: IProjectsHome[] = [];
    for (let i = 0; i < 5; i += 1) {
      const idx = (spotlightOffset + i) % items.length;
      rotated.push(items[idx]);
    }
    return { slots: rotated, centerPos: 2 };
  }, [items, spotlightOffset]);

  const handleShiftPrev = () => {
    if (items.length === 0) return;
    setSpotlightOffset((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleShiftNext = () => {
    if (items.length === 0) return;
    setSpotlightOffset((prev) => (prev + 1) % items.length);
  };

  return (
    <section aria-labelledby="v21-novidades-heading" className="w-full">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="v21-novidades-heading"
          className="text-base font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Novidades na Tsundoku
        </h2>

        {items.length > 5 && (
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={handleShiftPrev}
              aria-label="Novidade anterior"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              onClick={handleShiftNext}
              aria-label="Próxima novidade"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-appCardBorder bg-appCardBackground text-appText hover:bg-appGroupBackground"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div
          aria-busy="true"
          className="grid grid-cols-3 gap-2.5 lg:grid-cols-5 lg:gap-6"
        >
          {[0, 1, 2, 3, 4].map((skeleton) => (
            <div
              key={skeleton}
              className={cn(
                'animate-pulse rounded-[12px] border border-appCardBorder bg-appCardBackground p-3 lg:rounded-[25px]',
                skeleton > 2 && 'hidden lg:block',
              )}
            >
              <div className="aspect-[3/4] w-full rounded-[8px] bg-appGroupBackground" />
              <div className="mt-3 h-4 w-3/4 rounded bg-appGroupBackground" />
              <div className="mt-2 h-3 w-1/2 rounded bg-appGroupBackground" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && hasError && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center">
          <p className="text-sm font-medium text-appText">
            Não foi possível carregar as novidades do catálogo.
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

      {!isLoading && !hasError && items.length === 0 && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          Nenhuma novidade publicada no momento.
        </div>
      )}

      {!isLoading && !hasError && items.length > 0 && (
        <>
          {/* Mobile grid 3 columns matching frame 1321:35435 */}
          <div className="grid grid-cols-3 gap-2.5 lg:hidden">
            {items.slice(0, 6).map((item) => {
              const detailHref = getWorkDetailHref(
                item.tipoObra,
                item.slugObra,
              );
              const chapterHref = getReaderChapterHref(
                item.tipoObra,
                item.slugObra,
                item.slugCapitulo,
              );
              return (
                <article
                  key={`${item.slugObra}-${item.slugCapitulo}-mobile`}
                  className="flex flex-col rounded-[8px] border border-appCardBorder bg-appCardBackground p-2 shadow-sm"
                >
                  <Link href={detailHref} className="block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px] bg-appGroupBackground">
                      <Image
                        src={item.urlCapa}
                        alt={item.aliasObra}
                        fill
                        sizes="120px"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 truncate text-[10px] font-semibold text-appTitle">
                      {item.aliasObra}
                    </h3>
                  </Link>
                  <p className="mt-1 truncate text-[9px] text-appSubtitle">
                    <span className="font-medium text-appText">Autor: </span>
                    {item.autorObra || 'Equipe Tsundoku'}
                  </p>
                  <p className="truncate text-[9px] text-appSubtitle">
                    <span className="font-medium text-appText">Volume: </span>
                    {getDisplayVolume(item)}
                  </p>
                  <Link
                    href={chapterHref}
                    className="mt-1.5 rounded bg-appAccentCyan px-1.5 py-0.5 text-center text-[9px] font-bold text-white hover:opacity-90"
                  >
                    {getDisplayChapterLabel(item)}
                  </Link>
                </article>
              );
            })}
          </div>

          {/* Desktop 5-card spotlight grid matching frame 1024:340 */}
          <div className="hidden items-center gap-5 lg:grid lg:grid-cols-5">
            {desktopSlots.slots.map((item, idx) => {
              const detailHref = getWorkDetailHref(
                item.tipoObra,
                item.slugObra,
              );
              const chapterHref = getReaderChapterHref(
                item.tipoObra,
                item.slugObra,
                item.slugCapitulo,
              );
              const isSpotlight = idx === desktopSlots.centerPos;

              if (isSpotlight) {
                return (
                  <article
                    key={`${item.slugObra}-${item.slugCapitulo}-spotlight`}
                    data-testid="v21-spotlight-card"
                    className="flex flex-col overflow-hidden rounded-[16px] border border-appCardBorder bg-appCardBackground shadow-[0_5px_15px_5px_rgba(0,0,0,0.35)]"
                  >
                    <Link
                      href={detailHref}
                      className="block px-5 pb-3 pt-6 transition-opacity hover:opacity-95"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[8px] bg-appGroupBackground">
                        <Image
                          src={item.urlCapa}
                          alt={item.aliasObra}
                          fill
                          sizes="240px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <Link
                      href={detailHref}
                      className="flex min-h-[58px] items-center justify-between gap-2 bg-appAccentCyan px-4 py-2.5 text-white transition-opacity hover:opacity-95"
                    >
                      <span className="line-clamp-2 text-sm font-bold leading-tight">
                        {item.aliasObra}
                      </span>
                      <BookmarkSimple
                        size={20}
                        weight="fill"
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    </Link>

                    <div className="flex flex-col gap-3 px-5 py-4">
                      <div className="space-y-1 text-xs">
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-bold text-appTitle">
                            Autor:
                          </span>
                          <span className="truncate font-bold text-appAccentCyan">
                            {item.autorObra || 'Equipe Tsundoku'}
                          </span>
                        </p>
                        <p className="flex items-center justify-between gap-2">
                          <span className="font-bold text-appTitle">
                            Volume:
                          </span>
                          <span className="font-bold text-appAccentCyan">
                            {getDisplayVolume(item)}
                          </span>
                        </p>
                      </div>

                      <Link
                        href={chapterHref}
                        className="block w-full rounded-[4px] bg-appAccentCyan py-1.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
                      >
                        {getDisplayChapterLabel(item)}
                      </Link>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={`${item.slugObra}-${item.slugCapitulo}-side-${idx}`}
                  className="flex flex-col rounded-[25px] border border-appCardBorder bg-appCardBackground p-4 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <Link href={detailHref} className="block">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[10px] bg-appGroupBackground">
                      <Image
                        src={item.urlCapa}
                        alt={item.aliasObra}
                        fill
                        sizes="210px"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 truncate text-base font-medium text-appTitle">
                      {item.aliasObra}
                    </h3>
                  </Link>

                  <div className="mt-2 space-y-1 text-xs">
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-appTitle">Autor:</span>
                      <span className="truncate text-appSubtitle">
                        {item.autorObra || 'Equipe Tsundoku'}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-appTitle">Volume:</span>
                      <span className="text-appSubtitle">
                        {getDisplayVolume(item)}
                      </span>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
