import { api } from '@/core/api';
import { ApiResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';

import {
  IChapterComic,
  IImageChapterComic,
  IPublicComic,
  IPublicComics,
} from './types';

export const getChaptersComic = async (
  slugComic: string,
): Promise<ApiResponse<IChapterComic>> => {
  try {
    const { data } = await api.get(`/comics/slug/${slugComic}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getChapterComicBySlug = async (
  slugComic: string,
  slugChapter: string,
): Promise<ApiResponse<IImageChapterComic>> => {
  try {
    const { data } = await api.get(`/comics/${slugComic}/${slugChapter}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getComics = async (): Promise<ApiResponse<IPublicComics[]>> => {
  try {
    const { data } = await api.get('/obras/comics?take=999');
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getComicBySlug = async (
  slug: string,
): Promise<ApiResponse<IPublicComic>> => {
  try {
    const { data } = await api.get(`/obras/comic/slug/${slug}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};
