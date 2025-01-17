export interface ApiResponse<T> {
  data: T[];
  proxima: string;
  anterior: string;
  total: number;
}

export interface IGenres {
  id: string;
  descricao: string;
  slug: string;
  usuarioInclusao?: string;
  usuarioAlteracao?: string;
  dataInclusao?: string;
  dataAlteracao?: string;
}
