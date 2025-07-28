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
import {
  createNovelService,
  getAdminNovelBySlug,
  getAdminNovels,
} from '@/services/NovelService';

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

export const createNovel = async (
  data: FormData,
): Promise<INovelResponse | ErrorResponse> => {
  return createNovelService(data);
};

export const createVolumeNovel = async (
  data: FormData,
): Promise<INovelResponse | ErrorResponse> => {
  return createVolumeNovelService(data);
};

export const useAdminNovels = (): UseQueryResult<
  ApiResponse<INovelResponse>
> => {
  return useQuery({
    queryKey: ['adm-novels'],
    queryFn: getAdminNovels,
  });
};
