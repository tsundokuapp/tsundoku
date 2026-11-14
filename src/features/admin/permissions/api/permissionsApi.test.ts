import { authPrivate } from '@/core/api';
import * as devMock from '@/features/admin/utils/devMock';

import {
  assignPermissionToRole,
  createPermission,
  createRole,
  deleteRole,
  getPermissions,
  getRoleMatrix,
  getRoles,
  removePermissionFromRole,
  resetDevPermissionsState,
} from './permissionsApi';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(() => true),
  };
});

jest.mock('@/core/api', () => ({
  authPrivate: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('permissionsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetDevPermissionsState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
  });

  describe('getRoles & getPermissions', () => {
    it('fetches roles from Torii API', async () => {
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: [{ id: 1, name: 'admin' }],
      });

      const roles = await getRoles();
      expect(roles).toHaveLength(1);
      expect(roles[0].name).toBe('admin');
    });

    it('falls back to seed roles in dev mode when Torii is offline', async () => {
      (authPrivate.get as jest.Mock).mockRejectedValueOnce(
        new Error('offline'),
      );

      const roles = await getRoles();
      expect(roles.length).toBeGreaterThanOrEqual(3);
      expect(roles.some((r) => r.name === 'admin')).toBe(true);
    });

    it('fetches base permissions from Torii API', async () => {
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: [{ id: 1, valor: 'obra.visualizar', descricao: 'Ver obras' }],
      });

      const perms = await getPermissions();
      expect(perms).toHaveLength(1);
      expect(perms[0].valor).toBe('obra.visualizar');
    });
  });

  describe('getRoleMatrix', () => {
    it('returns full matrix with roles, permissions, and mappings', async () => {
      (authPrivate.get as jest.Mock).mockRejectedValue(new Error('offline'));

      const matrix = await getRoleMatrix();
      expect(matrix.roles.length).toBeGreaterThanOrEqual(3);
      expect(matrix.permissions.length).toBeGreaterThanOrEqual(10);
      expect(matrix.rolePermissions['admin']).toContain(10);
      expect(matrix.rolePermissions['leitor']).toContain(1);
    });
  });

  describe('assign and remove permissions from role', () => {
    it('assigns permission to role via Torii endpoint', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({ status: 200 });

      const res = await assignPermissionToRole('leitor', 2);
      expect(authPrivate.post).toHaveBeenCalledWith(
        'permissoes/role/leitor/permissao/2',
      );
      expect(res.success).toBe(true);
    });

    it('removes permission from role via Torii endpoint', async () => {
      (authPrivate.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });

      const res = await removePermissionFromRole('tradutor', 1);
      expect(authPrivate.delete).toHaveBeenCalledWith(
        'permissoes/role/tradutor/permissao/1',
      );
      expect(res.success).toBe(true);
    });
  });

  describe('create and delete roles', () => {
    it('creates new role via Torii endpoint', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: { id: 50, name: 'moderador' },
      });

      const role = await createRole('moderador');
      expect(role.name).toBe('moderador');
    });

    it('deletes role via Torii endpoint', async () => {
      (authPrivate.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });

      const res = await deleteRole('moderador');
      expect(authPrivate.delete).toHaveBeenCalledWith('roles/moderador');
      expect(res.success).toBe(true);
    });
  });

  describe('createPermission', () => {
    it('creates base hierarchical permission', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: { id: 20, valor: 'obra.arquivar', descricao: 'Arquivar obras' },
      });

      const perm = await createPermission({
        valor: 'obra.arquivar',
        descricao: 'Arquivar obras',
      });
      expect(perm.valor).toBe('obra.arquivar');
      expect(perm.descricao).toBe('Arquivar obras');
    });
  });
});
