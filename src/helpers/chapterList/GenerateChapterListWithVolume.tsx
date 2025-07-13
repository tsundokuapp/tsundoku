import type { ChapterListWithVolumeItem } from '@/@types/ChapterListWithVolumeItem';
import type { NovelChapterListProps } from '@/fakeApi/novelChapterList';

interface GenerateChapterListWithVolumeProps {
  projectSlug: string;
  chaptersList: NovelChapterListProps[];
}

export function GenerateChapterListWithVolume({
  projectSlug,
  chaptersList,
}: GenerateChapterListWithVolumeProps) {
  const chapterListWithVolume: ChapterListWithVolumeItem[] = [];
  const volumeTotalItems = chaptersList.length;

  for (let volumeIndex = 0; volumeIndex < volumeTotalItems; volumeIndex++) {
    const volumeListIndex = chaptersList[volumeIndex].volume;
    const chapterTotalItems = chaptersList[volumeIndex].chapters.length;
    const volumeListUrl = '#';

    chapterListWithVolume.push({
      ItemIndex: volumeListIndex,
      ItemUrl: volumeListUrl,
    });

    for (
      let chapterindex = 0;
      chapterindex < chapterTotalItems;
      chapterindex++
    ) {
      const chapterListIndex = chaptersList[volumeIndex].chapters[chapterindex];
      const chapterUrl = `${projectSlug}/${volumeListIndex}/${chapterListIndex}`;

      chapterListWithVolume.push({
        ItemIndex: chapterListIndex,
        ItemUrl: chapterUrl,
      });
    }
  }
  return {
    list: chapterListWithVolume,
    totalItems: chapterListWithVolume.length - volumeTotalItems,
  };
}
