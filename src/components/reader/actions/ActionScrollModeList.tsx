import { useState } from 'react';

import type { ScrollMode } from '@/@types/ScrollMode';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { GenerateScrollModeList } from '@/helpers/scrollModeList/GenerateScrollModeList';

interface ActionScrollModeListProps {
  onScrollModeChange?: (setMode: ScrollMode) => void;
}

export function ActionScrollModeList({
  onScrollModeChange,
}: ActionScrollModeListProps) {
  const [scrollMode, setScrollMode] = useState<ScrollMode>('infinite');

  const scrollModeList = GenerateScrollModeList();

  const handleScrollModeChange = (scrollMode: ScrollMode) => {
    setScrollMode(scrollMode);
    onScrollModeChange?.(scrollMode);
  };

  return (
    <DropdownContainer
      label="Modo de Leitura"
      value={
        scrollModeList.find(
          (scrollModeListItem) => scrollModeListItem.value === scrollMode,
        )?.label || scrollModeList[0].label
      }
    >
      {scrollModeList.map((scrollModeListItem) => (
        <DropdownOption
          key={scrollModeListItem.value}
          label={scrollModeListItem.label}
          value={scrollModeListItem.value}
          action={() => {
            handleScrollModeChange(scrollModeListItem.value);
          }}
        />
      ))}
    </DropdownContainer>
  );
}
