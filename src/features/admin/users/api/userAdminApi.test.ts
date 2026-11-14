import { authPrivate } from '@/core/api';
import * as devMock from '@/features/admin/utils/devMock';

import {
  createAdminUser,
  deleteAdminUser,
  getAdminUsers,
  resetDevUsersState,
  updateUserRole,
} from './userAdminApi';

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

describe('userAdminApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetDevUsersState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
  });

  describe('getAdminUsers', () => {
    it('returns mapped users from Torii API when authPrivate succeeds', async () => {
      const mockToriiUsers = [
        {
          id: 10,
          userName: 'testuser',
          email: 'test@tsundoku.com.br',
          roles: ['admin'],
        },
      ];
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: mockToriiUsers,
      });

      const users = await getAdminUsers();
      expect(users).toHaveLength(1);
      expect(users[0].userName).toBe('testuser');
      expect(users[0].roles).toEqual(['admin']);
    });

    it('falls back to dev mock users when Torii fails in dev environment', async () => {
      (authPrivate.get as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error: Torii offline'),
      );

      const users = await getAdminUsers();
      expect(users.length).toBeGreaterThanOrEqual(8);
      expect(users.some((u) => u.userName === 'Matface')).toBe(true);
    });

    it('throws error when Torii fails and not in dev environment', async () => {
      (devMock.isDevEnvironment as jest.Mock).mockReturnValue(false);
      (authPrivate.get as jest.Mock).mockRejectedValueOnce(
        new Error('Torii 500 error'),
      );

      await expect(getAdminUsers()).rejects.toThrow('Torii 500 error');
    });
  });

  describe('createAdminUser', () => {
    it('posts registration and role to Torii when available', async () => {
      (authPrivate.post as jest.Mock)
        .mockResolvedValueOnce({ data: { id: 99 } })
        .mockResolvedValueOnce({ data: { message: 'Role atribuída' } });

      const newUser = await createAdminUser({
        userName: 'newbie',
        email: 'newbie@tsundoku.com.br',
        senha: 'Password@123',
        cargo: 'Staff',
      });

      expect(authPrivate.post).toHaveBeenCalledWith('auth/cadastro', {
        usuario: 'newbie',
        email: 'newbie@tsundoku.com.br',
        senha: 'Password@123',
        confirmaSenha: 'Password@123',
      });
      expect(authPrivate.post).toHaveBeenCalledWith('admin/usuarios/99/roles', {
        roleName: 'staff',
      });
      expect(newUser.userName).toBe('newbie');
    });

    it('creates user in dev fallback when Torii offline', async () => {
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        new Error('Torii offline'),
      );

      const newUser = await createAdminUser({
        userName: 'devlocal',
        email: 'devlocal@tsundoku.com.br',
        cargo: 'Tradutor',
      });

      expect(newUser.userName).toBe('devlocal');
      expect(newUser.roles).toEqual(['Tradutor']);
    });
  });

  describe('updateUserRole', () => {
    it('calls delete on old roles and post on new role', async () => {
      (authPrivate.delete as jest.Mock).mockResolvedValueOnce({ status: 204 });
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: { message: 'OK' },
      });

      const result = await updateUserRole(1, 'Admin', ['Staff']);
      expect(authPrivate.delete).toHaveBeenCalledWith(
        'admin/usuarios/1/roles/staff',
      );
      expect(authPrivate.post).toHaveBeenCalledWith('admin/usuarios/1/roles', {
        roleName: 'admin',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('deleteAdminUser', () => {
    it('removes user from dev state when isDevEnvironment is true', async () => {
      const initialUsers = await getAdminUsers();
      const firstId = initialUsers[0].id;

      const deleteRes = await deleteAdminUser(firstId);
      expect(deleteRes.success).toBe(true);

      (authPrivate.get as jest.Mock).mockRejectedValueOnce(
        new Error('offline'),
      );
      const afterUsers = await getAdminUsers();
      expect(afterUsers.some((u) => u.id === firstId)).toBe(false);
    });

    it('returns failure notice in production mode (R3 isolation)', async () => {
      (devMock.isDevEnvironment as jest.Mock).mockReturnValue(false);

      const res = await deleteAdminUser(1);
      expect(res.success).toBe(false);
      expect(res.message).toContain('servidor de autenticação Torii');
    });
  });
});
