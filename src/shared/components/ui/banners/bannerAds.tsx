import type { ComponentProps } from 'react';

import { Carousel } from '../carousel/Carousel';

interface BannerAdsProps extends ComponentProps<'div'> {
  className?: string;
}

export function BannerAds({ className, ...props }: BannerAdsProps) {
  const imagesArray = [
    '/banner-elaina.jpg',
    '/banner-emilia.jpg',
    '/banner-bocchi.jpg',
  ];
  return (
    <Carousel
      className={className}
      images={imagesArray}
      autoSlideInterval={5000}
      {...props}
    />
  );
}
