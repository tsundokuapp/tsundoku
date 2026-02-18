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
  UserName: string;
  Password: string;
}

export interface IUserLoginResponse {
  userName: string;
  accessToken: string;
  TsunId: string;
}
