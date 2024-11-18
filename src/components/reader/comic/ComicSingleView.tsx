import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { PageSliderContainer } from '../utils/PageSlider/PageSliderContainer';

interface ComicSingleViewProps extends ComponentProps<'div'> {
  images: string[];
  showPage: number;
  updatePageNumber: (setPage: number) => void;
}

export function ComicSingleView({
  images,
  showPage,
  updatePageNumber,
  className,
}: ComicSingleViewProps) {
  return (
    <div
      className={twMerge('mt-4 flex items-center justify-center', className)}
    >
      <PageSliderContainer
        steps={1}
        maxPages={images.length}
        currentPage={showPage}
        updatePageNumber={updatePageNumber}
      />
      <div className="rounded-lg bg-white p-2 shadow-lg">
        <Image
          src={images[showPage - 1]}
          alt={`Página ${showPage - 1}`}
          width={557}
          height={800}
          className="h-full select-none object-contain"
        />
      </div>
    </div>
  );
}
