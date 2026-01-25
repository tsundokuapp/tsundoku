import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse, PaginatedResponse } from '@/core/api/types';

import {
  createComicService,
  getAdminComicBySlug,
  getPrivateComics,
} from '../api/comicAdmin';
import { IComicResponse, IPrivateComics } from '../api/types';

export const usePrivateComics = (): UseQueryResult<
  ApiResponse<PaginatedResponse<IPrivateComics>>
> => {
  return useQuery({
    queryKey: ['private-comics'],
    queryFn: () => getPrivateComics(),
  });
};

export const createComic = async (data: FormData) => {
  return createComicService(data);
};

export const useAdminComicBySlug = (
  slug: string,
): UseQueryResult<IComicResponse> => {
  return useQuery({
    queryKey: ['adm-comics-slug', slug],
    queryFn: () => getAdminComicBySlug(slug),
    enabled: !!slug,
  });
};
