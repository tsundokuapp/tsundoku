import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { api } from '@/services/api';
import { ApiResponse, IGenres, IVolumeNovelData } from '@/types/Api';
import { IStatusNovels } from '@/types/TypesNovels';

interface IRecomendations {
  // TODO: validar esses dois campos em um middleware
  statusCode?: number;
  message?: string;

  titulo: string;
  capa: string;
  slugObra: string;
  sinopse: string;
}

interface IProjectsHome {
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

interface IPublicNovels {
  urlCapa: string;
  alias: string;
  titulo: string;
  autor: string;
  descritivoVolume?: string;
  slug: string;
  tipoObraSlug: string;
  tipoObra: string;
  id: string;
}

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
  statusObra: IStatusNovels;
  sinopse: string;
  observacao: string;
  listaGeneros: IGenres[];
}

interface IVolumesNovel {
  total: number;
  data: IVolumeNovelData[];
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

interface IChapterNovel {
  total: number;
  data: IChapterNovelData;
}

const getRecomendations = async (): Promise<IRecomendations[]> => {
  try {
    const response = await api.get('/obras/recomendadas');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useRecomendations = (): UseQueryResult<
  ApiResponse<IRecomendations>
> => {
  return useQuery({
    queryKey: ['recomendations'],
    queryFn: getRecomendations,
  });
};

const getProjects = async (): Promise<IProjectsHome[]> => {
  try {
    const response = await api.get('/obras/home');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useProjects = (): UseQueryResult<ApiResponse<IProjectsHome>> => {
  return useQuery({
    queryKey: ['projects-home'],
    queryFn: getProjects,
  });
};

const getNovels = async (): Promise<IPublicNovels[]> => {
  try {
    const response = await api.get('/obras/novels');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const usePublicNovels = (): UseQueryResult<
  ApiResponse<IPublicNovels>
> => {
  return useQuery({
    queryKey: ['public-novels'],
    queryFn: getNovels,
  });
};

const getNovelBySlug = async (slug: string): Promise<IPublicNovel> => {
  try {
    const response = await api.get(`/obras/novel/slug/${slug}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IPublicNovel;
  }
};

export const usePublicNovelSlug = (
  slug: string,
): UseQueryResult<IPublicNovel> => {
  return useQuery({
    queryKey: ['public-novel-slug', slug],
    queryFn: () => getNovelBySlug(slug),
    enabled: !!slug,
  });
};

const getVolumesNovel = async (idNovel: string): Promise<IVolumesNovel> => {
  try {
    const response = await api.get(`/admin/volume/novel?IdObra=${idNovel}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IVolumesNovel;
  }
};

export const useVolumesNovel = (
  idNovel: string,
): UseQueryResult<IVolumesNovel> => {
  return useQuery({
    queryKey: ['volumes-novel', idNovel],
    queryFn: () => getVolumesNovel(idNovel),
    enabled: !!idNovel,
  });
};

const getChapterNovel = async (idChapter: string): Promise<IChapterNovel> => {
  try {
    const response = await api.get(`/admin/capitulo/novel/${idChapter}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IChapterNovel;
  }
};

export const useChapterNovel = (
  idChapter: string,
): UseQueryResult<IChapterNovelData> => {
  return useQuery({
    queryKey: ['chapter-novel', idChapter],
    queryFn: () => getChapterNovel(idChapter),
    enabled: !!idChapter,
  });
};
