import { authPrivate } from '@/core/api';
import { isDevEnvironment } from '@/features/admin/utils/devMock';

import {
  SEED_PERMISSIONS,
  SEED_ROLE_PERMISSIONS,
  SEED_ROLES,
} from '../mocks/permissionsMocks';
import {
  ICreatePermissaoRequest,
  IPermissao,
  IRole,
  IRoleMatrix,
} from '../types/permissionsAdmin';

let devRolesState: IRole[] = [...SEED_ROLES];
let devPermissionsState: IPermissao[] = [...SEED_PERMISSIONS];
let devRolePermissionsState: Record<string, number[]> = {
  ...SEED_ROLE_PERMISSIONS,
};

export function resetDevPermissionsState() {
  devRolesState = [...SEED_ROLES];
  devPermissionsState = [...SEED_PERMISSIONS];
  devRolePermissionsState = { ...SEED_ROLE_PERMISSIONS };
}

export async function getRoles(): Promise<IRole[]> {
  try {
    const res = await authPrivate.get<IRole[]>('roles');
    return res.data || [];
  } catch (err) {
    if (isDevEnvironment()) {
      return [...devRolesState];
    }
    throw err;
  }
}

export async function getPermissions(): Promise<IPermissao[]> {
  try {
    const res = await authPrivate.get<IPermissao[]>('permissoes');
    return res.data || [];
  } catch (err) {
    if (isDevEnvironment()) {
      return [...devPermissionsState];
    }
    throw err;
  }
}

export async function getRolePermissions(
  roleName: string,
): Promise<IPermissao[]> {
  try {
    const res = await authPrivate.get<IPermissao[]>(
      `permissoes/role/${encodeURIComponent(roleName)}`,
    );
    return res.data || [];
  } catch (err) {
    if (isDevEnvironment()) {
      const allowedIds = devRolePermissionsState[roleName.toLowerCase()] || [];
      return devPermissionsState.filter((p) => allowedIds.includes(p.id));
    }
    throw err;
  }
}

export async function getRoleMatrix(): Promise<IRoleMatrix> {
  try {
    const [roles, permissions] = await Promise.all([
      getRoles(),
      getPermissions(),
    ]);

    const rolePermissions: Record<string, number[]> = {};

    await Promise.all(
      roles.map(async (role) => {
        try {
          const perms = await getRolePermissions(role.name);
          rolePermissions[role.name.toLowerCase()] = perms.map((p) => p.id);
        } catch {
          rolePermissions[role.name.toLowerCase()] =
            devRolePermissionsState[role.name.toLowerCase()] || [];
        }
      }),
    );

    return {
      roles,
      permissions,
      rolePermissions,
    };
  } catch (err) {
    if (isDevEnvironment()) {
      return {
        roles: [...devRolesState],
        permissions: [...devPermissionsState],
        rolePermissions: { ...devRolePermissionsState },
      };
    }
    throw err;
  }
}

export async function assignPermissionToRole(
  roleName: string,
  permissaoId: number,
): Promise<{ success: boolean }> {
  try {
    await authPrivate.post(
      `permissoes/role/${encodeURIComponent(roleName)}/permissao/${permissaoId}`,
    );
    if (isDevEnvironment()) {
      const key = roleName.toLowerCase();
      const current = devRolePermissionsState[key] || [];
      if (!current.includes(permissaoId)) {
        devRolePermissionsState[key] = [...current, permissaoId];
      }
    }
    return { success: true };
  } catch (err) {
    if (isDevEnvironment()) {
      const key = roleName.toLowerCase();
      const current = devRolePermissionsState[key] || [];
      if (!current.includes(permissaoId)) {
        devRolePermissionsState[key] = [...current, permissaoId];
      }
      return { success: true };
    }
    throw err;
  }
}

export async function removePermissionFromRole(
  roleName: string,
  permissaoId: number,
): Promise<{ success: boolean }> {
  try {
    await authPrivate.delete(
      `permissoes/role/${encodeURIComponent(roleName)}/permissao/${permissaoId}`,
    );
    if (isDevEnvironment()) {
      const key = roleName.toLowerCase();
      const current = devRolePermissionsState[key] || [];
      devRolePermissionsState[key] = current.filter((id) => id !== permissaoId);
    }
    return { success: true };
  } catch (err) {
    if (isDevEnvironment()) {
      const key = roleName.toLowerCase();
      const current = devRolePermissionsState[key] || [];
      devRolePermissionsState[key] = current.filter((id) => id !== permissaoId);
      return { success: true };
    }
    throw err;
  }
}

export async function createRole(roleName: string): Promise<IRole> {
  const normalized = roleName.trim().toLowerCase();
  try {
    const res = await authPrivate.post('roles', JSON.stringify(normalized), {
      headers: { 'Content-Type': 'application/json' },
    });
    const nextId =
      res.data?.id || Math.max(...devRolesState.map((r) => r.id), 0) + 1;
    const newRole: IRole = {
      id: nextId,
      name: normalized,
    };
    if (isDevEnvironment()) {
      devRolesState = [...devRolesState, newRole];
      devRolePermissionsState[normalized] = [];
    }
    return newRole;
  } catch (err) {
    if (isDevEnvironment()) {
      const nextId = Math.max(...devRolesState.map((r) => r.id), 0) + 1;
      const newRole: IRole = {
        id: nextId,
        name: normalized,
      };
      devRolesState = [...devRolesState, newRole];
      devRolePermissionsState[normalized] = [];
      return newRole;
    }
    throw err;
  }
}

export async function deleteRole(
  roleName: string,
): Promise<{ success: boolean; message?: string }> {
  const normalized = roleName.trim().toLowerCase();
  const SYSTEM_ROLES = ['admin', 'staff', 'tradutor', 'leitor'];
  if (SYSTEM_ROLES.includes(normalized)) {
    return {
      success: false,
      message: `O cargo padrão "${roleName}" não pode ser excluído.`,
    };
  }

  try {
    await authPrivate.delete(`roles/${encodeURIComponent(normalized)}`);
    if (isDevEnvironment()) {
      devRolesState = devRolesState.filter(
        (r) => r.name.toLowerCase() !== normalized,
      );
      delete devRolePermissionsState[normalized];
    }
    return { success: true };
  } catch (err) {
    if (isDevEnvironment()) {
      devRolesState = devRolesState.filter(
        (r) => r.name.toLowerCase() !== normalized,
      );
      delete devRolePermissionsState[normalized];
      return { success: true };
    }
    throw err;
  }
}

export async function createPermission(
  data: ICreatePermissaoRequest,
): Promise<IPermissao> {
  try {
    const res = await authPrivate.post('permissoes', {
      valor: data.valor.trim(),
      descricao: data.descricao.trim(),
    });
    const newPerm: IPermissao = {
      id: res.data?.id || Date.now(),
      valor: data.valor.trim(),
      descricao: data.descricao.trim(),
    };
    if (isDevEnvironment()) {
      devPermissionsState = [...devPermissionsState, newPerm];
    }
    return newPerm;
  } catch (err) {
    if (isDevEnvironment()) {
      const newPerm: IPermissao = {
        id: Date.now(),
        valor: data.valor.trim(),
        descricao: data.descricao.trim(),
      };
      devPermissionsState = [...devPermissionsState, newPerm];
      return newPerm;
    }
    throw err;
  }
}
