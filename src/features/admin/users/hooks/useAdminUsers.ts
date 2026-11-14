import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  updateUserRole,
} from '../api/userAdminApi';
import { ICreateUserForm } from '../types/userAdmin';

export const ADMIN_USERS_QUERY_KEY = ['admin-users'];

export function useAdminUsers() {
  return useQuery({
    queryKey: ADMIN_USERS_QUERY_KEY,
    queryFn: getAdminUsers,
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateUserForm) => createAdminUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      newRole,
      oldRoles,
    }: {
      userId: number | string;
      newRole: string;
      oldRoles: string[];
    }) => updateUserRole(userId, newRole, oldRoles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number | string) => deleteAdminUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_QUERY_KEY });
    },
  });
}
