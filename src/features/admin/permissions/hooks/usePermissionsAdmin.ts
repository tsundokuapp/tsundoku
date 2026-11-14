import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  assignPermissionToRole,
  createPermission,
  createRole,
  deleteRole,
  getRoleMatrix,
  removePermissionFromRole,
} from '../api/permissionsApi';
import { ICreatePermissaoRequest } from '../types/permissionsAdmin';

export const PERMISSIONS_MATRIX_QUERY_KEY = ['role-permissions-matrix'];

export function usePermissionsMatrix() {
  return useQuery({
    queryKey: PERMISSIONS_MATRIX_QUERY_KEY,
    queryFn: getRoleMatrix,
    staleTime: 1000 * 60 * 2,
  });
}

export function useTogglePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleName,
      permissaoId,
      currentlyGranted,
    }: {
      roleName: string;
      permissaoId: number;
      currentlyGranted: boolean;
    }) => {
      if (currentlyGranted) {
        return removePermissionFromRole(roleName, permissaoId);
      }
      return assignPermissionToRole(roleName, permissaoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_MATRIX_QUERY_KEY });
    },
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleName: string) => createRole(roleName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_MATRIX_QUERY_KEY });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleName: string) => deleteRole(roleName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_MATRIX_QUERY_KEY });
    },
  });
}

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePermissaoRequest) => createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_MATRIX_QUERY_KEY });
    },
  });
}
