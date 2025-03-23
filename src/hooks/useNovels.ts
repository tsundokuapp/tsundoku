import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { ApiResponse, IGenres } from '@/@types/Api';
import { api } from '@/services/api';

interface ErrorResponse {
  message: string;
  statusCode: number;
}

interface INovelResponse {
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
  statusObra: string;

  tipoObra: string;
  nacionalidade: string;
  generos: IGenres[];
  diretorioImagemObra: string;
}

const getAdminNovels = async (): Promise<INovelResponse[]> => {
  try {
    const response = await api.get('/admin/obra/novels');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getAdminNovelBySlug = async (slug: string): Promise<INovelResponse> => {
  try {
    const response = await api.get(`/admin/obra/novel/slug/${slug}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as INovelResponse;
  }
};

export const useAdminNovels = (): UseQueryResult<
  ApiResponse<INovelResponse>
> => {
  return useQuery({
    queryKey: ['adm-novels'],
    queryFn: getAdminNovels,
  });
};

export const createNovel = async (
  data: FormData,
): Promise<INovelResponse | ErrorResponse> => {
  try {
    const response: AxiosResponse<INovelResponse> = await api.post(
      '/admin/obra/novel',
      data,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data,
        statusCode: error.response.status,
      };
    }
    return {
      message: 'Erro desconhecido',
      statusCode: 500,
    };
  }
};

export const useAdminNovelSlug = (
  slug: string,
): UseQueryResult<INovelResponse> => {
  return useQuery({
    queryKey: ['adm-novels-slug', slug],
    queryFn: () => getAdminNovelBySlug(slug),
    enabled: !!slug,
  });
};
