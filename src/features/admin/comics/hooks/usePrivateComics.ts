import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import {
  createComicService,
  getAdminComicBySlug,
  getPrivateComics,
} from '../api/comicAdmin';
import { IComicResponse, IPrivateComics } from '../api/types';

export const usePrivateComics = (): UseQueryResult<
  ApiResponse<PaginatedResponse<IPrivateComics>>
> => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['private-comics'],
    queryFn: () => getPrivateComics(),
    enabled: !!accessToken && !isPending,
  });
};

export const createComic = async (data: FormData) => {
  return createComicService(data);
};

export const useAdminComicBySlug = (
  slug: string,
): UseQueryResult<IComicResponse> => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['adm-comics-slug', slug],
    queryFn: () => getAdminComicBySlug(slug),
    enabled: !!slug && !!accessToken && !isPending,
  });
};
