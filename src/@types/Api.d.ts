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

export interface IChapterNovelAdminVolume {
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

export interface IVolumeNovelAdminData {
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
  listaCapitulo: IChapterNovelAdminVolume[];
}

export interface IChapterListNovelVolume {
  dataInclusao: string;
  id: string;
  idVolume: string;
  numeroCapitulo: string;
  slugCapitulo: string;
  tituloCapitulo: string;

  parteCapitulo: string; // esse campo não existe no retorno da API
  publicado?: boolean; // esse campo não existe no retorno da API
}
export interface IVolumeNovelData {
  id: string;
  idObra: string;
  dataInclusao: string;
  numeroVolume: string;
  sinopse: string;
  slugVolume: string;
  urlCapaVolume: string;
  titulo?: string; // Esse campo ainda não existe no retorno da API
  listaCapitulos: IChapterListNovelVolume[];
}

export interface IChapterNovelAdminData {
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

export interface IChapterNovelData {
  id: string;
  conteudoNovel: string | HTMLElement;
  dataAlteracao: string;
  dataInclusao: string;
  descritivoCapitulo: string;
  listaImagens?: string[];
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

  ehIlustracoesNovel?: boolean; // esse campo não existe no retorno da API
  publicado?: boolean; // esse campo não existe no retorno da API
}

export interface IChapterNovel {
  proxima: string;
  anterior: string;
  data: IChapterNovelData;
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
  proximo: string;
  anterior: string;
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

// GENRES
export interface IPublicGenres {
  id: string;
  descricao: string;
  slug: string;
}
