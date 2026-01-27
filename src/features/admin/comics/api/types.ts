import { IGenres } from '@/shared/types/common';
import { TNacionality, TStatusComic, TTypeWork } from '@/shared/types/system';

export interface IPrivateComics {
  urlCapa: string;
  alias: string;
  titulo: string;
  tituloAlternativo: string;
  autor: string;
  artista: string;
  listaGeneros: IGenres[];
  descritivoVolume?: string;
  slug: string;
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
  integracaoDiscord: boolean;
  publicado: boolean;
}

export interface IComicResponse {
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
  publicado: boolean;
  imagemBanner: string;

  tipoObra: string;
  nacionalidade: string;
  generos: IGenres[];
  diretorioImagemObra: string;
}
