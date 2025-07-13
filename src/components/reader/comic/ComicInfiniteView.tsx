import Image from 'next/image';
import React, {
  useRef,
  useEffect,
  type ComponentProps,
  useCallback,
} from 'react';

import { IListImageComic } from '@/@types/Api';
import { cn } from '@/helpers/twUtils';

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
          return (
            <div key={img.id} data-page={index + 1}>
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
                className="h-screen w-full select-none object-contain"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
