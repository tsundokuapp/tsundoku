import { TStatusComic } from './System';

export interface ApiResponse<T> {
  data: T[];
  proxima: string;
  anterior: string;
  total: number;
}

export interface IGenres {
  id: string;
  descricao: string;
  slug: string;
  usuarioInclusao?: string;
  usuarioAlteracao?: string;
  dataInclusao?: string;
  dataAlteracao?: string;
}

export interface IChapterNovelForVolume {
  dataInclusao: string;
  id: string;
  numero: string;
  ordemCapitulo: number;
  parte?: string;
  publicado: boolean;
  slug: string;
  titulo: string;
  volumeId: string;
}

export interface IVolumeNovelData {
  id: string;
  dataInclusao: string;
  dataAlteracao: string;
  descritivoTituloNumeroVolume: string;
  subtitulo?: string;
  imagemVolume: string;
  numero: string;
  sinopse: string;
  slug: string;
  usuarioInclusao: string;
  novelId: string;
  listaCapitulo: IChapterNovelForVolume[];
}

export interface IChapterNovelData {
  id: string;
  numero: string;
  titulo: string;
  conteudoNovel: string | HTMLElement;
  slug: string;
  usuarioInclusao: string;
  dataInclusao: string;
  dataAlteracao: string;
  ordemCapitulo: number;
  ehIlustracoesNovel: boolean;
  volumeId: string;
  tradutor: string;
  revisor: string;
  qc: string;
  descritivoCapitulo: string;
  publicado: boolean;
}

// COMICS
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
  visualizacoes: string; // trocar para number
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
