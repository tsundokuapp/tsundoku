import Image from 'next/image';
import type { ComponentProps } from 'react';

import { IListImageComic } from '@/@types/Api';
// import { HEIGHT_IMAGE_INSIDE_READER } from '@/helpers/systemValues';
import { cn } from '@/helpers/twUtils';

import { PageSliderContainer } from '../utils/PageSlider/PageSliderContainer';

interface ComicSingleViewProps extends ComponentProps<'div'> {
  images: IListImageComic[];
  showPage: number;
  updatePageNumber: (setPage: number) => void;
}

export function ComicSingleView({
  images,
  showPage,
  updatePageNumber,
  className,
}: ComicSingleViewProps) {
  if (!images || images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Capítulo não encontrado.</p>
      </div>
    );
  }

  const imageArray = images.map((image) => image.url);

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <PageSliderContainer
        steps={1}
        maxPages={images.length || 40}
        currentPage={showPage}
        updatePageNumber={updatePageNumber}
      />
      <div className="rounded-lg bg-white p-2 shadow-lg">
        <Image
          src={imageArray[showPage - 1]}
          alt={`Página ${showPage - 1}`}
          width={557}
          height={800}
          className={`h-dvh max-h-[calc(100vh-110px)] w-[100%] select-none`}
        />
      </div>
    </div>
  );
}
