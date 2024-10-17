'use client';

import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { Chapter, type ChapterProps } from './Chapter';
import { Title } from '../common/Title';

interface SortListProps {
  title: string;
  items: ChapterProps[];
}

export function SortList({ title, items }: SortListProps) {
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
      <Title title={title} className="mb-12 pr-6">
        <button onClick={handleSorting}>
          {isAscending ? (
            <SortDescending size={24} />
          ) : (
            <SortAscending size={24} />
          )}
        </button>
      </Title>

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
