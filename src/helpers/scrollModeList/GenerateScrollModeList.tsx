import type { IScrollModeListItem } from '@/@types/ScrollModeListItem';

export function GenerateScrollModeList(): IScrollModeListItem[] {
  const scrollModeList: IScrollModeListItem[] = [
    { label: 'Rolagem', value: 'infinite' },
    { label: 'Página Simples', value: 'single' },
    // TODO: descomentar quando o modo de página dupla for implementada
    // { label: 'Página Dupla', value: 'double' },
  ];

  return scrollModeList;
}
