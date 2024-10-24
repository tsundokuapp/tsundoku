'use client';

import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { Chapter, type ChapterProps } from './Chapter';
import { Title } from '../common/Title';
import { TitleContainer } from '../common/TitleContainer';

interface ComicDataProps {
  title: string;
  items: ChapterProps[];
}

export function ComicData({ title, items }: ComicDataProps) {
  const [sortedItems, setSortedItems] = useState<ChapterProps[]>(items);
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const handleSorting = () => {
    const sorted = [...sortedItems].sort((a, b) =>
      isAscending
        ? a.date.toISOString().localeCompare(b.date.toISOString())
        : b.date.toISOString().localeCompare(a.date.toISOString()),
    );
    setSortedItems(sorted);
    setIsAscending(!isAscending);
  };

  return (
    <div>
      <TitleContainer className="mb-12 pr-6">
        <Title title={title} />
        <button onClick={handleSorting}>
          {isAscending ? (
            <SortDescending size={24} />
          ) : (
            <SortAscending size={24} />
          )}
        </button>
      </TitleContainer>

      <div>
        {sortedItems
          .map((item, index) => (
            <Chapter
              key={index}
              number={item.number}
              date={item.date}
              variant={item.variant}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
}
