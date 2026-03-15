import { Spinner } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useEffect, useRef, useState, type ComponentProps } from 'react';

import { IListImageComic } from '@/features/comics/api/types';
import { cn } from '@/shared/utils/cn';
import { HEIGHT_IMAGE_INSIDE_READER } from '@/shared/utils/systemValues';

import { PageSliderContainer } from '../../utils/PageSliderContainer';

interface ComicDoubleViewProps extends ComponentProps<'div'> {
  images: IListImageComic[];
  showPage: number;
  updatePageNumber: (setPage: number) => void;
}

export function ComicDoubleView({
  images,
  showPage,
  updatePageNumber,
  className,
}: ComicDoubleViewProps) {
  const [isWideSinglePage, setIsWideSinglePage] = useState<boolean[]>([]);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const preloadedPages = useRef<Set<number>>(new Set());

  const checkIsWideSinglePage = (width: number, height: number): boolean => {
    return width / height >= 1.35;
  };

  const getSpreadSize = (startIndex: number): number => {
    if (startIndex >= images.length) return 1;
    if (isWideSinglePage[startIndex]) return 1;
    if (isWideSinglePage[startIndex + 1]) return 1;
    return startIndex + 1 < images.length ? 2 : 1;
  };

  const getSpreadStarts = (): number[] => {
    const starts: number[] = [];
    let currentIndex = 0;

    while (currentIndex < images.length) {
      starts.push(currentIndex);
      currentIndex += getSpreadSize(currentIndex);
    }

    return starts;
  };

  const normalizeToSpreadStart = (pageIndex: number): number => {
    const safePageIndex = Math.max(0, Math.min(pageIndex, images.length - 1));
    const spreadStarts = getSpreadStarts();

    for (const spreadStart of spreadStarts) {
      const spreadEnd = spreadStart + getSpreadSize(spreadStart) - 1;
      if (safePageIndex >= spreadStart && safePageIndex <= spreadEnd) {
        return spreadStart;
      }
    }

    return spreadStarts[spreadStarts.length - 1] ?? 0;
  };

  useEffect(() => {
    setLoadedPages(new Set());
    preloadedPages.current = new Set();

    const loadImageFormats = async () => {
      const results = await Promise.all(
        images.map(
          (image) =>
            new Promise<boolean>((resolve) => {
              const img = new window.Image();
              img.src = image.url;
              img.onload = () =>
                resolve(checkIsWideSinglePage(img.width, img.height));
              img.onerror = () => resolve(false);
            }),
        ),
      );
      setIsWideSinglePage(results);
    };

    loadImageFormats();
  }, [images]);

  const spreadStarts = getSpreadStarts();
  const requestedLeftIndex = Math.max(showPage - 1, 0);
  const imgLeft = normalizeToSpreadStart(requestedLeftIndex);
  const spreadSize = getSpreadSize(imgLeft);
  const isSinglePage = spreadSize === 1;
  const imgRight = spreadSize === 2 ? imgLeft + 1 : null;
  const currentPageForSlider = imgLeft + 1;

  const handleSpreadNavigation = (requestedPage: number) => {
    const currentSpreadIndex = spreadStarts.indexOf(imgLeft);

    if (currentSpreadIndex < 0) {
      const normalizedStart = normalizeToSpreadStart(requestedPage - 1);
      updatePageNumber(normalizedStart + 1);
      return;
    }

    if (requestedPage > currentPageForSlider) {
      const nextSpreadStart =
        spreadStarts[Math.min(currentSpreadIndex + 1, spreadStarts.length - 1)];
      updatePageNumber(nextSpreadStart + 1);
      return;
    }

    if (requestedPage < currentPageForSlider) {
      const previousSpreadStart =
        spreadStarts[Math.max(currentSpreadIndex - 1, 0)];
      updatePageNumber(previousSpreadStart + 1);
      return;
    }

    updatePageNumber(currentPageForSlider);
  };
  const handleImageLoaded = (pageIndex: number) => {
    setLoadedPages((prevState) => {
      if (prevState.has(pageIndex)) return prevState;
      const nextState = new Set(prevState);
      nextState.add(pageIndex);
      return nextState;
    });
  };

  useEffect(() => {
    const currentSpreadIndex = spreadStarts.indexOf(imgLeft);
    const nextSpreadStart =
      currentSpreadIndex >= 0
        ? spreadStarts[currentSpreadIndex + 1]
        : undefined;
    const nextLeftIndex = nextSpreadStart ?? imgLeft + spreadSize;
    const nextIndexes = [nextLeftIndex, nextLeftIndex + 1];

    nextIndexes.forEach((pageIndex) => {
      const imageUrl = images[pageIndex]?.url;
      if (!imageUrl || preloadedPages.current.has(pageIndex)) {
        return;
      }

      preloadedPages.current.add(pageIndex);
      const preloadImage = new window.Image();
      preloadImage.src = imageUrl;
      preloadImage.onload = () => handleImageLoaded(pageIndex);
    });
  }, [images, imgLeft, spreadSize, spreadStarts]);

  if (!images.length || !images[imgLeft]) {
    return (
      <div className={cn('flex h-full items-center justify-center', className)}>
        <p className="text-gray-500">Capítulo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <PageSliderContainer
        steps={1}
        minPages={1}
        maxPages={images.length}
        currentPage={currentPageForSlider}
        updatePageNumber={handleSpreadNavigation}
      />
      <div className="flex items-center justify-center rounded-lg bg-white p-2 shadow-lg">
        <div key={`left-${imgLeft}`} className="relative">
          {!loadedPages.has(imgLeft) && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5">
              <Spinner size={28} className="animate-spin text-zinc-700" />
            </div>
          )}
          <Image
            key={`left-image-${images[imgLeft].id}`}
            src={images[imgLeft].url}
            alt={`Página ${imgLeft + 1}`}
            width={557}
            height={800}
            onLoad={() => handleImageLoaded(imgLeft)}
            className={cn(
              `h-dvh max-h-[${HEIGHT_IMAGE_INSIDE_READER}] w-[100%] select-none transition-opacity duration-200`,
              loadedPages.has(imgLeft) ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>

        {!isSinglePage && imgRight !== null && (
          <div key={`right-${imgRight}`} className="relative">
            {!loadedPages.has(imgRight) && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5">
                <Spinner size={28} className="animate-spin text-zinc-700" />
              </div>
            )}
            <Image
              key={`right-image-${images[imgRight].id}`}
              src={images[imgRight].url}
              alt={`Página ${imgRight + 1}`}
              width={557}
              height={800}
              onLoad={() => handleImageLoaded(imgRight)}
              className={cn(
                `h-dvh max-h-[${HEIGHT_IMAGE_INSIDE_READER}] w-[100%] select-none transition-opacity duration-200`,
                loadedPages.has(imgRight) ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
