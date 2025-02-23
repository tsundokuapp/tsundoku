import Image from 'next/image';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

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
  const imgLeft = showPage - 1;
  const imgRight = showPage;

  return (
    <div
      className={twMerge('mt-4 flex items-center justify-center', className)}
    >
      <PageSliderContainer
        steps={2}
        minPages={1}
        maxPages={images.length}
        currentPage={imgRight}
        updatePageNumber={updatePageNumber}
      />
      <div className="flex items-center justify-center rounded-lg bg-white p-2 shadow-lg">
        <Image
          src={images[imgLeft]}
          alt={`Página ${imgLeft}`}
          width={557}
          height={800}
          className="h-full select-none object-contain"
        />

        {showPage < images.length && (
          <Image
            src={images[imgRight]}
            alt={`Página ${imgRight}`}
            width={557}
            height={800}
            className="h-full select-none object-contain"
          />
        )}
      </div>
    </div>
  );
}

/*
PONTO DE MELHORIA:
- ADICIONAR SISTEMA DE LAZY LOAD
- VERIFICAR FUNCIONAMENTO COM IMAGENS IMPARES
*/
