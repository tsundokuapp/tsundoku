import { IPermissao, IRole } from '../types/permissionsAdmin';

export const SEED_ROLES: IRole[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'staff' },
  { id: 3, name: 'tradutor' },
  { id: 4, name: 'leitor' },
];

export const SEED_PERMISSIONS: IPermissao[] = [
  { id: 1, valor: 'obra.visualizar', descricao: 'Visualizar qualquer obra' },
  { id: 2, valor: 'obra.criar', descricao: 'Criar obras' },
  { id: 3, valor: 'obra.editar', descricao: 'Editar qualquer obra' },
  { id: 4, valor: 'obra.deletar', descricao: 'Deletar qualquer obra' },
  {
    id: 5,
    valor: 'capitulo.visualizar',
    descricao: 'Visualizar qualquer capítulo',
  },
  { id: 6, valor: 'capitulo.criar', descricao: 'Criar capítulos' },
  { id: 7, valor: 'capitulo.editar', descricao: 'Editar qualquer capítulo' },
  { id: 8, valor: 'capitulo.deletar', descricao: 'Deletar qualquer capítulo' },
  { id: 9, valor: 'usuario.gerenciar', descricao: 'Gerenciar usuários' },
  { id: 10, valor: '*.*', descricao: 'Acesso total a todos os recursos' },
];

export const SEED_ROLE_PERMISSIONS: Record<string, number[]> = {
  admin: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  staff: [1, 2, 3, 5, 6, 7, 9],
  tradutor: [1, 2, 3, 5, 6, 7],
  leitor: [1, 5],
};
