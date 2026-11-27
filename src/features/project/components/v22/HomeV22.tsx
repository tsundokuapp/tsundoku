import { BannerSupportV22 } from './BannerSupportV22';
import { BlogDaTsunV22 } from './BlogDaTsunV22';
import { NovidadesGridV22 } from './NovidadesGridV22';
import { RankingGridV22 } from './RankingGridV22';
import { HeroCarouselV21 } from '../v21/HeroCarouselV21';

export function HomeV22() {
  return (
    <div className="flex flex-col gap-8 pb-6">
      <HeroCarouselV21 />
      <BannerSupportV22 />
      <NovidadesGridV22 />
      <BlogDaTsunV22 />
      <RankingGridV22 />
    </div>
  );
}
