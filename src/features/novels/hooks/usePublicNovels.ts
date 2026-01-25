import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse } from '@/core/api/types';
import { IVolumeNovelApiPublic } from '@/features/admin/novels/types/Volume';

import {
  getChapterNovel,
  getNovelBySlug,
  getNovels,
  getVolumesNovel,
  getVolumesNovelBySlug,
} from '../api/novelApi';
import {
  IChapterNovel,
  IPublicNovel,
  IPublicNovels,
  IVolumesNovel,
} from '../api/types';

export const usePublicNovels = (): UseQueryResult<IPublicNovels[]> => {
  return useQuery({
    queryKey: ['public-novels'],
    queryFn: async () => {
      const result = await getNovels();
      if (!result.ok) throw result.error;
      return result.data.data;
    },
  });
};

export const usePublicNovelSlug = (
  slug: string,
): UseQueryResult<ApiResponse<IPublicNovel>> => {
  return useQuery({
    queryKey: ['public-novel-slug', slug],
    queryFn: () => getNovelBySlug(slug),
    enabled: !!slug,
  });
};

export const useVolumesNovel = (
  idNovel: string,
): UseQueryResult<IVolumesNovel> => {
  return useQuery({
    queryKey: ['volumes-novel', idNovel],
    queryFn: async () => {
      const result = await getVolumesNovel(idNovel);
      if (!result.ok) throw result.error;
      return result.data;
    },
    enabled: !!idNovel,
  });
};

export const useChapterNovel = (
  slugNovel: string,
  slugChapter: string,
): UseQueryResult<ApiResponse<IChapterNovel>> => {
  return useQuery({
    queryKey: ['chapter-novel', slugChapter],
    queryFn: () => getChapterNovel(slugNovel, slugChapter),
    enabled: !!slugChapter,
  });
};

export const usePublicVolumesNovelBySlug = (
  slugNovel: string,
): UseQueryResult<ApiResponse<IVolumeNovelApiPublic>> => {
  return useQuery({
    queryKey: ['volumes-novel-slug', slugNovel],
    queryFn: async () => {
      const result = await getVolumesNovelBySlug(slugNovel);
      if (!result.ok) throw result.error;
      return result.data;
    },
    enabled: !!slugNovel,
  });
};
