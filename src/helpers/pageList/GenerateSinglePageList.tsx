import type { PageListItem } from '@/@types/PageListItem';

import { GetPageLabelOnSingleList } from './GetPageLabelOnSingleList';

interface GenerateSinglePageListProps {
  totalPages: number;
}

export function GenerateSinglePageList({
  totalPages,
}: GenerateSinglePageListProps): PageListItem[] {
  const pageList: PageListItem[] = [];
  const pageListTotalItems = totalPages;
  const pageListGap = 1;

  for (let index = 0; index < pageListTotalItems; index++) {
    const pageListItemIndex: number = index + pageListGap;

    const pageListItemValue: string = GetPageLabelOnSingleList({
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
