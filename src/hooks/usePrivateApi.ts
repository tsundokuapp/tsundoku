// ----------------COMICS----------------

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  IChapterNovelData,
  IChapterNovelUpdateRetorn,
  IComicResponse,
  INovelResponse,
  IPrivateComics,
} from '@/@types/Api';
import { ApiResponse } from '@/@types/api/Response';
import {
  createComicService,
  getAdminComicBySlug,
  getPrivateComics,
} from '@/services/comic/ComicService';
import {
  createNovelService,
  getAdminNovelBySlug,
  getAdminNovels,
  getChapterNovelAdmin,
  updateChapterNovel,
} from '@/services/novel/NovelService';

export const usePrivateComics = (): UseQueryResult<
  ApiResponse<IPrivateComics>
> => {
  return useQuery({
    queryKey: ['private-comics'],
    queryFn: getPrivateComics,
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

// ----------------NOVELS----------------

export const useAdminNovelBySlug = (
  slug: string,
): UseQueryResult<INovelResponse> => {
  return useQuery({
    queryKey: ['adm-novels-slug', slug],
    queryFn: () => getAdminNovelBySlug(slug),
    enabled: !!slug,
  });
};

export const createNovel = async (data: FormData) => {
  return createNovelService(data);
};

export const useAdminNovels = (): UseQueryResult<
  ApiResponse<INovelResponse>
> => {
  return useQuery({
    queryKey: ['adm-novels'],
    queryFn: getAdminNovels,
  });
};

export const useAdminChapterNovel = (
  slugChapter: string,
): UseQueryResult<IChapterNovelData> => {
  return useQuery({
    queryKey: ['chapter-novel', slugChapter],
    queryFn: () => getChapterNovelAdmin(slugChapter),
    enabled: !!slugChapter,
  });
};

export const useAdminUpdateChapterNovel = async (
  idChapter: string,
  data: FormData,
): Promise<IChapterNovelUpdateRetorn> => {
  return updateChapterNovel(idChapter, data);
};
