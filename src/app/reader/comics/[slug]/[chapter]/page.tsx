'use client';
import React, { useState, useRef } from 'react';

import type { ScrollMode } from '@/@types/ScrollMode';
import { ActionsBarContainer } from '@/components/reader/ActionsBarContainer';
import { ReaderContainer } from '@/components/reader/ReaderContainer';
import { ActionChapterList } from '@/components/reader/actions/ActionChapterList';
import { ActionPageList } from '@/components/reader/actions/ActionPageList';
import { ActionScrollModeList } from '@/components/reader/actions/ActionScrollModeList';
import { ComicDoubleView } from '@/components/reader/comic/ComicDoubleView';
import { ComicInfiniteView } from '@/components/reader/comic/ComicInfiniteView';
import { ComicSingleView } from '@/components/reader/comic/ComicSingleView';
import { ProgressBar } from '@/components/reader/utils/ProgressBar';
import { fakeComicChapter } from '@/fakeApi/comicChapter';

interface ComicReaderProps {
  params: {
    champter: string;
  };
  images: string[];
}

export default function ComicReader({ images }: ComicReaderProps) {
  images = fakeComicChapter.images;

  const comicContainerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [scrollMode, setScrollMode] = useState<ScrollMode>('infinite');

  const handleScrollModeChange = (mode: ScrollMode) => {
    setScrollMode(mode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollMode === 'infinite' && comicContainerRef.current) {
      const targetElement = comicContainerRef.current.querySelector(
        `#page-${page}`,
      );
      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const handlePageOnRead = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div ref={comicContainerRef} className="relative">
      <ActionsBarContainer>
        <ActionChapterList totalChapters={67} />
        <ActionPageList
          totalPages={images.length}
          showPage={currentPage}
          scrollMode={scrollMode}
          onPageChange={handlePageChange}
        />
        <ActionScrollModeList onScrollModeChange={handleScrollModeChange} />
      </ActionsBarContainer>

      <ReaderContainer data-view-mode={scrollMode} className="group">
        <ComicInfiniteView
          images={images}
          updatePageNumber={handlePageOnRead}
          className="hidden group-data-[view-mode=infinite]:flex"
        />
        <ComicSingleView
          images={images}
          showPage={currentPage}
          updatePageNumber={handlePageOnRead}
          className="hidden group-data-[view-mode=single]:flex"
        />
        <ComicDoubleView
          images={images}
          showPage={currentPage}
          updatePageNumber={handlePageOnRead}
          className="hidden group-data-[view-mode=double]:flex"
        />
      </ReaderContainer>

      <ProgressBar
        totalSteps={images.length}
        progressStep={currentPage}
        scrollMode={scrollMode}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
