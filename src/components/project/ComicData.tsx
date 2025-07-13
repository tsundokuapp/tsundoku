'use client';
// Colors Checked
// Components Checked
import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { IChapterData } from '@/@types/Chapter';
import { useChapterComic } from '@/hooks/usePublicApi';

import { Chapter } from './Chapter';
import { Title } from '../common/Title';
import { TitleContainer } from '../common/TitleContainer';

interface ComicDataProps {
  title: string;
  comicSlug: string;
}

export function ComicData({ title, comicSlug }: ComicDataProps) {
  const { data: chapterComicResponse, isLoading } = useChapterComic(comicSlug);

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
          descritivoCapitulo: chapter.descritivoCapitulo,
          dataInclusao: chapter.dataInclusao,
        }),
      );
      setChapterData(listChapter);
    }
  }, [chapterComicResponse?.data]);

  const [isAscending, setIsAscending] = useState<boolean>(false);

  const handleSorting = () => {
    if (!chapterData) return;

    const sorted = [...chapterData].sort((a, b) =>
      isAscending
        ? Number(a.ordemCapitulo) - Number(b.ordemCapitulo)
        : Number(b.ordemCapitulo) - Number(a.ordemCapitulo),
    );
    setChapterData(sorted);
    setIsAscending(!isAscending);
  };

  const isChapterOpen = () => {
    return true;
  };

  return (
    <div className="flex flex-col gap-12">
      <TitleContainer className="px-6">
        <Title title={title} />
        <button onClick={handleSorting}>
          {isAscending ? (
            <SortDescending size={24} />
          ) : (
            <SortAscending size={24} />
          )}
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
