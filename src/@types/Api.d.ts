import { TNacionality, TStatusComic, TStatusNovel, TTypeWork } from './System';

export interface ApiResponse<T> {
  data: T[];
  proxima: string;
  anterior: string;
  total: number;
}

export interface ErrorResponse {
  message: {
    errors: Record<string, string[]>;
    status: number;
    title: string;
  };
  statusCode: number;
}

export interface ApiResponseChapter<T> {
  data: T;
  proxima: string;
  anterior: string;
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
  tituloVolume: string;
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
  urlBanner: string;
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

export interface IPrivateComics {
  publicado: boolean;
  urlCapa: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  autor: string;
  artista: string;
  statusObra: TStatusComic;
  listaGeneros: IGenres[];
  descritivoVolume?: string;
  slug: string;
  tipoObra: string;
  id: string;
  ano: string;
  usuarioInclusao: string;
  usuarioAlteracao: string;
  imagemCapaPrincipal: string; // url
  sinopse: string;
  dataInclusao: string; // 19/06/2025 02:23:45
  dataAlteracao: string;
  ehObraMaiorIdade: boolean;
  ehRecomendacao: boolean;
  codigoCorHexaObra: string; // #ffffff
  cargoObraDiscord: string;
  imagemBanner: string; // url
  statusObra: TStatusComic;
  tipoObra: TTypeWork;
  nacionalidade: TNacionality;
  generos: IGenres[];
  diretorioImagemObra: string; // depreciado
  integracaoDiscord: boolean;
  publicado: boolean;
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

// GENRES
export interface IPublicGenres {
  id: string;
  descricao: string;
  slug: string;
}

// SEARCH

export interface IWorkData {
  id: string;
  slug: string;
  titulo: string;
  alias: string;
  capa: string;
  tipo: 'Manga' | 'Manhwa' | 'Light Novel' | 'Web Novel' | 'Manhua';
  sinopse: string;
}

export interface IWork {
  total: number;
  data: IWorkData[];
}

// ADMIN

export interface INovelResponse {
  // TODO: validar esses dois campos em um middleware
  statusCode?: number;
  message?: string;

  // campos reais
  id: string;
  imagemBanner?: string;
  imagemCapaPrincipal?: string;
  titulo: string;
  tituloAlternativo: string;
  alias: string;
  autor: string;
  artista: string;
  ano: string;
  slug: string;
  usuarioInclusao: string;
  usuarioAlteracao: string;
  imagemCapaPrincipal: string;
  sinopse: string;
  dataInclusao: string;
  dataAlteracao: string;
  ehObraMaiorIdade: boolean;
  ehRecomendacao: boolean;
  codigoCorHexaObra: string;
  cargoObraDiscord: string;
  statusObraSlug: string;
  tipoObraSlug: string;
  nacionalidadeSlug: string;
  statusObra: TStatusNovel;

  tipoObra: string;
  nacionalidade: string;
  generos: IGenres[];
  diretorioImagemObra: string;
  publicado: boolean;
}

export interface IComicResponse {
  // TODO: validar esses dois campos em um middleware
  statusCode?: number;
  message?: string;

  // campos reais
  id: string;
  titulo: string;
  tituloAlternativo: string;
  alias: string;
  autor: string;
  artista: string;
  ano: string;
  slug: string;
  usuarioInclusao: string;
  usuarioAlteracao: string;
  imagemCapaPrincipal: string;
  sinopse: string;
  dataInclusao: string;
  dataAlteracao: string;
  ehObraMaiorIdade: boolean;
  ehRecomendacao: boolean;
  codigoCorHexaObra: string;
  cargoObraDiscord: string;
  statusObraSlug: string;
  tipoObraSlug: string;
  nacionalidadeSlug: string;
  statusObra: TStatusComic;

  tipoObra: string;
  nacionalidade: string;
  generos: IGenres[];
  diretorioImagemObra: string;
}
