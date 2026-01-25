import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse, PaginatedResponse } from '@/core/api/types';

import {
  getAdminNovelBySlug,
  getAdminNovels,
  getChapterNovelAdmin,
} from '../api/novelAdminApi';
import { IChapterNovelData, INovelResponse } from '../api/types';

export const useAdminNovelBySlug = (
  slug: string,
): UseQueryResult<INovelResponse> => {
  return useQuery({
    queryKey: ['adm-novels-slug', slug],
    queryFn: () => getAdminNovelBySlug(slug),
    enabled: !!slug,
  });
};

export const useAdminNovels = (): UseQueryResult<
  ApiResponse<PaginatedResponse<INovelResponse>>
> => {
  return useQuery({
    queryKey: ['adm-novels'],
    queryFn: () => getAdminNovels(),
  });
};

export const useAdminChapterNovel = (
  slugChapter: string,
): UseQueryResult<IChapterNovelData> => {
  return useQuery({
    queryKey: ['chapter-novel', slugChapter],
    queryFn: () => getChapterNovelAdmin(slugChapter),
    enabled: !!slugChapter,
  });
};
