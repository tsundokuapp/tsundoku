// ----------------COMICS----------------

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ApiResponse,
  ErrorResponse,
  IComicResponse,
  INovelResponse,
  IPrivateComics,
} from '@/@types/Api';
import { createComicService, getPrivateComics } from '@/services/ComicService';
import { getAdminNovelBySlug } from '@/services/NovelService';

export const usePrivateComics = (): UseQueryResult<
  ApiResponse<IPrivateComics>
> => {
  return useQuery({
    queryKey: ['private-comics'],
    queryFn: getPrivateComics,
  });
};

export const createComic = async (
  data: FormData,
): Promise<IComicResponse | ErrorResponse> => {
  return createComicService(data);
};

export const useAdminNovelBySlug = (
  slug: string,
): UseQueryResult<INovelResponse> => {
  return useQuery({
    queryKey: ['adm-novels-slug', slug],
    queryFn: () => getAdminNovelBySlug(slug),
    enabled: !!slug,
  });
};
