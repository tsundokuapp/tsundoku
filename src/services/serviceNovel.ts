import {
  IChapterNovelData,
  IPublicNovel,
  IPublicNovels,
  IVolumesNovel,
} from '@/@types/Api';

import { api } from './api';

interface IChapterNovel {
  total: number;
  data: IChapterNovelData;
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
    const response = await api.get(`/admin/volume/novel?IdObra=${idNovel}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IVolumesNovel;
  }
};

export const getChapterNovel = async (
  idChapter: string,
): Promise<IChapterNovel> => {
  try {
    const response = await api.get(`/admin/capitulo/novel/${idChapter}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {} as IChapterNovel;
  }
};
