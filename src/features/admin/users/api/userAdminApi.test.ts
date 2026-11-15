import { authPrivate } from '@/core/api';
import * as devMock from '@/features/admin/utils/devMock';

import {
  assignRoleToNewUser,
  createAdminUser,
  deleteAdminUser,
  extractCreatedUserId,
  getAdminUsers,
  getDevUsersState,
  resetDevUsersState,
  updateUserRole,
  validateNewUserPassword,
} from './userAdminApi';

const VALID_PASSWORD = 'Senha@123';

/** Corpo real de `Ok(result)` do CadastroController (FluentResults + Newtonsoft camelCase). */
const toriiCadastroBody = (idUsuario: number) => ({
  isFailed: false,
  isSuccess: true,
  reasons: [],
  errors: [],
  successes: [],
  value: { idUsuario, codigoConfirmacao: 'codigo' },
  valueOrDefault: { idUsuario, codigoConfirmacao: 'codigo' },
});

const httpError = (status: number, data: unknown) =>
  Object.assign(new Error(`Request failed with status code ${status}`), {
    response: { status, data },
  });

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

  describe('validateNewUserPassword', () => {
    it.each([
      ['', '', 'Informe a senha'],
      ['Ab@1', 'Ab@1', '6 caracteres'],
      ['senha@123', 'senha@123', 'maiúscula'],
      ['SENHA@123', 'SENHA@123', 'minúscula'],
      ['Senha@abc', 'Senha@abc', 'número'],
      ['Senha1234', 'Senha1234', 'caractere especial'],
      [VALID_PASSWORD, 'Senha@124', 'confirmação'],
    ])('rejeita %p', (senha, confirma, expected) => {
      expect(validateNewUserPassword(senha, confirma)).toContain(expected);
    });

    it('aceita senha dentro da política do Identity', () => {
      expect(validateNewUserPassword(VALID_PASSWORD, VALID_PASSWORD)).toBe(
        null,
      );
    });
  });

  describe('extractCreatedUserId', () => {
    it('lê value.idUsuario do Result do CadastroService', () => {
      expect(extractCreatedUserId(toriiCadastroBody(42))).toBe(42);
    });

    it('ignora o formato antigo { id } e resultados com falha', () => {
      expect(extractCreatedUserId({ id: 99 })).toBeNull();
      expect(
        extractCreatedUserId({ ...toriiCadastroBody(42), isSuccess: false }),
      ).toBeNull();
      expect(extractCreatedUserId(undefined)).toBeNull();
    });
  });

  describe('createAdminUser', () => {
    const baseForm = {
      userName: 'newbie',
      email: 'newbie@tsundoku.com.br',
      senha: VALID_PASSWORD,
      confirmaSenha: VALID_PASSWORD,
    };

    it('não envia nada ao Torii quando a senha é inválida ou ausente', async () => {
      await expect(
        createAdminUser({
          ...baseForm,
          senha: '',
          confirmaSenha: '',
          cargo: 'Staff',
        }),
      ).rejects.toThrow('Informe a senha');

      expect(authPrivate.post).not.toHaveBeenCalled();
    });

    it('cadastra com a senha informada, atribui o cargo pelo ID real e confirma no Torii', async () => {
      (authPrivate.post as jest.Mock)
        .mockResolvedValueOnce({ data: toriiCadastroBody(99) })
        .mockResolvedValueOnce({ data: { message: 'Role atribuída' } });
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: ['leitor', 'staff'],
      });

      const result = await createAdminUser({ ...baseForm, cargo: 'Staff' });

      expect(authPrivate.post).toHaveBeenNthCalledWith(1, 'auth/cadastro', {
        usuario: 'newbie',
        email: 'newbie@tsundoku.com.br',
        senha: VALID_PASSWORD,
        confirmaSenha: VALID_PASSWORD,
      });
      expect(authPrivate.post).toHaveBeenNthCalledWith(
        2,
        'admin/usuarios/99/roles',
        { roleName: 'staff' },
      );
      expect(authPrivate.get).toHaveBeenCalledWith('admin/usuarios/99/roles');
      expect(result).toMatchObject({
        status: 'complete',
        user: { id: 99, userName: 'newbie', roles: ['leitor', 'staff'] },
      });
    });

    it('não faz chamada de cargo para Leitor (o cadastro já vincula leitor)', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: toriiCadastroBody(7),
      });

      const result = await createAdminUser({ ...baseForm, cargo: 'Leitor' });

      expect(authPrivate.post).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject({ status: 'complete', user: { id: 7 } });
    });

    it('retorna resultado parcial quando a conta é criada e a atribuição falha', async () => {
      (authPrivate.post as jest.Mock)
        .mockResolvedValueOnce({ data: toriiCadastroBody(55) })
        .mockRejectedValueOnce(httpError(500, 'Role STAFF does not exist.'));

      const result = await createAdminUser({ ...baseForm, cargo: 'Staff' });

      expect(result).toEqual({
        status: 'role_pending',
        user: expect.objectContaining({ id: 55, roles: ['Leitor'] }),
        userId: 55,
        cargo: 'Staff',
        message: 'Role STAFF does not exist.',
      });
      expect(authPrivate.post).toHaveBeenCalledTimes(2);
    });

    it('retorna resultado parcial quando o Torii não confirma o cargo', async () => {
      (authPrivate.post as jest.Mock)
        .mockResolvedValueOnce({ data: toriiCadastroBody(56) })
        .mockResolvedValueOnce({ data: { message: 'ok' } });
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: ['leitor'],
      });

      const result = await createAdminUser({ ...baseForm, cargo: 'Staff' });

      expect(result).toMatchObject({
        status: 'role_pending',
        userId: 56,
        message: 'O Torii não confirmou o cargo Staff para a conta.',
      });
    });

    it('não tenta atribuir cargo sem o ID real do cadastro', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({
        data: { id: 99 },
      });

      const result = await createAdminUser({ ...baseForm, cargo: 'Staff' });

      expect(result).toMatchObject({ status: 'role_pending', userId: null });
      expect(authPrivate.post).toHaveBeenCalledTimes(1);
    });

    it('propaga o erro real do Torii mesmo em desenvolvimento', async () => {
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        httpError(400, 'E-mail já cadastrado'),
      );

      await expect(
        createAdminUser({ ...baseForm, cargo: 'Staff' }),
      ).rejects.toThrow('E-mail já cadastrado');
      expect(getDevUsersState().some((u) => u.userName === 'newbie')).toBe(
        false,
      );
    });

    it('usa o mock local só quando o Torii está inacessível em desenvolvimento', async () => {
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error'),
      );

      const result = await createAdminUser({
        ...baseForm,
        userName: 'devlocal',
        cargo: 'Tradutor',
      });

      expect(result).toMatchObject({
        status: 'complete',
        user: { userName: 'devlocal', roles: ['Tradutor'] },
      });
    });

    it('não usa mock em produção quando o Torii está inacessível', async () => {
      (devMock.isDevEnvironment as jest.Mock).mockReturnValue(false);
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        new Error('Network Error'),
      );

      await expect(
        createAdminUser({ ...baseForm, cargo: 'Staff' }),
      ).rejects.toThrow('Não foi possível cadastrar a conta no Torii.');
    });
  });

  describe('assignRoleToNewUser (retomada)', () => {
    it('atribui e confirma sem chamar o cadastro novamente', async () => {
      (authPrivate.post as jest.Mock).mockResolvedValueOnce({ data: {} });
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: ['leitor', 'tradutor'],
      });

      await expect(assignRoleToNewUser(55, 'Tradutor')).resolves.toEqual([
        'leitor',
        'tradutor',
      ]);
      expect(authPrivate.post).toHaveBeenCalledTimes(1);
      expect(authPrivate.post).not.toHaveBeenCalledWith(
        'auth/cadastro',
        expect.anything(),
      );
    });

    it('aceita "already in role" quando a confirmação mostra o cargo vinculado', async () => {
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        httpError(400, [
          {
            code: 'UserAlreadyInRole',
            description: "User already in role 'tradutor'.",
          },
        ]),
      );
      (authPrivate.get as jest.Mock).mockResolvedValueOnce({
        data: ['leitor', 'tradutor'],
      });

      await expect(assignRoleToNewUser(55, 'Tradutor')).resolves.toContain(
        'tradutor',
      );
    });

    it('rejeita com a mensagem do Torii quando a atribuição falha', async () => {
      (authPrivate.post as jest.Mock).mockRejectedValueOnce(
        httpError(404, 'Usuário não encontrado.'),
      );

      await expect(assignRoleToNewUser(55, 'Tradutor')).rejects.toThrow(
        'Usuário não encontrado.',
      );
      expect(authPrivate.get).not.toHaveBeenCalled();
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
