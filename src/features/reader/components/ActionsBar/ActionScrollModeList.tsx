import { UsersThree } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { GenerateScrollModeList } from '@/features/reader/utils/GenerateScrollModeList';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { ScrollMode } from '../../types/ScrollMode';

interface ActionScrollModeListProps {
  scrollMode?: ScrollMode;
  onScrollModeChange?: (setMode: ScrollMode) => void;
}

export function ActionScrollModeList({
  scrollMode: externalScrollMode,
  onScrollModeChange,
}: ActionScrollModeListProps) {
  const [scrollMode, setScrollMode] = useState<ScrollMode>(
    externalScrollMode ?? 'infinite',
  );

  useEffect(() => {
    if (externalScrollMode) {
      setScrollMode(externalScrollMode);
    }
  }, [externalScrollMode]);

  const scrollModeList = GenerateScrollModeList();

  const handleScrollModeChange = (scrollMode: ScrollMode) => {
    setScrollMode(scrollMode);
    onScrollModeChange?.(scrollMode);
  };

  return (
    <DropdownContainer
      label={
        <>
          <span className="sm:hidden">
            <UsersThree size={16} />
          </span>
          <span className="hidden sm:inline">Modo de Leitura</span>
        </>
      }
      value={
        <>
          <span className="sm:hidden">
            <UsersThree size={16} />
          </span>
          <span className="hidden sm:inline">
            {scrollModeList.find(
              (scrollModeListItem) => scrollModeListItem.value === scrollMode,
            )?.label || scrollModeList[0].label}
          </span>
        </>
      }
      className="min-w-[52px] sm:min-w-[180px]"
      buttonClassname="px-2 sm:px-3"
      menuClassname="min-w-[180px]"
      matchTriggerWidth={false}
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
