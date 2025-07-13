import axios, { AxiosResponse } from 'axios';

import {
  IComicResponse,
  IPrivateComics,
  IPublicComic,
  IPublicComics,
} from '@/@types/Api';

import { api } from './api';

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

export const createComicService = async (data: FormData) => {
  try {
    const response: AxiosResponse<IComicResponse> = await api.post(
      '/admin/obra/comic',
      data,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data,
        statusCode: error.response.status,
      };
    }
    return {
      message: 'Erro desconhecido',
      statusCode: 500,
    };
  }
};
