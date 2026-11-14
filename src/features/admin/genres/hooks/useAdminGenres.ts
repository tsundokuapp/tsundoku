import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import {
  createAdminGenre,
  deleteAdminGenre,
  getAdminGenres,
  updateAdminGenre,
} from '../api/genreAdminApi';

export const useAdminGenres = () => {
  const { accessToken, isPending } = useAuthStore();

  return useQuery({
    queryKey: ['admin-genres'],
    queryFn: getAdminGenres,
    enabled: !!accessToken && !isPending,
  });
};

export const useCreateAdminGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-genres'] });
      queryClient.invalidateQueries({ queryKey: ['public-genres'] });
    },
  });
};

export const useUpdateAdminGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, descricao }: { id: string; descricao: string }) =>
      updateAdminGenre(id, descricao),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-genres'] });
      queryClient.invalidateQueries({ queryKey: ['public-genres'] });
    },
  });
};

export const useDeleteAdminGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-genres'] });
      queryClient.invalidateQueries({ queryKey: ['public-genres'] });
    },
  });
};
