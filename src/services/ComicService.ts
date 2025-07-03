import { IPublicComic, IPublicComics } from '@/@types/Api';

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
