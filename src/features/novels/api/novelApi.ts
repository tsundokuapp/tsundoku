import { api } from '@/core/api';
import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';

import {
  IChapterNovel,
  IPublicNovels,
  IVolumesNovel,
  IPublicNovel,
} from './types';

export const getNovels = async (): Promise<
  ApiResponse<PaginatedResponse<IPublicNovels>>
> => {
  try {
    const { data } = await api.get('/obras/novels?take=999');
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getNovelBySlug = async (
  slug: string,
): Promise<ApiResponse<IPublicNovel>> => {
  try {
    const { data } = await api.get(`/obras/novel/slug/${slug}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getVolumesNovel = async (
  idNovel: string,
): Promise<ApiResponse<IVolumesNovel>> => {
  try {
    const { data } = await api.get(`/obras/volume/indice?IdObra=${idNovel}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getChapterNovel = async (
  slugNovel: string,
  slugChapter: string,
): Promise<ApiResponse<IChapterNovel>> => {
  try {
    const { data } = await api.get(`/novels/${slugNovel}/${slugChapter}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getVolumesNovelBySlug = async (
  slugNovel: string,
): Promise<ApiResponse<IVolumesNovel[]>> => {
  try {
    const { data } = await api.get(`/novels/volumes/slug/${slugNovel}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};
