import axios, { AxiosResponse } from 'axios';

import {
  ErrorResponse,
  IChapterComicData,
  IChapterNovelData,
  IImageChapterComic,
  INovelResponse,
  IPublicNovel,
  IPublicNovels,
  IVolumesNovel,
} from '@/@types/Api';

import { api } from './api';

interface IChapterNovel {
  total: number;
  data: IChapterNovelData;
}

interface IChapterComic {
  total: number;
  data: IChapterComicData;
}

export const getNovels = async (): Promise<IPublicNovels[]> => {
  try {
    const response = await api.get('/obras/novels?take=999');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNovelBySlug = async (slug: string): Promise<IPublicNovel> => {
  try {
    const response = await api.get(`/obras/novel/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IPublicNovel;
  }
};

export const getVolumesNovel = async (
  idNovel: string,
): Promise<IVolumesNovel> => {
  try {
    const response = await api.get(`/obras/volume/indice?IdObra=${idNovel}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IVolumesNovel;
  }
};

export const getChapterNovel = async (
  slugNovel: string,
  slugChapter: string,
): Promise<IChapterNovel> => {
  try {
    const response = await api.get(`/novels/${slugNovel}/${slugChapter}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IChapterNovel;
  }
};

export const getVolumesNovelBySlug = async (
  slugNovel: string,
): Promise<IVolumesNovel[]> => {
  try {
    const response = await api.get(`/novels/volumes/slug/${slugNovel}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getChaptersComic = async (
  slugComic: string,
): Promise<IChapterComic[]> => {
  try {
    const response = await api.get(`/comics/slug/${slugComic}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getChapterComicBySlug = async (
  slugComic: string,
  slugChapter: string,
): Promise<IImageChapterComic> => {
  try {
    const response = await api.get(`/comics/${slugComic}/${slugChapter}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IImageChapterComic;
  }
};

// ---------ADMIN NOVELS----------------

export const getAdminNovelBySlug = async (
  slug: string,
): Promise<INovelResponse> => {
  try {
    const response = await api.get(`/admin/obra/novel/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as INovelResponse;
  }
};

export const updateNovel = async (
  data: FormData,
): Promise<INovelResponse | ErrorResponse> => {
  try {
    const response: AxiosResponse<INovelResponse> = await api.put(
      '/admin/obra/novel',
      data,
    );
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
      message: {
        errors: {},
        status: 500,
        title: 'Erro desconhecido',
      },
      statusCode: 500,
    };
  }
};
