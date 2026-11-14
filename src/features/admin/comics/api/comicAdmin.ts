import { apiPrivate as api } from '@/core/api';
import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { IComicResponse, IPrivateComics } from './types';

export const getPrivateComics = async (): Promise<
  ApiResponse<PaginatedResponse<IPrivateComics>>
> => {
  try {
    const { data } = await api.get('/admin/obra/comics?take=12');
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const updateComicService = async (
  dataRequest: FormData,
): Promise<ApiResponse<IComicResponse>> => {
  try {
    const { data } = await api.put('/admin/obra/comic', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const createComicService = async (
  dataRequest: FormData,
): Promise<ApiResponse<IComicResponse>> => {
  try {
    const { data } = await api.post('/admin/obra/comic', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const deleteComicService = async (
  id: string,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(`/admin/obra/comic/${id}/true`);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const getAdminComicBySlug = async (
  slug: string,
): Promise<ApiResponse<IComicResponse>> => {
  try {
    const { data } = await api.get(`/admin/obra/comic/slug/${slug}`);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const createComicVolume = async (
  dataRequest: FormData,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.post('/admin/volume/comic/', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const updateComicVolume = async (
  idVolume: string,
  dataRequest: FormData,
): Promise<ApiResponse<unknown>> => {
  try {
    if (!dataRequest.has('id')) {
      dataRequest.append('id', idVolume);
    }
    const currentUsername = useAuthStore.getState().username || 'admin';
    if (!dataRequest.has('usuarioAlteracao')) {
      dataRequest.append('usuarioAlteracao', currentUsername);
    }
    const { data } = await api.put('/admin/volume/comic/', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const deleteComicVolume = async (
  idVolume: string,
  arquivoLocal?: boolean,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(
      `/admin/volume/comic/${idVolume}/${arquivoLocal ?? true}`,
    );
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const createComicChapter = async (
  dataRequest: FormData,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.post('/admin/capitulo/comic/', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const updateComicChapter = async (
  idChapter: string,
  dataRequest: FormData,
): Promise<ApiResponse<unknown>> => {
  try {
    if (!dataRequest.has('id')) {
      dataRequest.append('id', idChapter);
    }
    const currentUsername = useAuthStore.getState().username || 'admin';
    if (!dataRequest.has('usuarioAlteracao')) {
      dataRequest.append('usuarioAlteracao', currentUsername);
    }
    const { data } = await api.put('/admin/capitulo/comic/', dataRequest);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const deleteComicChapter = async (
  idChapter: string,
  arquivoLocal?: boolean,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(
      `/admin/capitulo/comic/${idChapter}/${arquivoLocal ?? true}`,
    );
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};

export const getChapterComicAdmin = async (
  idOrSlug: string,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.get(`/admin/capitulo/comic/${idOrSlug}`);
    return { ok: true, data };
  } catch (error) {
    console.error(error);
    return { ok: false, error: handleApiError(error) };
  }
};
