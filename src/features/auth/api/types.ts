export interface IUserRegisterResponse {
  UserName: string;
  token: string;
}

export interface IUserRegisterData {
  usuario: string;
  email: string;
  senha: string;
  confirmaSenha: string;
}

export interface IUserLoginData {
  Usuario: string;
  Senha: string;
}

export interface IUserLoginResponse {
  usuario: string;
  accessToken: string;
  tsunId: string;
}
