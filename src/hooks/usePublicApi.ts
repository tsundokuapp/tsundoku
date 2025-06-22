import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ApiResponse,
  IChapterComic,
  IChapterNovel,
  IProjectRecomendations,
  IProjectsHome,
  IPublicComic,
  IPublicComics,
  IPublicGenres,
  IPublicNovel,
  IPublicNovels,
  IVolumesNovel,
} from '@/@types/Api';
import { IVolumeNovelApiPublic } from '@/@types/Volume';
import { getComicBySlug, getComics } from '@/services/ComicService';
import {
  getChapterNovel,
  getChaptersComic,
  getNovelBySlug,
  getNovels,
  getVolumesNovel,
  getVolumesNovelBySlug,
} from '@/services/NovelService';
import {
  getGenres,
  getProjects,
  getRecomendations,
} from '@/services/ProjectService';

export const useRecomendations = (): UseQueryResult<
  ApiResponse<IProjectRecomendations>
> => {
  return useQuery({
    queryKey: ['recomendations'],
    queryFn: getRecomendations,
  });
};

export const useProjects = (): UseQueryResult<ApiResponse<IProjectsHome>> => {
  return useQuery({
    queryKey: ['projects-home'],
    queryFn: getProjects,
  });
};

// ----------------NOVELS----------------

export const usePublicNovels = (): UseQueryResult<
  ApiResponse<IPublicNovels>
> => {
  return useQuery({
    queryKey: ['public-novels'],
    queryFn: getNovels,
  });
};

export const usePublicNovelSlug = (
  slug: string,
): UseQueryResult<IPublicNovel> => {
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
    queryFn: () => getVolumesNovel(idNovel),
    enabled: !!idNovel,
  });
};

export const useChapterNovel = (
  slugNovel: string,
  idChapter: string,
): UseQueryResult<IChapterNovel> => {
  return useQuery({
    queryKey: ['chapter-novel', idChapter],
    queryFn: () => getChapterNovel(slugNovel, idChapter),
    enabled: !!idChapter,
  });
};

// ----------------COMICS----------------

export const usePublicComics = (): UseQueryResult<
  ApiResponse<IPublicComics>
> => {
  return useQuery({
    queryKey: ['public-comics'],
    queryFn: getComics,
  });
};

export const usePublicComicSlug = (
  slug: string,
): UseQueryResult<IPublicComic> => {
  return useQuery({
    queryKey: ['public-comic-slug', slug],
    queryFn: () => getComicBySlug(slug),
    enabled: !!slug,
  });
};

export const usePublicGenres = (): UseQueryResult<
  ApiResponse<IPublicGenres>
> => {
  return useQuery({
    queryKey: ['public-genres'],
    queryFn: getGenres,
  });
};

export const usePublicVolumesNovelBySlug = (
  slugNovel: string,
): UseQueryResult<ApiResponse<IVolumeNovelApiPublic>> => {
  return useQuery({
    queryKey: ['volumes-novel-slug', slugNovel],
    queryFn: () => getVolumesNovelBySlug(slugNovel),
    enabled: !!slugNovel,
  });
};

export const useChapterComic = (
  comicSlug: string,
): UseQueryResult<IChapterComic> => {
  return useQuery({
    queryKey: ['chapters-comic', comicSlug],
    queryFn: () => getChaptersComic(comicSlug),
    enabled: !!comicSlug,
  });
};
