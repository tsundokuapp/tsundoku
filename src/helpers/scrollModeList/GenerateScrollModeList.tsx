import type { IScrollModeListItem } from '@/@types/ScrollModeListItem';

export function GenerateScrollModeList(): IScrollModeListItem[] {
  const scrollModeList: IScrollModeListItem[] = [
    { label: 'Rolagem', value: 'infinite' },
    { label: 'Página Simples', value: 'single' },
    { label: 'Página Dupla', value: 'double' },
  ];

  return scrollModeList;
}
