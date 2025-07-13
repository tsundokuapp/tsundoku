import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IVolumeNovelApiPublic } from '@/@types/Volume';
import { DropdownBreakLine } from '@/components/common/dropdown/DropdownBreakLine';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { DropdownText } from '@/components/common/dropdown/DropdownText';
import { usePublicVolumesNovelBySlug } from '@/hooks/usePublicApi';

export function ActionChapterWithVolumeList() {
  const router = useRouter();
  const pathname = usePathname();
  const projectSlug = pathname.split('/')[3];
  const chapterURL = pathname.split('/').pop();

  const [volumesData, setVolumesData] = useState<IVolumeNovelApiPublic[]>();
  const [totalChaptersDropdown, setTotalChaptersDropdown] = useState(0);
  const [currentChapterDropdown, setCurrentChapterDropdown] = useState('');
  const [currentVolumeDropdown, setCurrentVolumeDropdown] = useState('');
  const { data: responseVolumes } = usePublicVolumesNovelBySlug(projectSlug!);

  useEffect(() => {
    if (responseVolumes?.data) {
      setVolumesData(responseVolumes.data);
      countChapters(responseVolumes.data);
      currentChapter(responseVolumes.data);
    }
  }, [responseVolumes]); // eslint-disable-line react-hooks/exhaustive-deps

  const volumesListToDropdown = volumesData?.map((volume) => ({
    volume: volume.numeroVolume,
    listChapters: volume.listaRetornoCapitulosNovel.sort(
      (a, b) => a.ordemCapitulo - b.ordemCapitulo,
    ),
  }));

  const countChapters = (volumes: IVolumeNovelApiPublic[]) => {
    const totalChapters = volumes.reduce((acc, volume) => {
      return acc + volume.listaRetornoCapitulosNovel.length;
    }, 0);

    setTotalChaptersDropdown(totalChapters);
  };

  const currentChapter = (volumes: IVolumeNovelApiPublic[]) => {
    for (const volume of volumes) {
      const chapter = volume.listaRetornoCapitulosNovel.find(
        (chapter) => chapter.slug === chapterURL,
      );

      if (chapter) {
        setCurrentVolumeDropdown(volume.numeroVolume ?? null);
        setCurrentChapterDropdown(chapter.numero ?? null);
        return;
      }
    }
  };

  const handleClick = (slugChapter: string) => {
    router.push(`/reader/novels/${projectSlug}/${slugChapter}`);
  };

  return (
    <DropdownContainer
      label={`${totalChaptersDropdown} Capítulos`}
      value={`Capítulo ${currentChapterDropdown}`}
    >
      {volumesListToDropdown?.map((volume) => {
        return (
          <div key={volume.volume}>
            <DropdownText text={`Volume ${volume.volume}`} />
            <DropdownBreakLine />
            {volume.listChapters.map((chapter) => {
              return (
                <DropdownOption
                  key={chapter.id}
                  label={`Capítulo ${chapter.numero}`}
                  value={chapter.numero}
                  selected={
                    chapterURL === chapter.slug &&
                    volume.volume === currentVolumeDropdown
                  }
                  action={() => handleClick(chapter.slug)}
                />
              );
            })}
          </div>
        );
      })}
    </DropdownContainer>
  );
}
