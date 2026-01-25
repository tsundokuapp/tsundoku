import { api } from '@/core/api';
import { PaginatedResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';

import {
  IProjectRecomendations,
  IProjectsHome,
  IPublicGenres,
  IWork,
} from './types';
export const getProjects = async (): Promise<ApiResult<IProjectsHome[]>> => {
  try {
    const { data } = await api.get('/obras/home');
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const getRecomendations = async (): Promise<
  ApiResult<IProjectRecomendations[]>
> => {
  try {
    const { data } = await api.get('/obras/recomendadas');
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const getGenres = async (): Promise<
  ApiResult<PaginatedResponse<IPublicGenres[]>>
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
): Promise<ApiResult<IWork>> => {
  try {
    const { data } = await api.get(
      `/obras/pesquisa?obra=${encodeURIComponent(searchTerm)}`,
    );
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};
