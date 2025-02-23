import Image from 'next/image';
import React, { useRef, useEffect, type ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface ComicInfiniteViewProps extends ComponentProps<'div'> {
  images: string[];
  updatePageNumber: (setPage: number) => void;
}

export function ComicInfiniteView({
  images,
  updatePageNumber,
  className,
}: ComicInfiniteViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAnyScrollAction = () => {
      const targetY = 73; // Posição 'alvo' para verificação da página

      images.forEach((_, index) => {
        const imageIndex = index + 1;
        const imageElement = document.getElementById(`page-${imageIndex}`);
        if (imageElement) {
          const rect = imageElement.getBoundingClientRect();

          if (rect.top <= targetY && rect.bottom > targetY) {
            updatePageNumber(imageIndex);
          }
        }
      });
    };

    window.addEventListener('scroll', handleAnyScrollAction);

    return () => {
      window.removeEventListener('scroll', handleAnyScrollAction);
    };
  }, [images, updatePageNumber]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'mb-8 flex h-full items-center justify-center overflow-y-auto',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        {images.map((src, index) => {
          const pageNumber = index + 1;
          return (
            <Image
              key={pageNumber}
              src={src}
              alt={`Página ${pageNumber}`}
              width={1114}
              height={1600}
              className="h-screen w-full select-none object-contain"
              id={`page-${pageNumber}`}
            />
          );
        })}
      </div>
    </div>
  );
}
