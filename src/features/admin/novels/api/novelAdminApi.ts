import { AxiosResponse } from 'axios';

import { apiPrivate as api } from '@/core/api';
import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { IChapterNovel, IChapterNovelResponse, INovelResponse } from './types';

export const getAdminNovelBySlug = async (
  slug: string,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    const { data } = await api.get(`/admin/obra/novel/slug/${slug}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const updateNovelService = async (
  dataRequest: FormData,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    const { data }: AxiosResponse<INovelResponse> = await api.put(
      '/admin/obra/novel',
      dataRequest,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const createNovelService = async (
  dataRequest: FormData,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    const { data }: AxiosResponse<INovelResponse> = await api.post(
      '/admin/obra/novel',
      dataRequest,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const deleteNovelService = async (
  id: string,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(`/admin/obra/novel/${id}/true`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const createNovelVolume = async (
  dataRequest: FormData,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    const { data }: AxiosResponse<INovelResponse> = await api.post(
      '/admin/volume/novel',
      dataRequest,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const updateNovelVolume = async (
  dataRequest: FormData,
  idVolume?: string,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    if (idVolume && !dataRequest.has('id')) {
      dataRequest.append('id', idVolume);
    }
    const currentUsername = useAuthStore.getState().username || 'admin';
    if (!dataRequest.has('usuarioAlteracao')) {
      dataRequest.append('usuarioAlteracao', currentUsername);
    }
    const { data }: AxiosResponse<INovelResponse> = await api.put(
      '/admin/volume/novel/',
      dataRequest,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const deleteNovelVolume = async (
  idVolume: string,
): Promise<ApiResponse<INovelResponse>> => {
  try {
    const { data } = await api.delete(`/admin/volume/novel/${idVolume}/true`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const createNovelChapter = async (
  dataRequest: FormData,
): Promise<ApiResponse<IChapterNovelResponse>> => {
  try {
    const { data }: AxiosResponse<IChapterNovelResponse> = await api.post(
      '/admin/capitulo/novel/',
      dataRequest,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const getPrivateNovels = async (): Promise<
  ApiResponse<PaginatedResponse<INovelResponse>>
> => {
  try {
    const { data } = await api.get('/admin/obra/novels?take=12');
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const getChapterNovelAdmin = async (
  slugChapter: string,
): Promise<ApiResponse<IChapterNovel>> => {
  try {
    const { data } = await api.get(`/admin/capitulo/novel/${slugChapter}`);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const updateChapterNovel = async (
  idChapter: string,
  dataRequest: FormData,
): Promise<ApiResponse<IChapterNovelResponse>> => {
  try {
    if (!dataRequest.has('id')) {
      dataRequest.append('id', idChapter);
    }
    const currentUsername = useAuthStore.getState().username || 'admin';
    if (!dataRequest.has('usuarioAlteracao')) {
      dataRequest.append('usuarioAlteracao', currentUsername);
    }
    const { data } = await api.put('/admin/capitulo/novel/', dataRequest);
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};

export const deleteNovelChapter = async (
  id: string,
  arquivoLocal?: boolean,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(
      `/admin/capitulo/novel/${id}/${arquivoLocal ?? true}`,
    );
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      error: handleApiError(error),
    };
  }
};
