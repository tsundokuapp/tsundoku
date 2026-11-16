'use client';

import Image from 'next/image';

import { useHomeRanking } from '@/features/ranking/hooks/useHomeRanking';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export function RankingGridV22() {
  const { entries, isLoading, isError, isFixture, unavailableReason } =
    useHomeRanking(8);

  return (
    <section aria-labelledby="v22-ranking-heading" className="w-full pb-2">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="v22-ranking-heading"
          className="text-lg font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Ranking
        </h2>
        {isFixture && (
          <span className="rounded-full border border-appCardBorder bg-appCardBackground px-2.5 py-0.5 text-[11px] text-appSubtitle">
            Fixtures dev (aguardando API de Ranking)
          </span>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="flex animate-pulse items-center gap-3.5">
              <div className="h-14 w-14 shrink-0 rounded-full bg-appGroupBackground" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-appGroupBackground" />
                <div className="h-3 w-24 rounded bg-appGroupBackground" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appText">
          Não foi possível carregar o ranking de apoiadores.
        </div>
      )}

      {!isLoading && !isError && entries.length === 0 && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          {unavailableReason ?? 'Ranking indisponível no momento.'}
        </div>
      )}

      {!isLoading && !isError && entries.length > 0 && (
        <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-3.5">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-appCardBorder bg-appCardBackground">
                <Image
                  src={entry.avatarUrl}
                  alt={entry.displayName}
                  fill
                  sizes="56px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-appText">
                  {entry.displayName}
                </p>
                <p className="truncate text-xs text-appSubtitle">
                  {entry.badgeLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
