'use client';
// Color Checked
// Components Checked
import { SortDescending } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { mapResponseVolumeToVolumeZustand } from '@/helpers/mapResponseVolumeToVolumeZustand';
import { useVolumesNovel } from '@/hooks/usePublicApi';
import { useNovelStore } from '@/store/useNovelStore';
import { IVolumeNovelData } from '@/types/Api';

import { Volume } from './Volume';
import { Title } from '../common/Title';
import { TitleContainer } from '../common/TitleContainer';

interface NovelDataProps {
  title: string;
  novelId: string;
}

export function NovelData({ title, novelId }: NovelDataProps) {
  const { setVolumeList } = useNovelStore();
  const { data: volumesNovelResponse, isLoading } = useVolumesNovel(novelId);

  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [volumeData, setVolumeData] = useState<IVolumeNovelData[]>();

  useEffect(() => {
    if (volumesNovelResponse?.data) {
      setVolumeData(volumesNovelResponse?.data);

      setVolumeList(
        mapResponseVolumeToVolumeZustand(volumesNovelResponse.data!),
      );
    }
  }, [volumesNovelResponse?.data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSorting = () => {
    if (!volumeData) return;

    const volumesSorted = [...volumeData].sort((a, b) =>
      isAscending
        ? Number(a.numero) - Number(b.numero)
        : Number(b.numero) - Number(a.numero),
    );

    setVolumeData(volumesSorted);
    setIsAscending(!isAscending);
  };

  return (
    <div>
      <TitleContainer className="mb-12 pr-6">
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
              cover={volume.imagemVolume}
              title={volume.descritivoTituloNumeroVolume}
              subTitle={volume.subtitulo}
              sinopse={volume.sinopse}
              chapters={volume.listaCapitulo}
              volumeNumber={volume.numero}
            />
          ))}
        </div>
      )}
    </div>
  );
}
