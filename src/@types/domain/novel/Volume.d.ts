import { IChapterNovelApiPublic } from './Chapter';
import { IChapterNovelForVolume } from '../../Api';
import { IListChapterZustand } from '../../Chapter';

export interface IVolumeNovel {
  title: string;
  subTitle?: string;
  sinopse: string;
  cover: string;
  volumeNumber: string;
  chapters: IChapterNovelForVolume[];
}

export interface IVolumeNovelZustand {
  id: string;
  descritivoTituloNumeroVolume: string;
  numero: string;
  listChapters: IListChapterZustand[];
}

// Retornos da API
export interface IVolumeNovelApiPublic {
  id: string;
  idObra: string;
  numeroVolume: string;
  ordemVolume: number;
  publicado: boolean;
  sinopse: string;
  slugVolume: string;
  titulo: string;
  urlCapaVolume: string;
  listaRetornoCapitulosNovel: IChapterNovelApiPublic[];
}
