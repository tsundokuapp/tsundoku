import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse } from '@/core/api/types';

import {
  getGenres,
  getProjects,
  getRecomendations,
  getWorksBySearch,
} from '../api/projectApi';
import {
  IProjectRecomendations,
  IProjectsHome,
  IPublicGenres,
  IWork,
} from '../api/types';

export const useRecomendations = (): UseQueryResult<
  ApiResponse<IProjectRecomendations[]>
> => {
  return useQuery({
    queryKey: ['recomendations'],
    queryFn: () => getRecomendations(),
  });
};

export const useProjects = (): UseQueryResult<ApiResponse<IProjectsHome[]>> => {
  return useQuery({
    queryKey: ['projects-home'],
    queryFn: () => getProjects(),
  });
};

export const usePublicGenres = (): UseQueryResult<IPublicGenres[]> => {
  return useQuery({
    queryKey: ['public-genres'],
    queryFn: async () => {
      const result = await getGenres();
      if (!result.ok) throw result.error;
      return result.data.data;
    },
  });
};

export const usePublicSearchWorks = (
  searchTerm: string,
): UseQueryResult<IWork[]> => {
  return useQuery({
    queryKey: ['public-search-works', searchTerm],
    queryFn: async () => {
      const result = await getWorksBySearch(searchTerm);
      if (!result.ok) throw result.error;
      return result.data.data;
    },
    enabled: !!searchTerm,
  });
};
