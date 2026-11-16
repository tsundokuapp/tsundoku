import { authPrivate } from '@/core/api';
import { isDevEnvironment } from '@/features/admin/utils/devMock';

import { FIGMA_MOCK_USERS } from '../mocks/userMocks';
import {
  CreateAdminUserResult,
  ICreateUserForm,
  IToriiUser,
  IUserAdmin,
} from '../types/userAdmin';

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

/**
 * Política de senha aplicada pelo Torii no cadastro.
 * O Torii (`Program.cs`) usa `AddIdentity` sem `PasswordOptions`, então valem
 * os padrões do ASP.NET Core Identity: 6+ caracteres, ao menos uma letra
 * maiúscula, uma minúscula, um dígito e um caractere não alfanumérico.
 * `CadastroUsuarioRequest` também exige `ConfirmaSenha` igual a `Senha`.
 */
export const TORII_PASSWORD_MIN_LENGTH = 6;

export function validateNewUserPassword(
  senha: string,
  confirmaSenha: string,
): string | null {
  if (!senha) return 'Informe a senha de acesso.';
  if (senha.length < TORII_PASSWORD_MIN_LENGTH)
    return `A senha precisa ter ao menos ${TORII_PASSWORD_MIN_LENGTH} caracteres.`;
  if (!/[A-Z]/.test(senha))
    return 'A senha precisa ter ao menos uma letra maiúscula.';
  if (!/[a-z]/.test(senha))
    return 'A senha precisa ter ao menos uma letra minúscula.';
  if (!/\d/.test(senha)) return 'A senha precisa ter ao menos um número.';
  if (!/[^a-zA-Z0-9]/.test(senha))
    return 'A senha precisa ter ao menos um caractere especial.';
  if (senha !== confirmaSenha) return 'A confirmação de senha não confere.';
  return null;
}

interface AxiosLikeError {
  response?: { status?: number; data?: unknown };
}

function hasResponse(err: unknown): err is Required<AxiosLikeError> {
  return Boolean(
    err && typeof err === 'object' && (err as AxiosLikeError).response,
  );
}

/** Extrai a mensagem de erro dos formatos devolvidos pelo Torii. */
export function extractToriiMessage(err: unknown, fallback: string): string {
  if (!hasResponse(err)) return fallback;
  const data = err.response.data;

  if (typeof data === 'string' && data.trim()) return data.trim();

  if (Array.isArray(data)) {
    // IdentityError[] de AddToRoleAsync/RemoveFromRoleAsync.
    const descriptions = data
      .map((e) => (e && typeof e === 'object' ? e.description : null))
      .filter(Boolean);
    if (descriptions.length) return descriptions.join(' ');
  }

  if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    if (typeof obj.message === 'string') return obj.message;
    if (obj.errors && typeof obj.errors === 'object') {
      const messages = Object.values(obj.errors as Record<string, unknown>)
        .flat()
        .filter((m): m is string => typeof m === 'string');
      if (messages.length) return messages.join(' ');
    }
    if (typeof obj.title === 'string') return obj.title;
  }

  return fallback;
}

/**
 * `POST api/auth/cadastro` devolve `Ok(result)`, em que `result` é o
 * `Result<object>` (FluentResults) de `CadastroService.CadastrarUsuario`,
 * serializado em camelCase pelo Newtonsoft:
 * `{ isSuccess, value: { idUsuario, codigoConfirmacao }, ... }`.
 */
export function extractCreatedUserId(data: unknown): number | null {
  if (!data || typeof data !== 'object') return null;
  const result = data as Record<string, unknown>;
  if (result.isSuccess === false || result.isFailed === true) return null;

  const value = (result.value ?? result.valueOrDefault ?? result.Value) as
    | Record<string, unknown>
    | undefined;
  const rawId = value?.idUsuario ?? value?.IdUsuario;
  const id = typeof rawId === 'string' ? Number(rawId) : rawId;

  return typeof id === 'number' && Number.isInteger(id) && id > 0 ? id : null;
}

function isLeitor(cargo: string) {
  return cargo.trim().toLowerCase() === 'leitor';
}

function buildCreatedUser(
  data: ICreateUserForm,
  id: number | string,
  roles: string[],
): IUserAdmin {
  const today = new Date().toLocaleDateString('pt-BR');
  return {
    id,
    userName: data.userName,
    email: data.email,
    roles,
    dataCadastro: today,
    ultimoAcesso: today,
    apoiador: roles.some((r) => r.toLowerCase() === 'apoiador'),
  };
}

/**
 * Atribui o cargo a uma conta recém-criada e só retorna depois de o Torii
 * confirmar (`GET admin/usuarios/{id}/roles`) que o cargo está vinculado.
 * Pode ser chamada novamente para retomar uma atribuição que falhou.
 */
export async function assignRoleToNewUser(
  userId: number,
  cargo: string,
): Promise<string[]> {
  const roleName = cargo.trim().toLowerCase();
  let assignError: string | null = null;

  try {
    await authPrivate.post(`admin/usuarios/${userId}/roles`, { roleName });
  } catch (err) {
    const message = extractToriiMessage(
      err,
      `Não foi possível atribuir o cargo ${cargo} no Torii.`,
    );
    // Reenvio após uma atribuição que chegou a ser gravada: o Identity
    // responde 400 "User already in role". A verificação abaixo decide.
    if (!hasResponse(err) || err.response.status !== 400) {
      throw new Error(message);
    }
    assignError = message;
  }

  const roles = await fetchUserRoles(userId, cargo);

  if (!hasRole(roles, roleName)) {
    throw new Error(assignError ?? roleMissingMessage(cargo));
  }

  return roles;
}

const roleMissingMessage = (cargo: string) =>
  `O Torii não confirmou o cargo ${cargo} para a conta.`;

const roleCheckFailedMessage = (cargo: string, detail: string) =>
  `Não foi possível confirmar o cargo ${cargo} no Torii: ${detail}`;

function hasRole(roles: string[], roleName: string) {
  return roles.some((r) => r.toLowerCase() === roleName);
}

/** Consulta as roles gravadas no Torii; a falha vira erro com mensagem própria. */
async function fetchUserRoles(userId: number, cargo: string) {
  try {
    const { data } = await authPrivate.get<string[]>(
      `admin/usuarios/${userId}/roles`,
    );
    return Array.isArray(data) ? data : [];
  } catch (err) {
    throw new Error(
      roleCheckFailedMessage(
        cargo,
        extractToriiMessage(err, 'a consulta de cargos falhou.'),
      ),
    );
  }
}

// TODO(backend-integration): `POST api/auth/cadastro` é o cadastro público:
// exige confirmação de e-mail (`RequireConfirmedEmail`) antes do primeiro login
// e devolve `codigoConfirmacao` no corpo. Um endpoint administrativo dedicado
// (ex.: `POST api/admin/usuarios` em AdminController.cs, com role na mesma
// transação) eliminaria o estado parcial e a exposição do código.
export async function createAdminUser(
  data: ICreateUserForm,
): Promise<CreateAdminUserResult> {
  const passwordError = validateNewUserPassword(data.senha, data.confirmaSenha);
  if (passwordError) throw new Error(passwordError);

  const cargo = data.cargo || 'Leitor';

  let registerData: unknown;
  try {
    const response = await authPrivate.post('auth/cadastro', {
      usuario: data.userName,
      email: data.email,
      senha: data.senha,
      confirmaSenha: data.confirmaSenha,
    });
    registerData = response.data;
  } catch (err) {
    // Mock local apenas quando o Torii está inacessível (sem resposta HTTP).
    // Respostas de erro reais do Torii sempre chegam à interface.
    if (isDevEnvironment() && !hasResponse(err)) {
      const devUser = buildCreatedUser(data, Date.now(), [cargo]);
      devUsersState = [devUser, ...devUsersState];
      return { status: 'complete', user: devUser };
    }
    throw new Error(
      extractToriiMessage(err, 'Não foi possível cadastrar a conta no Torii.'),
    );
  }

  const userId = extractCreatedUserId(registerData);

  if (userId === null) {
    // A conta foi criada, mas sem o ID não é seguro atribuir o cargo.
    return {
      status: 'role_pending',
      user: buildCreatedUser(data, data.email, ['Leitor']),
      userId: null,
      cargo,
      message:
        'O Torii criou a conta, mas não retornou o ID do usuário. Atribua o cargo pela lista de usuários.',
    };
  }

  // CadastroService chama AddToRoleAsync(usuario, "leitor"), mas descarta o
  // resultado. Por isso o vínculo é verificado aqui antes de concluir, e só é
  // reatribuído pela retomada ("Tentar atribuir cargo novamente").
  if (isLeitor(cargo)) {
    let roles: string[];
    try {
      roles = await fetchUserRoles(userId, cargo);
    } catch (err) {
      return {
        status: 'role_pending',
        user: buildCreatedUser(data, userId, []),
        userId,
        cargo,
        message:
          err instanceof Error
            ? err.message
            : roleCheckFailedMessage(cargo, ''),
      };
    }

    if (!hasRole(roles, 'leitor')) {
      return {
        status: 'role_pending',
        user: buildCreatedUser(data, userId, roles),
        userId,
        cargo,
        message: `O Torii criou a conta, mas o cargo ${cargo} não está vinculado.`,
      };
    }

    return {
      status: 'complete',
      user: buildCreatedUser(data, userId, roles),
    };
  }

  try {
    const roles = await assignRoleToNewUser(userId, cargo);
    return { status: 'complete', user: buildCreatedUser(data, userId, roles) };
  } catch (err) {
    return {
      status: 'role_pending',
      user: buildCreatedUser(data, userId, ['Leitor']),
      userId,
      cargo,
      message:
        err instanceof Error
          ? err.message
          : `Não foi possível atribuir o cargo ${cargo}.`,
    };
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
