'use client';

import { SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { IVolumeNovelData } from '@/features/novels/api/types';
import { useVolumesNovel } from '@/features/novels/hooks/usePublicNovels';

import { Title } from '../../../../shared/components/ui/title/Title';
import { TitleContainer } from '../../../../shared/components/ui/title/TitleContainer';
import { Volume } from '../Volume';

interface NovelDataProps {
  title: string;
  novelId: string;
}

export function NovelData({ title, novelId }: NovelDataProps) {
  const { data: volumesNovel, isLoading } = useVolumesNovel(novelId);

  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [volumeData, setVolumeData] = useState<IVolumeNovelData[]>();

  useEffect(() => {
    if (volumesNovel) {
      setVolumeData(volumesNovel?.data);
    }
  }, [volumesNovel]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSorting = () => {
    if (!volumeData) return;

    const volumesSorted = [...volumeData].sort((a, b) =>
      isAscending
        ? Number(a.numeroVolume) - Number(b.numeroVolume)
        : Number(b.numeroVolume) - Number(a.numeroVolume),
    );

    setVolumeData(volumesSorted);
    setIsAscending(!isAscending);
  };

  return (
    <div className="flex flex-col gap-12">
      <TitleContainer className="px-6">
        <Title title={title} />
        <button onClick={handleSorting}>
          <SortDescending
            size={24}
            className={`${isAscending ? 'rotate-180' : ''} transition duration-300 ease-in-out`}
          />
        </button>
      </TitleContainer>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {volumeData?.map((volume) => (
            <Volume
              key={volume.id}
              cover={volume.urlCapaVolume}
              title={`Volume ${volume.numeroVolume}`}
              subTitle={volume.tituloVolume}
              sinopse={volume.sinopse}
              chapters={volume.listaCapitulos}
              volumeNumber={volume.numeroVolume}
            />
          ))}
        </div>
      )}
    </div>
  );
}
