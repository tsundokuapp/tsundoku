export interface IRole {
  id: number;
  name: string;
}

export interface IPermissao {
  id: number;
  valor: string;
  descricao: string;
}

export interface IRoleMatrix {
  roles: IRole[];
  permissions: IPermissao[];
  rolePermissions: Record<string, number[]>; // roleName.toLowerCase() -> array of permission IDs
}

export interface ICreateRoleRequest {
  roleName: string;
}

export interface ICreatePermissaoRequest {
  valor: string;
  descricao: string;
}
