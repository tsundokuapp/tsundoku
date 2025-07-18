'use client';
import React, { useEffect, useState } from 'react';

// import { HEIGHT_INSIDE_READER } from '@/helpers/systemValues';

import { PageSliderLeft } from './PageSliderLeft';
import { PageSliderRight } from './PageSliderRight';

interface PageSliderContainerProps {
  currentPage: number;
  minPages?: number;
  maxPages: number;
  steps: number;
  updatePageNumber: (setPage: number) => void;
}

export function PageSliderContainer({
  currentPage,
  maxPages,
  minPages = 1,
  steps = 1,
  updatePageNumber,
}: PageSliderContainerProps) {
  const [allowPreviousPage, setAllowPreviousPage] = useState(false);
  const [allowNextPage, setAllowNextPage] = useState(true);

  // observa o pressionar das setas para avançar ou retroceder páginas
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && allowPreviousPage) {
        updatePageNumber(currentPage - steps);
      }

      if (event.key === 'ArrowRight' && allowNextPage) {
        updatePageNumber(currentPage + steps);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, allowPreviousPage, allowNextPage, steps, updatePageNumber]);

  useEffect(() => {
    const previousPage = currentPage - steps;
    const nextPage = currentPage + steps;

    setAllowPreviousPage(previousPage >= minPages);
    setAllowNextPage(nextPage <= maxPages);
  }, [currentPage, minPages, maxPages, steps]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePreviousPage = () => {
    if (allowPreviousPage) {
      updatePageNumber(currentPage - steps);
    }
  };

  // TODO: verificar a lógica de steps para páginas duplas, atualmente parece que ele não consegue dar steps sufiencientes para a próxima página, testar com 3 steps para duplas.
  const handleNextPage = () => {
    if (allowNextPage) {
      updatePageNumber(currentPage + steps);
    }
  };

  return (
    <div
      className={`absolute grid h-[calc(100dvh-74px)] w-full grid-cols-2 grid-rows-1`}
    >
      <PageSliderLeft
        text="Página Anterior"
        isActive={allowPreviousPage}
        onClick={handlePreviousPage}
      />

      <PageSliderRight
        text="Próxima Página"
        isActive={allowNextPage}
        onClick={handleNextPage}
      />
    </div>
  );
}
