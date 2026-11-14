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
  senha?: string;
  cargo: string;
}

export interface IEditUserForm {
  id: number | string;
  email: string;
  userName: string;
  senha?: string;
  cargo: string;
  roles: string[];
}
