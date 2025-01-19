import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { api } from '@/services/api';
import { ApiResponse } from '@/types/Api';

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
