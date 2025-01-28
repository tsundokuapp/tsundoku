import { IChapterNovelForVolume } from './Api';

export interface IVolumeNovel {
  title: string;
  subTitle?: string;
  sinopse: string;
  cover: string;
  volumeNumber: string;
  chapters: IChapterNovelForVolume[];
}

export interface IVolumeZustand {
  id: string;
  descritivoTituloNumeroVolume: string;
  numero: string;
  listChapters: {
    id: string;
    numero: string;
    ordemCapitulo: number;
    parte?: string;
  }[];
}
