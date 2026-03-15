import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse, PaginatedResponse } from '@/core/api/types';

import {
  getChapterComicBySlug,
  getChaptersComic,
  getComicBySlug,
  getComics,
} from '../api/comicApi';
import {
  IChapterComic,
  IImageChapterComic,
  IImageChapterComicPayload,
  IPublicComic,
  IPublicComics,
} from '../api/types';

export const usePublicComics = (): UseQueryResult<
  PaginatedResponse<IPublicComics>
> => {
  return useQuery({
    queryKey: ['public-comics'],
    queryFn: async () => {
      const response = await getComics();
      if (!response.ok) throw new Error('Erro ao carregar as comics');
      return response.data;
    },
  });
};

export const usePublicComicSlug = (
  slug: string,
): UseQueryResult<ApiResponse<IPublicComic>> => {
  return useQuery({
    queryKey: ['public-comic-slug', slug],
    queryFn: () => getComicBySlug(slug),
    enabled: !!slug,
  });
};

export const useChapterComic = (
  comicSlug: string,
): UseQueryResult<ApiResponse<IChapterComic>> => {
  return useQuery({
    queryKey: ['chapters-comic', comicSlug],
    queryFn: () => getChaptersComic(comicSlug),
    enabled: !!comicSlug,
  });
};

export const usePublicComicAndChapterBySlug = (
  slugComic: string,
  slugChapter: string,
): UseQueryResult<
  ApiResponse<IImageChapterComic | IImageChapterComicPayload>
> => {
  return useQuery({
    queryKey: ['public-comic-chapter', slugComic, slugChapter],
    queryFn: () => getChapterComicBySlug(slugComic, slugChapter),
    enabled: !!slugComic && !!slugChapter,
  });
};
