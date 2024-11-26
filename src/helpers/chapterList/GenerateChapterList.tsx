import type { IChapterListItem } from '@/@types/ChapterListItem';

interface GenerateChapterListProps {
  projectSlug: string;
  totalChapters: number;
}

export function GenerateChapterList({
  projectSlug,
  totalChapters,
}: GenerateChapterListProps): IChapterListItem[] {
  const chapterList: IChapterListItem[] = [];
  const chapterListTotalItems = totalChapters;
  const chapterListGap = 1;

  for (let index = 0; index < chapterListTotalItems; index++) {
    const chapterListItemIndex: number = index + chapterListGap;

    const chapterListItemUrl = `${projectSlug}/${chapterListItemIndex}`;

    chapterList.push({
      chapterListItemIndex,
      chapterListItemUrl,
    });
  }
  return chapterList;
}
