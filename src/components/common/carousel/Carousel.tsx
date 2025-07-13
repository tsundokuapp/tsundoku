'use client';
// Color Checked
import {
  ArrowCircleLeft,
  ArrowCircleRight,
} from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/helpers/twUtils';

interface CarouselProps {
  images: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  navigation?: boolean;
  className?: string;
}

export const Carousel = ({
  images,
  autoSlide = true,
  autoSlideInterval = 3000,
  navigation = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoSlideInterval);
      return () => clearInterval(slideInterval);
    }
  }, [autoSlide, autoSlideInterval, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };
  return (
    <div className="relative w-full">
      <div className="relative h-72 w-full overflow-hidden rounded-md sm:h-64 sm:rounded-3xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              `absolute inset-0 w-full translate-x-full transform transition-transform duration-500`,
              {
                'translate-x-0': index === currentIndex,
              },
            )}
          >
            <Image
              height={300}
              width={350}
              src={image}
              alt={`Slide ${index}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {navigation && (
        <>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 text-appButtonText"
            onClick={prevSlide}
            aria-label="previous"
            data-testid="previous-button"
          >
            <ArrowCircleLeft size={24} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 text-appButtonText"
            onClick={nextSlide}
            aria-label="next"
            data-testid="next-button"
          >
            <ArrowCircleRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
