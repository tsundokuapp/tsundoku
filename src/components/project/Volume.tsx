// Color Checked
// Components Checked
import { SortAscending } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useState } from 'react';

import { IChapterListNovelVolume } from '@/@types/Api';
import { IVolumeNovel } from '@/@types/Volume';

import { Chapter } from './Chapter';
import { Accordion } from '../common/Accordion';

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

  const handleSorting = () => {
    if (!chaptersArray) return;

    const chaptersSorted = [...chaptersArray].sort((a, b) =>
      isAscending
        ? Number(a.numeroCapitulo) - Number(b.numeroCapitulo)
        : Number(b.numeroCapitulo) - Number(a.numeroCapitulo),
    );

    setChaptersArray(chaptersSorted);
    setIsAscending(!isAscending);
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
          <span className="inline-flex flex-row items-center gap-2">
            <h3 className="text-lg font-bold">{title}</h3>
            {subTitle && <p> : {subTitle}</p>}
          </span>

          <p className="text-sm text-gray-500">{sinopse}</p>

          <button
            onClick={handleSorting}
            className="ml-auto flex items-center gap-2"
          >
            <SortAscending
              size={24}
              className={`${isAscending ? 'rotate-180' : ''} transition duration-300 ease-in-out`}
            />
          </button>

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
                  chapterId={chapter.id}
                  number={chapter.numeroCapitulo}
                  date={chapter.dataInclusao}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Accordion>
  );
}
