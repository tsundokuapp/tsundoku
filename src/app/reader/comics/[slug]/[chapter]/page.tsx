'use client';
import { usePathname } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';

import { IChapterData } from '@/@types/Chapter';
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
import {
  useChapterComic,
  usePublicComicAndChapterBySlug,
} from '@/hooks/usePublicApi';

interface ComicReaderProps {
  params: {
    chapter: string;
  };
  images: string[];
}

export default function ComicReader({ images }: ComicReaderProps) {
  const pathname = usePathname();
  const slugChapter = pathname.split('/').pop();
  const slugComic = pathname.split('/')[3];

  const [chapterListData, setChapterListData] = useState<IChapterData[]>([]);

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

  const comicContainerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [scrollMode, setScrollMode] = useState<ScrollMode>('infinite');

  const handleScrollModeChange = (mode: ScrollMode) => {
    setScrollMode(mode);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    ScrollPage(scrollMode, page);
  };

  const handlePageOnRead = (page: number) => {
    setCurrentPage(page);
  };

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
  }, [scrollMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={comicContainerRef} className="relative h-[100vh] pt-[74px]">
      <ActionsBarContainer removeList={['reader']}>
        <ActionChapterList
          totalChapters={chapterListData.length}
          currentChapter={slugChapter ? slugChapter!.replace(/-/g, ' ') : '0'}
          chapterList={chapterListData}
        />
        <ActionPageList
          totalPages={imageChapterResponse?.data?.listaImagens.length ?? 40} // antes de carregar o capitulo, assume 40 páginas para evitar um erro configurado nos helpers
          showPage={currentPage}
          scrollMode={scrollMode}
          onPageChange={handlePageChange}
        />
        <ActionScrollModeList onScrollModeChange={handleScrollModeChange} />
      </ActionsBarContainer>

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
