import { NewProjectsList } from '@/features/project/components/projectsList/newProjectsList';
import { UpdatedProjectsList } from '@/features/project/components/projectsList/updatedProjectsList';
import { BannerAds } from '@/shared/components/ui/banners/bannerAds';
import { BannerRecruitment } from '@/shared/components/ui/banners/bannerRecruitment';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 sm:gap-12">
      <div className="flex flex-wrap justify-between gap-4 sm:flex-row lg:flex-nowrap">
        <BannerAds />
        <BannerRecruitment />
      </div>

      <NewProjectsList />

      <UpdatedProjectsList />
    </div>
  );
}
