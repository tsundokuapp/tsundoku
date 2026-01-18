import axios, { AxiosResponse } from 'axios';

import {
  IComicResponse,
  IPrivateComics,
  IPublicComic,
  IPublicComics,
} from '@/@types/Api';
import { ApiError } from '@/@types/api/Error';

import { api } from '../api/api';

export type ApiResult =
  | { ok: true; data: IComicResponse }
  | { ok: false; error: ApiError };

const unknownErrorDefault: ApiResult = {
  ok: false,
  error: {
    message: {
      errors: {},
      status: 500,
      title: 'Erro desconhecido',
    },
    statusCode: 500,
  },
};

export const getComics = async (): Promise<IPublicComics[]> => {
  try {
    const response = await api.get('/obras/comics?take=999');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getComicBySlug = async (slug: string): Promise<IPublicComic> => {
  try {
    const response = await api.get(`/obras/comic/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IPublicComic;
  }
};

// -------------PRIVATE COMICS----------------

export const getPrivateComics = async (): Promise<IPrivateComics[]> => {
  try {
    const response = await api.get('/admin/obra/comics?take=12');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateComicService = async (
  data: FormData,
): Promise<ApiResult> => {
  try {
    const response: AxiosResponse<IComicResponse> = await api.put(
      '/admin/obra/comic',
      data,
    );
    return { ok: true, data: response.data };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        error: {
          message: error.response.data,
          statusCode: error.response.status,
        },
      };
    }

    return unknownErrorDefault;
  }
};

export const createComicService = async (
  data: FormData,
): Promise<ApiResult> => {
  try {
    const response: AxiosResponse<IComicResponse> = await api.post(
      '/admin/obra/comic',
      data,
    );
    return { ok: true, data: response.data };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        ok: false,
        error: {
          message: error.response.data,
          statusCode: error.response.status,
        },
      };
    }

    return unknownErrorDefault;
  }
};

export const getAdminComicBySlug = async (
  slug: string,
): Promise<IComicResponse> => {
  try {
    const response = await api.get(`/admin/obra/comic/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IComicResponse;
  }
};
