import {
  useQuery,
  useSuspenseQuery,
  UseQueryResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import { ApiResponse } from '@/core/api/types';

import {
  getGenres,
  getProjects,
  getRecomendations,
  getWorksBySearch,
} from '../api/projectApi';
import {
  IProjectsHome,
  IPublicGenres,
  IWork,
  IProjectRecomendations,
} from '../api/types';

export const useRecomendations = (): UseQueryResult<
  ApiResponse<IProjectRecomendations[]>
> => {
  return useQuery({
    queryKey: ['recomendations'],
    queryFn: () => getRecomendations(),
  });
};

// Versão com Suspense para uso com React Suspense boundaries
export const useRecomendationsSuspense = (): UseSuspenseQueryResult<
  ApiResponse<IProjectRecomendations[]>
> => {
  return useSuspenseQuery({
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

// Versão com Suspense para uso com React Suspense boundaries
export const useProjectsSuspense = (): UseSuspenseQueryResult<
  ApiResponse<IProjectsHome[]>
> => {
  return useSuspenseQuery({
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
      return result.data;
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
