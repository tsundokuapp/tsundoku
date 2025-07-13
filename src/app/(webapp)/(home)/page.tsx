// Color Checked
// Components Checked
import { BannerAds } from '@/components/banners/bannerAds';
import { BannerRecruitment } from '@/components/banners/bannerRecruitment';
import { NewProjectsList } from '@/components/projectsList/newProjectsList';
import { UpdatedProjectsList } from '@/components/projectsList/updatedProjectsList';

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
