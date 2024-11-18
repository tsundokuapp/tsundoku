'use client';
import React, { useState } from 'react';

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

  const previousPage = currentPage - steps;
  const nextPage = currentPage + steps;

  const handlePreviousPage = () => {
    if (previousPage >= minPages) {
      updatePageNumber(previousPage);
    }

    if (previousPage - 1 <= minPages) {
      setAllowPreviousPage(false);
    } else {
      setAllowPreviousPage(true);
      setAllowNextPage(true);
    }
  };

  const handleNextPage = () => {
    if (nextPage <= maxPages) {
      updatePageNumber(nextPage);
    }

    if (nextPage + 1 >= maxPages) {
      setAllowNextPage(false);
    } else {
      setAllowPreviousPage(true);
      setAllowNextPage(true);
    }
  };

  return (
    <div className="absolute grid h-full w-full grid-cols-2 grid-rows-1">
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
