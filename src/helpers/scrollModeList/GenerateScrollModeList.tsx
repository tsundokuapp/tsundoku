import type { ScrollModeListItem } from '@/@types/ScrollModeListItem';

export function GenerateScrollModeList(): ScrollModeListItem[] {
  const scrollModeList: ScrollModeListItem[] = [
    { label: 'Rolagem', value: 'infinite' },
    { label: 'Página Simples', value: 'single' },
    { label: 'Página Dupla', value: 'double' },
  ];

  return scrollModeList;
}
