import { api } from '@/core/api';
import { handleApiError } from '@/core/api/util';
import { IComicResponse, IPrivateComics } from './types';
import { ApiResponse, PaginatedResponse } from '@/core/api/types';

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
