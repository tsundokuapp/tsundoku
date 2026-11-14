'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { cn } from '@/shared/utils/cn';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export interface HeroSlideItem {
  id: string;
  image: string;
  alt: string;
  href: string;
}

const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'elaina',
    image: '/banner-elaina.jpg',
    alt: 'Bruxa Errante - A Jornada de Elaina',
    href: '/novels',
  },
  {
    id: 'emilia',
    image: '/banner-emilia.jpg',
    alt: 'Re:Zero / Destaques Light Novels',
    href: '/novels',
  },
  {
    id: 'bocchi',
    image: '/banner-bocchi.jpg',
    alt: 'Bocchi the Rock! - Catálogo de Comics',
    href: '/comics',
  },
];

interface HeroCarouselV21Props {
  slides?: HeroSlideItem[];
  className?: string;
}

export function HeroCarouselV21({
  slides = DEFAULT_HERO_SLIDES,
  className,
}: HeroCarouselV21Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[activeIndex] ?? slides[0];
  if (!currentSlide) return null;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      aria-label="Destaques"
      className={cn('relative w-full overflow-hidden rounded-[8px]', className)}
    >
      <Link
        href={currentSlide.href}
        className="relative block h-[120px] w-full overflow-hidden rounded-[8px] bg-appCardBackground sm:h-[220px] lg:h-[300px]"
      >
        <Image
          src={currentSlide.image}
          alt={currentSlide.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1180px"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="object-cover transition-transform duration-500 hover:scale-[1.01]"
        />
      </Link>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo slide"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75"
          >
            <CaretRight size={18} weight="bold" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir para slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  index === activeIndex
                    ? 'w-5 bg-appAccentCyan'
                    : 'w-2 bg-white/60 hover:bg-white/90',
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
