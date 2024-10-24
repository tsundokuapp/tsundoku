'use client';

import { SortAscending, SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { Volume, type VolumeProps } from './Volume';
import { Title } from '../common/Title';
import { TitleContainer } from '../common/TitleContainer';

interface NovelDataProps {
  title: string;
  items: VolumeProps[];
}

export function NovelData({ title, items }: NovelDataProps) {
  const [sortedItems, setSortedItems] = useState<VolumeProps[]>(items);
  const [isAscending, setIsAscending] = useState<boolean>(false);

  const handleSorting = () => {
    const sorted = [...sortedItems].sort((a, b) =>
      isAscending
        ? a.number.localeCompare(b.number)
        : b.number.localeCompare(a.number),
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

      <div className="flex flex-col gap-4">
        {sortedItems
          .map((item, index) => (
            <Volume key={index} number={item.number} chapters={item.chapters} />
          ))
          .reverse()}
      </div>
    </div>
  );
}
