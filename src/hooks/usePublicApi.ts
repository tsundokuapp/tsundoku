import { useQuery, UseQueryResult } from '@tanstack/react-query';

import {
  ApiResponse,
  ApiResponseChapter,
  IChapterComic,
  IChapterNovel,
  IImageChapterComic,
  IProjectRecomendations,
  IProjectsHome,
  IPublicComic,
  IPublicComics,
  IPublicGenres,
  IPublicNovel,
  IPublicNovels,
  IVolumesNovel,
  IWork,
} from '@/@types/Api';
import { IVolumeNovelApiPublic } from '@/@types/Volume';
import { getComicBySlug, getComics } from '@/services/ComicService';
import {
  getChapterComicBySlug,
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
  getWorksBySearch,
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

export const usePublicGenres = (): UseQueryResult<
  ApiResponse<IPublicGenres>
> => {
  return useQuery({
    queryKey: ['public-genres'],
    queryFn: getGenres,
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
  slugChapter: string,
): UseQueryResult<IChapterNovel> => {
  return useQuery({
    queryKey: ['chapter-novel', slugChapter],
    queryFn: () => getChapterNovel(slugNovel, slugChapter),
    enabled: !!slugChapter,
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

export const usePublicComicAndChapterBySlug = (
  slugComic: string,
  slugChapter: string,
): UseQueryResult<ApiResponseChapter<IImageChapterComic>> => {
  return useQuery({
    queryKey: ['public-comic-chapter', slugComic, slugChapter],
    queryFn: () => getChapterComicBySlug(slugComic, slugChapter),
    enabled: !!slugComic && !!slugChapter,
  });
};

export const usePublicSearchWorks = (
  searchTerm: string,
): UseQueryResult<IWork> => {
  return useQuery({
    queryKey: ['public-search-works', searchTerm],
    queryFn: () => getWorksBySearch(searchTerm),
    enabled: !!searchTerm,
  });
};
