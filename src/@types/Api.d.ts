import { TStatusComic, TStatusNovel } from './System';

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

export interface IProjectsHome {
  numeroCapitulo: string;
  parteCapitulo: string;
  slugCapitulo: string;
  dataInclusao: string;
  numeroVolume: string;
  urlCapa: string;
  aliasObra: string;
  autorObra: string;
  tipoObra: string;
  slugObra: string;
}

export interface IProjectRecomendations {
  // TODO: validar esses dois campos em um middleware
  statusCode?: number;
  message?: string;

  titulo: string;
  capa: string;
  slugObra: string;
  sinopse: string;
  tipoObra: string;
}

// NOVELS

interface IPublicNovel {
  urlCapa: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  autor: string;
  descritivoVolume?: string;
  slug: string;
  tipoObra: string;
  id: string;
  artista: string;
  statusObra: TStatusNovel;
  sinopse: string;
  observacao: string;
  listaGeneros: IGenres[];
}
export interface IPublicNovels {
  urlCapa: string;
  alias: string;
  titulo: string;
  autor: string;
  statusObra: TStatusNovel;
  listaGeneros: string[]; // go horse, aqui deveria ser IGenres[]
  descritivoVolume?: string;
  slug: string;
  tipoObraSlug: string;
  tipoObra: string;
  id: string;
}

export interface IVolumesNovel {
  total: number;
  data: IVolumeNovelData[];
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
  listaGeneros: string[]; // go horse, aqui deveria ser IGenres[]
  descritivoVolume?: string;
  slug: string;
  tipoObra: string;
  id: string;
}

// GENRES
export interface IPublicGenres {
  id: string;
  descricao: string;
  slug: string;
}
