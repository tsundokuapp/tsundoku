'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { fakeComicChapter } from '@/features/reader/utils/fakeComicChapter';
import {
  useChapterComic,
  usePublicComicAndChapterBySlug,
} from '@/features/comics/hooks/usePublicComics';
import { IChapterData } from '@/features/comics/types/IChapterData';
import { ActionsBar } from '@/features/reader/components/ActionsBar';
import { ActionChapterList } from '@/features/reader/components/ActionsBar/ActionChapterList';
import { ActionPageList } from '@/features/reader/components/ActionsBar/ActionPageList';
import { ActionScrollModeList } from '@/features/reader/components/ActionsBar/ActionScrollModeList';
import { ReaderContainer } from '@/features/reader/components/ReaderContainer';
import { ComicDoubleView } from '@/features/reader/components/comic/ComicDoubleView';
import { ComicInfiniteView } from '@/features/reader/components/comic/ComicInfiniteView';
import { ComicSingleView } from '@/features/reader/components/comic/ComicSingleView';
import { useReaderPreferences } from '@/features/reader/stores/useReaderPreferences';
import { ReaderProgressBar } from '@/features/reader/utils/ReaderProgressBar';
import { ScrollPage } from '@/features/reader/utils/ScrollPage';

interface ComicReaderProps {
  params: {
    slug: string;
    chapter: string;
  };
  images: string[];
}

export default function ComicReader({ images, params }: ComicReaderProps) {
  const { slug: slugComic, chapter: slugChapter } = params;

  const [chapterListData, setChapterListData] = useState<IChapterData[]>([]);
  const comicContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollMode, setScrollMode } = useReaderPreferences();

  const { data: imageChapterResponse, isLoading } =
    usePublicComicAndChapterBySlug(slugComic, slugChapter!);
  const { data: chapterComicResponse } = useChapterComic(slugComic);

  useEffect(() => {
    if (chapterComicResponse?.data) {
      const listChapter: IChapterData[] = chapterComicResponse.data.map(
        (chapter) => ({
          id: chapter.id,
          numero: chapter.numero,
          publicado: chapter.publicado,
          ordemCapitulo: chapter.ordemCapitulo,
          slug: chapter.slug,
          descritivoCapitulo: chapter.descritivoCapitulo,
          dataInclusao: chapter.dataInclusao,
        }),
      );
      setChapterListData(listChapter);
    }
  }, [chapterComicResponse?.data]);

  images = fakeComicChapter.images;

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      ScrollPage(scrollMode, page);
    },
    [scrollMode],
  );

  const handlePageOnRead = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Corrigir modo de rolagem duplo quando currentPage é par
  useEffect(() => {
    if (scrollMode === 'double' && currentPage % 2 === 0) {
      setCurrentPage((prevState) => prevState - 1);
    }
  }, [scrollMode, currentPage]);

  // Rolagem para a página atual quando o modo de rolagem muda
  useEffect(() => {
    if (scrollMode === 'infinite' && comicContainerRef.current) {
      ScrollPage(scrollMode, currentPage, 'instant');
    }
  }, [scrollMode, currentPage]);

  return (
    <div ref={comicContainerRef} className="relative h-[100vh] pt-[74px]">
      <ActionsBar removeList={['reader']}>
        <ActionChapterList
          totalChapters={chapterListData.length}
          currentChapter={slugChapter ? slugChapter!.replace(/-/g, ' ') : '0'}
          chapterList={chapterListData}
        />
        <ActionPageList
          totalPages={imageChapterResponse?.data?.listaImagens.length ?? 40}
          showPage={currentPage}
          scrollMode={scrollMode}
          onPageChange={handlePageChange}
        />
        <ActionScrollModeList onScrollModeChange={setScrollMode} />
      </ActionsBar>

      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p>Carregando...</p>
        </div>
      ) : (
        <ReaderContainer data-view-mode={scrollMode} className="group">
          <ComicInfiniteView
            images={imageChapterResponse?.data?.listaImagens ?? []}
            updatePageNumber={handlePageOnRead}
            className="hidden group-data-[view-mode=infinite]:flex"
          />
          <ComicSingleView
            images={imageChapterResponse?.data?.listaImagens ?? []}
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
      )}

      <ReaderProgressBar
        totalSteps={imageChapterResponse?.data?.listaImagens.length ?? 10}
        progressStep={currentPage}
        scrollMode={scrollMode}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
