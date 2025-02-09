import { usePathname } from 'next/navigation';

import { useNovelStore } from '@/store/useNovelStore';
import {
  INextChapterNovelInfo,
  IPreviousChapterNovelInfo,
} from '@/types/Chapter';

export const useNovelNavigation = () => {
  const { volumeList, chapterId } = useNovelStore();

  const pathname = usePathname();
  const projectSlug = pathname.split('/')[3];

  const getNextChapter = (nextVolume = false): INextChapterNovelInfo | null => {
    if (!volumeList || volumeList.length === 0 || !chapterId) return null;

    if (nextVolume) {
      const currentVolumeIndex = volumeList.findIndex((volume) =>
        volume.listChapters.some((chapter) => chapter.id === chapterId),
      );

      const nextVolume = volumeList[currentVolumeIndex + 1];

      if (!nextVolume || nextVolume.listChapters.length === 0) return null;

      const firstChapter = nextVolume.listChapters[0];

      const nextUrl = `/reader/novels/${projectSlug}/${nextVolume.numero}/${firstChapter.numero}`;

      return {
        volumeNumber: nextVolume.numero,
        nextChapterId: firstChapter.id,
        nextChapterNumber: firstChapter.numero,
        nextUrl,
      };
    }

    const currentVolume = volumeList.find((volume) =>
      volume.listChapters.some((chapter) => chapter.id === chapterId),
    );

    if (!currentVolume) return null;

    const currentChapter = currentVolume.listChapters.find(
      (chapter) => chapter.id === chapterId,
    );

    if (!currentChapter) return null;

    const nextChapterInVolume = currentVolume.listChapters.find(
      (chapter) => chapter.ordemCapitulo === currentChapter.ordemCapitulo + 1,
    );

    const nextUrl = `/reader/novels/${projectSlug}/${currentVolume?.numero}/${nextChapterInVolume?.numero}`;

    return nextChapterInVolume
      ? {
        volumeNumber: currentVolume.numero,
        nextChapterId: nextChapterInVolume.id,
        nextChapterNumber: nextChapterInVolume.numero,
        nextUrl,
      }
      : getNextChapter(true);
  };

  const getPreviousChapter = (
    previousVolume = false,
  ): IPreviousChapterNovelInfo | null => {
    if (!volumeList || volumeList.length === 0 || !chapterId) return null;

    if (previousVolume) {
      const currentVolumeIndex = volumeList.findIndex((volume) =>
        volume.listChapters.some((chapter) => chapter.id === chapterId),
      );

      if (currentVolumeIndex <= 0) return null;

      const previousVolume = volumeList[currentVolumeIndex - 1];

      if (!previousVolume || previousVolume.listChapters.length === 0)
        return null;

      const lastChapter =
        previousVolume.listChapters[previousVolume.listChapters.length - 1];

      const previousUrl = `/reader/novels/${projectSlug}/${previousVolume.numero}/${lastChapter.numero}`;

      return {
        volumeNumber: previousVolume.numero,
        previousChapterId: lastChapter.id,
        previousChapterNumber: lastChapter.numero,
        previousUrl,
      };
    }

    const currentVolume = volumeList.find((volume) =>
      volume.listChapters.some((chapter) => chapter.id === chapterId),
    );

    if (!currentVolume) return null;

    const currentChapter = currentVolume.listChapters.find(
      (chapter) => chapter.id === chapterId,
    );

    if (!currentChapter) return null;

    const previousChapterInVolume = currentVolume.listChapters.find(
      (chapter) => chapter.ordemCapitulo === currentChapter.ordemCapitulo - 1,
    );

    const previousUrl = `/reader/novels/${projectSlug}/${currentVolume?.numero}/${previousChapterInVolume?.numero}`;

    return previousChapterInVolume
      ? {
        volumeNumber: currentVolume.numero,
        previousChapterId: previousChapterInVolume.id,
        previousChapterNumber: previousChapterInVolume.numero,
        previousUrl,
      }
      : getPreviousChapter(true);
  };

  return { getNextChapter, getPreviousChapter };
};
