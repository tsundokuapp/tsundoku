import { Spinner } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useEffect, useState, type ComponentProps } from 'react';

// import { HEIGHT_IMAGE_INSIDE_READER } from '@/helpers/systemValues';
import { IListImageComic } from '@/features/comics/api/types';
import { cn } from '@/shared/utils/cn';

import { PageSliderContainer } from '../../utils/PageSliderContainer';

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
  const [loadedImageUrls, setLoadedImageUrls] = useState<Set<string>>(
    new Set(),
  );

  const hasImages = !!images && images.length > 0;
  const imageArray = hasImages ? images.map((image) => image.url) : [];
  const currentImage = imageArray[showPage - 1];
  const nextImage = imageArray[showPage];
  const isCurrentImageLoaded = currentImage
    ? loadedImageUrls.has(currentImage)
    : false;

  useEffect(() => {
    if (!nextImage || loadedImageUrls.has(nextImage)) {
      return;
    }

    const preloadImage = new window.Image();
    preloadImage.src = nextImage;
    preloadImage.onload = () => {
      setLoadedImageUrls((prevState) => {
        if (prevState.has(nextImage)) return prevState;
        const nextState = new Set(prevState);
        nextState.add(nextImage);
        return nextState;
      });
    };
  }, [nextImage, loadedImageUrls]);

  if (!hasImages || !currentImage) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Capítulo não encontrado.</p>
      </div>
    );
  }

  const handleImageLoaded = (imageUrl: string) => {
    setLoadedImageUrls((prevState) => {
      if (prevState.has(imageUrl)) return prevState;
      const nextState = new Set(prevState);
      nextState.add(imageUrl);
      return nextState;
    });
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <PageSliderContainer
        steps={1}
        maxPages={images.length || 40}
        currentPage={showPage}
        updatePageNumber={updatePageNumber}
      />
      <div className="relative rounded-lg bg-white p-2 shadow-lg">
        {!isCurrentImageLoaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/5">
            <Spinner size={28} className="animate-spin text-zinc-700" />
          </div>
        )}
        <Image
          src={currentImage}
          alt={`Página ${showPage - 1}`}
          width={557}
          height={800}
          onLoad={() => handleImageLoaded(currentImage)}
          className={cn(
            'h-dvh max-h-[calc(100vh-110px)] w-[100%] select-none transition-opacity duration-200',
            isCurrentImageLoaded ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>
    </div>
  );
}
