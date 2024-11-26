import type { IPageListItem } from '@/@types/PageListItem';

import { GetPageLabelOnSingleList } from './GetPageLabelOnSingleList';

interface GenerateSinglePageListProps {
  totalPages: number;
}

export function GenerateSinglePageList({
  totalPages,
}: GenerateSinglePageListProps): IPageListItem[] {
  const pageList: IPageListItem[] = [];
  const pageListTotalItems = totalPages;
  const pageListGap = 1;

  for (let index = 0; index < pageListTotalItems; index++) {
    const PageListItemIndex: number = index + pageListGap;

    const PageListItemValue: string = GetPageLabelOnSingleList({
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
