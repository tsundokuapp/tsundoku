import { authPrivate } from '@/core/api';
import { isDevEnvironment } from '@/features/admin/utils/devMock';

import { FIGMA_MOCK_USERS } from '../mocks/userMocks';
import { ICreateUserForm, IToriiUser, IUserAdmin } from '../types/userAdmin';

let devUsersState: IUserAdmin[] = [...FIGMA_MOCK_USERS];

export function resetDevUsersState() {
  devUsersState = [...FIGMA_MOCK_USERS];
}

export function getDevUsersState() {
  return devUsersState;
}

export async function getAdminUsers(): Promise<IUserAdmin[]> {
  try {
    const response = await authPrivate.get<IToriiUser[]>('admin/usuarios');
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((u) => ({
        id: u.id,
        userName: u.userName,
        email: u.email,
        roles: u.roles && u.roles.length > 0 ? u.roles : ['Leitor'],
        dataCadastro: '01/04/2023',
        ultimoAcesso: '13/04/2023',
        apoiador: Boolean(u.roles?.some((r) => r.toLowerCase() === 'apoiador')),
        tsunId: u.tsunId,
      }));
    }
    return [];
  } catch (err) {
    if (isDevEnvironment()) {
      return [...devUsersState];
    }
    throw err;
  }
}

export async function createAdminUser(
  data: ICreateUserForm,
): Promise<IUserAdmin> {
  try {
    const registerResponse = await authPrivate.post('auth/cadastro', {
      usuario: data.userName,
      email: data.email,
      senha: data.senha || 'Tsundoku@123',
      confirmaSenha: data.senha || 'Tsundoku@123',
    });

    const newUserId = registerResponse.data?.id;

    if (newUserId && data.cargo && data.cargo.toLowerCase() !== 'leitor') {
      await authPrivate.post(`admin/usuarios/${newUserId}/roles`, {
        roleName: data.cargo.toLowerCase(),
      });
    }

    const newUser: IUserAdmin = {
      id: newUserId || Date.now(),
      userName: data.userName,
      email: data.email,
      roles: [data.cargo || 'Leitor'],
      dataCadastro: new Date().toLocaleDateString('pt-BR'),
      ultimoAcesso: new Date().toLocaleDateString('pt-BR'),
      apoiador: data.cargo.toLowerCase() === 'apoiador',
    };

    if (isDevEnvironment()) {
      devUsersState = [newUser, ...devUsersState];
    }

    return newUser;
  } catch (err) {
    if (isDevEnvironment()) {
      const newUser: IUserAdmin = {
        id: Date.now(),
        userName: data.userName,
        email: data.email,
        roles: [data.cargo || 'Leitor'],
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        ultimoAcesso: new Date().toLocaleDateString('pt-BR'),
        apoiador: data.cargo.toLowerCase() === 'apoiador',
      };
      devUsersState = [newUser, ...devUsersState];
      return newUser;
    }
    throw err;
  }
}

export async function updateUserRole(
  userId: number | string,
  newRole: string,
  oldRoles: string[] = [],
): Promise<{ success: boolean; roles: string[] }> {
  try {
    for (const oldRole of oldRoles) {
      if (oldRole.toLowerCase() !== newRole.toLowerCase()) {
        try {
          await authPrivate.delete(
            `admin/usuarios/${userId}/roles/${encodeURIComponent(oldRole.toLowerCase())}`,
          );
        } catch {
          // ignore if deletion of non-existing role fails
        }
      }
    }

    await authPrivate.post(`admin/usuarios/${userId}/roles`, {
      roleName: newRole.toLowerCase(),
    });

    if (isDevEnvironment()) {
      devUsersState = devUsersState.map((u) =>
        String(u.id) === String(userId) ? { ...u, roles: [newRole] } : u,
      );
    }

    return { success: true, roles: [newRole] };
  } catch (err) {
    if (isDevEnvironment()) {
      devUsersState = devUsersState.map((u) =>
        String(u.id) === String(userId) ? { ...u, roles: [newRole] } : u,
      );
      return { success: true, roles: [newRole] };
    }
    throw err;
  }
}

// TODO(backend-integration): O backend Torii Auth atualmente não possui endpoint `DELETE /api/admin/usuarios/{userId}`.
// Dependência exata: TsundokuTraducoes.Auth.Api/Controllers/AdminController.cs precisa expor `DELETE /api/admin/usuarios/{id}`.
// Enquanto o backend não expõe exclusão direta de usuários no Identity, em desenvolvimento (`isDevEnvironment()`)
// simulamos a remoção localmente na lista de usuários. Em produção, sinalizamos a indisponibilidade.
export async function deleteAdminUser(
  userId: number | string,
): Promise<{ success: boolean; message: string }> {
  if (isDevEnvironment()) {
    devUsersState = devUsersState.filter(
      (u) => String(u.id) !== String(userId),
    );
    return {
      success: true,
      message: 'Usuário removido com sucesso em ambiente de desenvolvimento.',
    };
  }

  return {
    success: false,
    message:
      'Exclusão de usuário ainda não está disponível no servidor de autenticação Torii.',
  };
}
