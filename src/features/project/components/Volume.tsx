import { SortAscending } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IVolumeNovel } from '@/features/admin/novels/types/Volume';
import { IChapterListNovelVolume } from '@/features/novels/api/types';
import { Accordion } from '@/shared/components/ui/Accordion';

import { Chapter } from './Chapter';

export function Volume({
  title,
  subTitle,
  sinopse,
  chapters,
  cover,
}: IVolumeNovel) {
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [chaptersArray, setChaptersArray] =
    useState<IChapterListNovelVolume[]>(chapters);

  useEffect(() => {
    setChaptersArray(chapters);
  }, [chapters]);

  const getChapterNumericValue = (chapterNumber: string) => {
    const normalized = chapterNumber.replace(',', '.');
    const numericChunk = normalized.match(/\d+(\.\d+)?/);
    if (!numericChunk) return null;

    const parsed = Number(numericChunk[0]);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const compareChapters = (
    a: IChapterListNovelVolume,
    b: IChapterListNovelVolume,
    ascending: boolean,
  ) => {
    const aNumber = getChapterNumericValue(a.numeroCapitulo);
    const bNumber = getChapterNumericValue(b.numeroCapitulo);

    if (aNumber !== null && bNumber !== null) {
      return ascending ? aNumber - bNumber : bNumber - aNumber;
    }

    return ascending
      ? a.numeroCapitulo.localeCompare(b.numeroCapitulo, 'pt-BR', {
          numeric: true,
          sensitivity: 'base',
        })
      : b.numeroCapitulo.localeCompare(a.numeroCapitulo, 'pt-BR', {
          numeric: true,
          sensitivity: 'base',
        });
  };

  const handleSorting = () => {
    const nextIsAscending = !isAscending;

    const chaptersSorted = [...chaptersArray].sort((a, b) =>
      compareChapters(a, b, nextIsAscending),
    );

    setChaptersArray(chaptersSorted);
    setIsAscending(nextIsAscending);
  };

  return (
    <Accordion title={title}>
      <section className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex flex-col items-center justify-start gap-4">
          <Image
            src={cover}
            alt="cover"
            className="w-48 min-w-48 rounded-md"
            width={180}
            height={256}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex justify-between">
            <span className="inline-flex flex-row items-center gap-2">
              <h3 className="text-lg font-bold">{title}</h3>
              {subTitle && <p> : {subTitle}</p>}
            </span>
            <button
              onClick={handleSorting}
              className="ml-auto flex items-center gap-2"
            >
              <SortAscending
                size={24}
                className={`${isAscending ? 'rotate-180' : ''} transition duration-300 ease-in-out`}
              />
            </button>
          </div>
          <p className="text-sm text-gray-500">{sinopse}</p>

          <div className="my-4 grid grid-cols-1">
            {chaptersArray?.map((chapter) => (
              <div key={chapter.id}>
                {/* {chapter.publicado && (
                  <Chapter
                    key={chapter.id}
                    chapterId={chapter.id}
                    number={chapter.numeroCapitulo}
                    date={chapter.dataInclusao}
                  />
                )} */}
                <Chapter
                  key={chapter.id}
                  id={chapter.id}
                  slug={chapter.slugCapitulo}
                  name={`Capítulo ${chapter.numeroCapitulo}: ${chapter.tituloCapitulo}`}
                  date={chapter.dataInclusao}
                  variant="duotone"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Accordion>
  );
}
