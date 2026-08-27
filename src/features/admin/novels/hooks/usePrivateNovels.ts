import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ApiResponse, PaginatedResponse } from '@/core/api/types';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import {
  getAdminNovelBySlug,
  getPrivateNovels,
  getChapterNovelAdmin,
} from '../api/novelAdminApi';
import { IChapterNovelData, INovelResponse } from '../api/types';

export const useAdminNovelBySlug = (
  slug: string,
): UseQueryResult<ApiResponse<INovelResponse>> => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['adm-novels-slug', slug],
    queryFn: () => getAdminNovelBySlug(slug),
    enabled: !!slug && !!accessToken && !isPending,
  });
};

export const usePrivateNovels = (): UseQueryResult<
  ApiResponse<PaginatedResponse<INovelResponse>>
> => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['private-novels'],
    queryFn: () => getPrivateNovels(),
    enabled: !!accessToken && !isPending,
  });
};

export const useAdminChapterNovel = (
  slugChapter: string,
): UseQueryResult<ApiResponse<IChapterNovelData>> => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['chapter-novel', slugChapter],
    queryFn: () => getChapterNovelAdmin(slugChapter),
    enabled: !!slugChapter && !!accessToken && !isPending,
  });
};
