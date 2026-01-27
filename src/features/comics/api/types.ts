import { IGenres } from '@/shared/types/common';
import { TStatusComic } from '@/shared/types/system';

export interface IImagesChapterComic {
  id: number;
  url: string;
  alt: string;
  ordem: number;
}

export interface IChapterComicData {
  id: string;
  numero: string;
  parte: string;
  slug: string;
  usuarioInclusao: string;
  usuarioAlteracao: string;
  dataInclusao: string; // '04/03/2025 19:40:22';
  dataAlteracao: string;
  ordemCapitulo: number;
  descritivoCapitulo: string;
  publicado: boolean;
  listaImagens: IImagesChapterComic[];
}

export interface IChapterComic {
  proxima: string;
  anterior: string;
  data: IChapterComicData[];
}

export interface IListImageComic {
  id: number;
  url: string;
  alt: string;
  ordem: number;
}

export interface IImageChapterComic {
  id: string;
  numero: string;
  parte: string;
  slug: string;
  usuarioInclusao: string;
  usuarioAlteracao: string;
  dataInclusao: string; // '04/03/2025 19:40:22'
  dataAlteracao: string;
  ordemCapitulo: number;
  descritivoCapitulo: string;
  publicado: boolean;
  listaImagens: IListImageComic[];
}
export interface IPublicComic {
  urlCapa: string;
  urlBanner?: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  autor: string;
  descritivoVolume?: string;
  slug: string;
  tipoObra: string;
  id: string;
  artista: string;
  statusObra: TStatusComic;
  sinopse: string;
  observacao: string;
  listaGeneros: IGenres[];
  ano: string;
  visualizacoes: string;
  ehRecomdacao: boolean;
  ehObraMaiorIdade: boolean;
  tipoObraSlug?: string;
  statusObraSlug?: string;
  nacionalidadeSlug?: boolean;
  nacionalidade: string;
}

export interface IPublicComics {
  publicado: boolean;
  urlCapa: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  autor: string;
  statusObra: TStatusComic;
  listaGeneros: IGenres[];
  descritivoVolume?: string;
  slug: string;
  tipoObra: string;
  id: string;
}
