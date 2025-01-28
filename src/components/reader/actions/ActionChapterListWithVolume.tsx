import { usePathname, useRouter } from 'next/navigation';
import { type ComponentProps } from 'react';

import { DropdownBreakLine } from '@/components/common/dropdown/DropdownBreakLine';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { DropdownText } from '@/components/common/dropdown/DropdownText';
import { useNovelStore } from '@/store/useNovelStore';
import { IVolumeZustand } from '@/types/Volume';

interface ActionChapterListWithVolumeProps extends ComponentProps<'div'> {
  volumesList: IVolumeZustand[];
}

export function ActionChapterWithVolumeList({
  volumesList,
}: ActionChapterListWithVolumeProps) {
  const router = useRouter();
  const { setChapterId } = useNovelStore();

  const pathname = usePathname();
  const projectSlug = pathname.split('/')[3];
  const chapter = pathname.split('/').pop();

  if (!volumesList) {
    return null;
  }

  const volumesListToDropdown = volumesList?.map((volume) => ({
    volume: volume.numero,
    listChapters: volume.listChapters.sort(
      (a, b) => a.ordemCapitulo - b.ordemCapitulo,
    ),
  }));

  const countChapters = volumesListToDropdown.reduce((acc, volume) => {
    return acc + volume.listChapters.length;
  }, 0);

  const handleClick = (
    volumeNumber: string,
    chapterNumber: string,
    chapterId: string,
  ) => {
    setChapterId(chapterId);
    router.push(
      `/reader/novels/${projectSlug}/${volumeNumber}/${chapterNumber}`,
    );
  };

  return (
    <DropdownContainer
      label={`${countChapters} Capítulos`}
      value={`Capítulo ${chapter}`}
    >
      {volumesListToDropdown.map((volume) => {
        return (
          <>
            <DropdownText text={`Volume ${volume.volume}`} />
            <DropdownBreakLine />
            {volume.listChapters.map((chapter) => {
              return (
                <DropdownOption
                  key={chapter.id}
                  label={`Capítulo ${chapter.numero}`}
                  value={chapter.numero}
                  action={() =>
                    handleClick(volume.volume, chapter.numero, chapter.id)
                  }
                />
              );
            })}
          </>
        );
      })}
    </DropdownContainer>
  );
}
