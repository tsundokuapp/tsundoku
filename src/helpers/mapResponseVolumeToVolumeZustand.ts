import { IVolumeNovelData } from '@/@types/Api';
import { IVolumeZustand } from '@/@types/Volume';

export const mapResponseVolumeToVolumeZustand = (
  volumes: IVolumeNovelData[],
): IVolumeZustand[] => {
  const listVolume: IVolumeZustand[] = [];

  volumes.forEach((volume) => {
    const volumeData: IVolumeZustand = {
      id: volume.id,
      descritivoTituloNumeroVolume: volume.descritivoTituloNumeroVolume,
      numero: volume.numero,
      listChapters: [],
    };

    volume.listaCapitulo.forEach((chapter) => {
      const listChapters = {
        id: chapter.id,
        numero: chapter.numero,
        ordemCapitulo: chapter.ordemCapitulo,
        parte: chapter?.parte,
      };

      volumeData.listChapters.push(listChapters);
    });

    listVolume.push(volumeData);
  });

  return listVolume;
};
