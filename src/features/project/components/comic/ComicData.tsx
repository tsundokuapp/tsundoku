'use client';

import { SortAscending } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { useChapterComic } from '@/features/comics/hooks/usePublicComics';
import { IChapterData } from '@/features/comics/types/IChapterData';
import { Title } from '@/shared/components/ui/title/Title';
import { TitleContainer } from '@/shared/components/ui/title/TitleContainer';

import { Chapter } from '../Chapter';

interface ComicDataProps {
  title: string;
  comicSlug: string;
}

export function ComicData({ title, comicSlug }: ComicDataProps) {
  const { data: response, isLoading } = useChapterComic(comicSlug);

  const chapterComicResponse = response?.ok ? response.data : undefined;

  const [chapterData, setChapterData] = useState<IChapterData[]>();

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
      setChapterData(listChapter);
    }
  }, [chapterComicResponse?.data]);

  const [isAscending, setIsAscending] = useState<boolean>(false);

  const getChapterOrderValue = (order: string | number) => {
    const normalized = String(order).replace(',', '.');
    const numericChunk = normalized.match(/\d+(\.\d+)?/);
    if (!numericChunk) return null;

    const parsed = Number(numericChunk[0]);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const compareChapters = (
    a: IChapterData,
    b: IChapterData,
    ascending: boolean,
  ) => {
    const aOrder = getChapterOrderValue(a.ordemCapitulo);
    const bOrder = getChapterOrderValue(b.ordemCapitulo);

    if (aOrder !== null && bOrder !== null) {
      return ascending ? aOrder - bOrder : bOrder - aOrder;
    }

    return ascending
      ? String(a.ordemCapitulo).localeCompare(
          String(b.ordemCapitulo),
          'pt-BR',
          {
            numeric: true,
            sensitivity: 'base',
          },
        )
      : String(b.ordemCapitulo).localeCompare(
          String(a.ordemCapitulo),
          'pt-BR',
          {
            numeric: true,
            sensitivity: 'base',
          },
        );
  };

  const handleSorting = () => {
    if (!chapterData?.length) return;

    const nextIsAscending = !isAscending;

    const sorted = [...chapterData].sort((a, b) =>
      compareChapters(a, b, nextIsAscending),
    );

    setChapterData(sorted);
    setIsAscending(nextIsAscending);
  };

  const isChapterOpen = () => {
    return true;
  };

  return (
    <div className="flex flex-col gap-12">
      <TitleContainer className="px-6">
        <Title title={title} />
        <button onClick={handleSorting}>
          <SortAscending
            size={24}
            className={`${isAscending ? 'rotate-180' : ''} transition duration-300 ease-in-out`}
          />
        </button>
      </TitleContainer>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {chapterData?.map((item) => (
            <Chapter
              key={item.id}
              id={item.id}
              slug={item.slug}
              number={item.numero}
              name={item.descritivoCapitulo}
              date={item.dataInclusao}
              variant={isChapterOpen() ? 'regular' : 'fill'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
