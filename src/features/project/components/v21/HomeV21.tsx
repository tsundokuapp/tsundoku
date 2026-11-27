'use client';

import { HeroCarouselV21 } from './HeroCarouselV21';
import { NovidadesShowcaseV21 } from './NovidadesShowcaseV21';
import { NovosPostsBentoV21 } from './NovosPostsBentoV21';
import { TsunRecommendationV21 } from './TsunRecommendationV21';

export function HomeV21() {
  return (
    <div className="mx-auto flex w-full max-w-[1260px] flex-col gap-10 pb-12 pt-4 sm:gap-14 sm:pt-8">
      <HeroCarouselV21 />
      <NovidadesShowcaseV21 />
      <TsunRecommendationV21 />
      <NovosPostsBentoV21 />
    </div>
  );
}
