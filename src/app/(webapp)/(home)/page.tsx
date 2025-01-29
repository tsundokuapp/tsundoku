import { Banner } from '@/components/common/banner/Banner';
import { Carousel } from '@/components/common/carousel/Carousel';

import { SectinoNews } from './SectionNews';
import { SectionProjects } from './SectionProjects';

export default function Home() {
  const imagesArray = [
    '/banner-elaina.jpg',
    '/banner-emilia.jpg',
    '/banner-bocchi.jpg',
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-row flex-wrap justify-between gap-4">
        <Carousel images={imagesArray} autoSlideInterval={5000} />

        <Banner image={'/recrutamento-editor.png'} />
      </div>

      <SectinoNews />

      <SectionProjects />
    </div>
  );
}
