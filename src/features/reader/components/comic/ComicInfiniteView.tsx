import { Spinner } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import React, {
  useRef,
  useEffect,
  useState,
  type ComponentProps,
  useCallback,
} from 'react';

import { IListImageComic } from '@/features/comics/api/types';
import { cn } from '@/shared/utils/cn';

interface ComicInfiniteViewProps extends ComponentProps<'div'> {
  images: IListImageComic[];
  updatePageNumber: (setPage: number) => void;
}

export function ComicInfiniteView({
  images,
  updatePageNumber,
  className,
}: ComicInfiniteViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedImageIds, setLoadedImageIds] = useState<Set<number>>(new Set());

  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const page = entry.target.getAttribute('data-page');
          if (page) {
            updatePageNumber(Number(page));
          }
        }
      }
    },
    [updatePageNumber],
  );

  useEffect(() => {
    setLoadedImageIds(new Set());

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6,
    });

    const targets = containerRef.current?.querySelectorAll('[data-page]');
    targets?.forEach((el) => observer.current?.observe(el));

    return () => {
      observer.current?.disconnect();
    };
  }, [images, handleIntersect]);

  const handleImageLoaded = useCallback((imageId: number) => {
    setLoadedImageIds((prevState) => {
      if (prevState.has(imageId)) return prevState;
      const nextState = new Set(prevState);
      nextState.add(imageId);
      return nextState;
    });
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Capítulo não encontrado.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'mb-8 flex h-full items-center justify-center overflow-y-auto',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        {images.map((img, index) => {
          const isLoaded = loadedImageIds.has(img.id);

          return (
            <div
              key={img.id}
              data-page={index + 1}
              className="relative flex min-h-screen items-center justify-center"
            >
              {!isLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5">
                  <Spinner size={28} className="animate-spin text-white" />
                </div>
              )}
              <Image
                // verificar se é necessário o uso de blurDataURL
                // placeholder="blur"
                // blurDataURL="https://tsundoku.com.br/wp-content/uploads/2022/01/TsunBranca.png"
                priority={true}
                key={img.id}
                src={img.url}
                alt={`Página ${img.alt}`}
                width={1114}
                height={1600}
                onLoad={() => handleImageLoaded(img.id)}
                className={cn(
                  'h-screen w-full select-none object-contain transition-opacity duration-200',
                  isLoaded ? 'opacity-100' : 'opacity-0',
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
