import { useState } from 'react';

import { GenerateScrollModeList } from '@/features/reader/utils/GenerateScrollModeList';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { ScrollMode } from '../../types/ScrollMode';

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
          selected={scrollModeListItem.value === scrollMode}
        />
      ))}
    </DropdownContainer>
  );
}
