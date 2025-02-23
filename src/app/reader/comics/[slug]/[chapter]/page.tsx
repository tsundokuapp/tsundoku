'use client';
import React, { useState, useRef, useEffect } from 'react';

import type { ScrollMode } from '@/@types/ScrollMode';
import { ActionsBarContainer } from '@/components/reader/ActionsBarContainer';
import { ReaderContainer } from '@/components/reader/ReaderContainer';
import { ActionChapterList } from '@/components/reader/actions/ActionChapterList';
import { ActionPageList } from '@/components/reader/actions/ActionPageList';
import { ActionScrollModeList } from '@/components/reader/actions/ActionScrollModeList';
import { ComicDoubleView } from '@/components/reader/comic/ComicDoubleView';
import { ComicInfiniteView } from '@/components/reader/comic/ComicInfiniteView';
import { ComicSingleView } from '@/components/reader/comic/ComicSingleView';
import { ReaderProgressBar } from '@/components/reader/utils/ReaderProgressBar';
import { fakeComicChapter } from '@/fakeApi/comicChapter';
import { ScrollPage } from '@/helpers/ScrollPage';

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
    ScrollPage(scrollMode, comicContainerRef, page);
  };

  const handlePageOnRead = (page: number) => {
    setCurrentPage(page);
  };

  // Corrigir modo de rolagem duplo quando currentPage é par
  useEffect(() => {
    if (scrollMode === 'double' && currentPage % 2 === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [scrollMode, currentPage]);

  // Rolagem para a página atual quando o modo de rolagem muda
  useEffect(() => {
    if (scrollMode === 'infinite' && comicContainerRef.current) {
      ScrollPage(scrollMode, comicContainerRef, currentPage, 'instant');
    }
  }, [scrollMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={comicContainerRef} className="relative">
      <ActionsBarContainer sufixList={['Capítulo']} removeList={['reader']}>
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

      <ReaderProgressBar
        totalSteps={images.length}
        progressStep={currentPage}
        scrollMode={scrollMode}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
