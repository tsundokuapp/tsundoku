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
    let PageListItemIndex = 1;
    PageListItemIndex <= totalPages;
    PageListItemIndex += 2
  ) {
    const PageListItemValue: string = GetPageLabelOnDoubleList({
      showPage: PageListItemIndex,
      totalPages,
    });

    pageList.push({
      PageListItemIndex,
      PageListItemLabel: PageListItemValue,
    });
  }

  return pageList;
}
