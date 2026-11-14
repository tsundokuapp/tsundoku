import { apiPrivate as api } from '@/core/api';
import { ApiResponse } from '@/core/api/types';
import { handleApiError } from '@/core/api/util';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import {
  IObjetoRetornoGenerosResponse,
  IRetornoGenero,
} from '../types/genreAdmin';

export const getAdminGenres = async (): Promise<
  ApiResponse<IObjetoRetornoGenerosResponse>
> => {
  try {
    const response = await api.get('/admin/genero');
    // If backend returns 204 or empty string
    if (!response.data || response.status === 204) {
      return { ok: true, data: { data: [] } };
    }
    // If response.data is an array or an object
    const rawData = response.data;
    if (Array.isArray(rawData)) {
      return { ok: true, data: { data: rawData } };
    }
    if (rawData && Array.isArray(rawData.data)) {
      return { ok: true, data: rawData };
    }
    return { ok: true, data: { data: [] } };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const createAdminGenre = async (
  descricao: string,
): Promise<ApiResponse<IRetornoGenero>> => {
  try {
    const currentUsername = useAuthStore.getState().username || 'admin';
    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('usuarioInclusao', currentUsername);
    formData.append('usuarioAlteracao', currentUsername);

    const { data } = await api.post('/admin/genero', formData);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const updateAdminGenre = async (
  id: string,
  descricao: string,
): Promise<ApiResponse<IRetornoGenero>> => {
  try {
    const currentUsername = useAuthStore.getState().username || 'admin';
    const formData = new FormData();
    formData.append('id', id);
    formData.append('descricao', descricao);
    formData.append('usuarioAlteracao', currentUsername);

    const { data } = await api.put('/admin/genero', formData);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};

export const deleteAdminGenre = async (
  id: string,
): Promise<ApiResponse<unknown>> => {
  try {
    const { data } = await api.delete(`/admin/genero/${id}`);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: handleApiError(error) };
  }
};
