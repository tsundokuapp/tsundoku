import {
  IChapterComicData,
  IChapterNovelData,
  IImageChapterComic,
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
    const response = await api.get('/obras/novels');
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
  idChapter: string,
): Promise<IChapterNovel> => {
  try {
    const response = await api.get(`/novels/slug/${slugNovel}/${idChapter}`);
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
