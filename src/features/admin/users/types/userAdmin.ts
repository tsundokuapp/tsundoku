export interface IToriiUser {
  id: number;
  userName: string;
  email: string;
  tsunId?: string;
  roles: string[];
}

export interface IUserAdmin {
  id: number | string;
  userName: string;
  email: string;
  roles: string[];
  dataCadastro: string;
  ultimoAcesso: string;
  apoiador: boolean;
  avatarUrl?: string;
  tsunId?: string;
}

export interface ICreateUserForm {
  email: string;
  userName: string;
  senha: string;
  confirmaSenha: string;
  cargo: string;
}

/**
 * Resultado do cadastro administrativo.
 * - `complete`: conta criada e cargo confirmado pelo Torii.
 * - `role_pending`: conta criada, mas o cargo não foi confirmado. Quando
 *   `userId` existe, a atribuição pode ser retomada sem novo cadastro.
 */
export type CreateAdminUserResult =
  | { status: 'complete'; user: IUserAdmin }
  | {
      status: 'role_pending';
      user: IUserAdmin;
      userId: number | null;
      cargo: string;
      message: string;
    };

export interface IEditUserForm {
  id: number | string;
  email: string;
  userName: string;
  senha?: string;
  cargo: string;
  roles: string[];
}
