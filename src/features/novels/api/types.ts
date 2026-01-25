import { IGenres } from '@/shared/types/common';
import { TStatusNovel } from '@/shared/types/system';

export interface IIlustrationUrls {
  id: number;
  url: string;
  alt: string;
  ordem: number;
}

export interface IChapterNovelData {
  id: string;
  conteudoNovel: string | HTMLElement;
  dataAlteracao: string;
  dataInclusao: string;
  descritivoCapitulo: string;
  listaImagens?: IIlustrationUrls[];
  numero: string;
  ordemCapitulo: number;
  parte?: string;
  qc: string;
  revisor: string;
  slug: string;
  titulo: string;
  tradutor: string;
  usuarioAlteracao: string;
  usuarioInclusao: string;

  ehIlustracoesNovel?: boolean;
  publicado: boolean;
}

export interface IChapterNovel {
  anterior: string;
  proxima: string;
  total: number;
  data: IChapterNovelData;
}

export interface IPublicNovels {
  urlCapa: string;
  alias: string;
  titulo: string;
  autor: string;
  statusObra: TStatusNovel;
  listaGeneros: string[];
  descritivoVolume?: string;
  slug: string;
  tipoObraSlug: string;
  tipoObra: string;
  id: string;
}

export interface IPublicNovel {
  urlCapa: string;
  urlBanner: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  sinopse: string;
  artista: string;
  autor: string;
  statusObra: TStatusNovel;
  listaGeneros: IGenres[];
  descritivoVolume?: string;
  slug: string;
  tipoObraSlug: string;
  tipoObra: string;
  id: string;
  observacao?: string;
}

export interface IChapterListNovelVolume {
  dataInclusao: string;
  id: string;
  idVolume: string;
  numeroCapitulo: string;
  slugCapitulo: string;
  tituloCapitulo: string;

  parteCapitulo: string;
  publicado: boolean;
  conteudoCapitulo: string;
}

export interface IVolumeNovelData {
  id: string;
  idObra: string;
  dataInclusao: string;
  numeroVolume: string;
  sinopse: string;
  slugVolume: string;
  urlCapaVolume: string;
  tituloVolume: string;
  listaCapitulos: IChapterListNovelVolume[];
}

export interface IVolumesNovel {
  proximo: string;
  anterior: string;
  total: number;
  data: IVolumeNovelData[];
}
