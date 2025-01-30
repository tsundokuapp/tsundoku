import { IChapterNovelForVolume } from './Api';
import { IListChapterZustand } from './Chapter';

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
  listChapters: IListChapterZustand[];
}
