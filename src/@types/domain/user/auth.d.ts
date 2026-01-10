export interface IUserRegisterResponse {
  UserName: string;
  token: string;
}

export interface IUserRegisterData {
  UserName: string;
  Email: string;
  Senha: string;
  ConfirmaSenha: string;
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
