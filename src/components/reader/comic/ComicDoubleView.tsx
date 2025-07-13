import Image from 'next/image';
import { useEffect, useState, type ComponentProps } from 'react';

import { HEIGHT_IMAGE_INSIDE_READER } from '@/helpers/systemValues';
import { cn } from '@/helpers/twUtils';

import { PageSliderContainer } from '../utils/PageSlider/PageSliderContainer';

interface ComicDoubleViewProps extends ComponentProps<'div'> {
  images: string[];
  showPage: number;
  updatePageNumber: (setPage: number) => void;
}

export function ComicDoubleView({
  images,
  showPage,
  updatePageNumber,
  className,
}: ComicDoubleViewProps) {
  const [isLandscape, setIsLandscape] = useState<boolean[]>([]);

  useEffect(() => {
    const loadImageFormats = async () => {
      const results = await Promise.all(
        images.map(
          (src) =>
            new Promise<boolean>((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = () => resolve(img.width > img.height);
              img.onerror = () => resolve(false);
            }),
        ),
      );
      setIsLandscape(results);
    };

    loadImageFormats();
  }, [images]);

  const isSinglePage = isLandscape[showPage - 1] ?? false;
  const imgLeft = showPage - 1;
  const imgRight = isSinglePage ? null : showPage;

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <PageSliderContainer
        steps={isSinglePage ? 1 : 2}
        minPages={1}
        maxPages={images.length}
        currentPage={imgRight ?? imgLeft}
        updatePageNumber={updatePageNumber}
      />
      <div className="flex items-center justify-center rounded-lg bg-white p-2 shadow-lg">
        <Image
          src={images[imgLeft]}
          alt={`Página ${imgLeft}`}
          width={557}
          height={800}
          className={`h-dvh max-h-[${HEIGHT_IMAGE_INSIDE_READER}] w-[100%] select-none`}
        />

        {!isSinglePage && imgRight !== null && showPage < images.length && (
          <Image
            src={images[imgRight]}
            alt={`Página ${imgRight}`}
            width={557}
            height={800}
            className={`h-dvh max-h-[${HEIGHT_IMAGE_INSIDE_READER}] w-[100%] select-none`}
          />
        )}
      </div>
    </div>
  );
}
