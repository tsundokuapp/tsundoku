import { api } from '@/core/api';
import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';

import {
  IProjectRecomendations,
  IProjectsHome,
  IPublicGenres,
  IWork,
} from './types';
export const getProjects = async (): Promise<ApiResponse<IProjectsHome[]>> => {
  try {
    const { data } = await api.get('/obras/home');
    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const getRecomendations = async (): Promise<
  ApiResponse<IProjectRecomendations>
> => {
  try {
    const { data } = await api.get('/obras/recomendadas');
    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const getGenres = async (): Promise<
  ApiResponse<PaginatedResponse<IPublicGenres[]>>
> => {
  try {
    const { data } = await api.get('/generos');
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getWorksBySearch = async (
  searchTerm: string,
): Promise<ApiResponse<IWork>> => {
  try {
    const { data } = await api.get(
      `/obras/pesquisa?obra=${encodeURIComponent(searchTerm)}`,
    );
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};
