import { IGenres } from '@/shared/types/common';

import { TStatusNovel } from '@/shared/types/system';

export interface IAdminNovels {
  urlCapa: string;
  alias: string;
  titulo: string;
  autor: string;
  statusObra: TStatusNovel;
  listaGeneros: IGenres[];
  descritivoVolume?: string;
  slug: string;
  tipoObraSlug: string;
  tipoObra: string;
  id: string;
}

export interface IChapterNovelResponse {
  id: string;
  usuarioAlteracao: string;
  dataInclusao: string; // '05/04/2025 15:26:19'
  dataAlteracao: string;
  ordemCapitulo: number;
  ehIlustracoesNovel: boolean;
  volumeId: string;
  publicado: boolean;
  slug: string;
  [key: string]: string | number | boolean; // parâmetro enviado na requisição
}

export interface INovelResponse {
  id: string;
  imagemBanner?: string;
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
  proxima: string;
  anterior: string;
  data: IChapterNovelData;
}
