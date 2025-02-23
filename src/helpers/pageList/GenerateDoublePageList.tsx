import type { IPageListItem } from '@/@types/PageListItem';

import { GetPageLabelOnDoubleList } from './GetPageLabelOnDoubleList';

interface GenerateDoublePageListProps {
  totalPages: number;
}

export function GenerateDoublePageList({
  totalPages,
}: GenerateDoublePageListProps): IPageListItem[] {
  const pageList: IPageListItem[] = [];

  // Itera apenas pelos valores ímpares até o total de páginas
  for (
    let pageListItemIndex = 1;
    pageListItemIndex <= totalPages;
    pageListItemIndex += 2
  ) {
    const pageListItemValue: string = GetPageLabelOnDoubleList({
      showPage: pageListItemIndex,
      totalPages,
    });

    pageList.push({
      pageListItemIndex,
      pageListItemLabel: pageListItemValue,
    });
  }

  return pageList;
}
