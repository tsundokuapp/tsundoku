'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { IImageChapterComic } from '@/features/comics/api/types';
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
import { NoContent } from '@/shared/components/feedback/noContent';

export default function ComicReader({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const { slug: slugComic, chapter: slugChapter } = params;

  const [chapterListData, setChapterListData] = useState<IChapterData[]>([]);
  const comicContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { scrollMode, setScrollMode } = useReaderPreferences();

  useEffect(() => {
    setScrollMode('infinite');
  }, [setScrollMode]);

  const { data: responseImages, isLoading } = usePublicComicAndChapterBySlug(
    slugComic,
    slugChapter!,
  );
  const { data: response } = useChapterComic(slugComic);

  const chapterComicResponse = response?.ok ? response.data : undefined;
  const imageChapterResponse = responseImages?.ok
    ? responseImages.data
    : undefined;
  const imageChapterData: IImageChapterComic | undefined =
    imageChapterResponse && 'data' in imageChapterResponse
      ? imageChapterResponse.data
      : imageChapterResponse;

  useEffect(() => {
    if (chapterComicResponse?.data) {
      const listChapter: IChapterData[] = chapterComicResponse.data.map(
        (chapter) => ({
          id: chapter.id,
          numero: chapter.numero,
          publicado: chapter.publicado,
          ordemCapitulo: chapter.ordemCapitulo,
          slug: chapter.slug,
          descritivoCapitulo:
            chapter.descritivoCapitulo || chapter.slug.replace(/-/g, ' '),
          dataInclusao: chapter.dataInclusao,
        }),
      );
      setChapterListData(listChapter);
    }
  }, [chapterComicResponse?.data]);

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

  // Rolagem para a página atual quando o modo de rolagem muda
  useEffect(() => {
    if (scrollMode === 'infinite' && comicContainerRef.current) {
      ScrollPage(scrollMode, currentPage, 'instant');
    }
  }, [scrollMode, currentPage]);

  const hasError =
    (response && !response.ok) || (responseImages && !responseImages.ok);

  if (hasError) {
    return <NoContent msg="Erro ao carregar o comic. Tente novamente." />;
  }

  return (
    <div ref={comicContainerRef} className="relative h-[100vh] pt-[88px]">
      <ActionsBar
        removeList={['reader']}
        className="bg-[var(--reader-color-background)]"
      >
        <ActionChapterList
          totalChapters={chapterListData.length}
          currentChapter={slugChapter ? slugChapter!.replace(/-/g, ' ') : '0'}
          chapterList={chapterListData}
        />
        <ActionPageList
          totalPages={imageChapterData?.listaImagens?.length ?? 40}
          showPage={currentPage}
          scrollMode={scrollMode}
          onPageChange={handlePageChange}
        />
        <ActionScrollModeList
          scrollMode={scrollMode}
          onScrollModeChange={setScrollMode}
        />
      </ActionsBar>

      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <p>Carregando...</p>
        </div>
      ) : (
        <ReaderContainer data-view-mode={scrollMode} className="group">
          <ComicInfiniteView
            images={imageChapterData?.listaImagens ?? []}
            updatePageNumber={handlePageOnRead}
            className="hidden group-data-[view-mode=infinite]:flex"
          />
          <ComicSingleView
            images={imageChapterData?.listaImagens ?? []}
            showPage={currentPage}
            updatePageNumber={handlePageOnRead}
            className="hidden group-data-[view-mode=single]:flex"
          />
          <ComicDoubleView
            images={imageChapterData?.listaImagens ?? []}
            showPage={currentPage}
            updatePageNumber={handlePageOnRead}
            className="hidden group-data-[view-mode=double]:flex"
          />
        </ReaderContainer>
      )}

      <ReaderProgressBar
        totalSteps={imageChapterData?.listaImagens?.length ?? 10}
        progressStep={currentPage}
        scrollMode={scrollMode}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
