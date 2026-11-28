import { HeroCarousel } from '@/features/project/components/HeroCarousel';
import { BannerSupport } from '@/features/project/components/home/BannerSupport';
import { BlogDaTsun } from '@/features/project/components/home/BlogDaTsun';
import { NovidadesGrid } from '@/features/project/components/home/NovidadesGrid';
import { RankingGrid } from '@/features/project/components/home/RankingGrid';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-6">
      <HeroCarousel />
      <BannerSupport />
      <NovidadesGrid />
      <BlogDaTsun />
      <RankingGrid />
    </div>
  );
}
