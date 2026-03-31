import { Bookmarks } from '@phosphor-icons/react/dist/ssr';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IVolumeNovelApiPublic } from '@/features/admin/novels/types/Volume';
import { usePublicVolumesNovelBySlug } from '@/features/novels/hooks/usePublicNovels';
import { DropdownBreakLine } from '@/shared/components/ui/dropdown/DropdownBreakLine';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { DropdownText } from '@/shared/components/ui/dropdown/DropdownText';

export function ActionChapterWithVolumeList() {
  const router = useRouter();
  const pathname = usePathname();
  const projectSlug = pathname.split('/')[3];
  const chapterURL = pathname.split('/').pop();

  const [volumesData, setVolumesData] = useState<IVolumeNovelApiPublic[]>();
  const [totalChaptersDropdown, setTotalChaptersDropdown] = useState(0);
  const [currentChapterDropdown, setCurrentChapterDropdown] = useState('');
  const [currentVolumeDropdown, setCurrentVolumeDropdown] = useState('');
  const { data: response } = usePublicVolumesNovelBySlug(projectSlug!);

  // TODO: esse retorno ta paginaado, verificar se deveria.
  const volumes = response?.ok ? response.data.data : undefined;

  useEffect(() => {
    if (volumes) {
      setVolumesData(volumes);
      countChapters(volumes);
      currentChapter(volumes);
    }
  }, [volumes]); // eslint-disable-line react-hooks/exhaustive-deps

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
      label={
        <>
          <span className="sm:hidden">
            <Bookmarks size={16} />
          </span>
          <span className="hidden sm:inline">{`${totalChaptersDropdown} Capítulos`}</span>
        </>
      }
      value={
        <>
          <span className="sm:hidden">
            <Bookmarks size={16} />
          </span>
          <span className="hidden sm:inline">{`Capítulo ${currentChapterDropdown}`}</span>
        </>
      }
      className="min-w-[52px] sm:min-w-[180px]"
      buttonClassname="border-appMenuBorder bg-appInputBackground px-2 hover:bg-appGroupBackground sm:px-3 justify-center gap-1 sm:justify-between"
      menuClassname="min-w-[180px]"
      matchTriggerWidth={false}
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
