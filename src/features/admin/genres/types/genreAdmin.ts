export interface IRetornoGenero {
  id: string;
  descricao: string;
  usuarioInclusao?: string;
  dataInclusao?: string;
  usuarioAlteracao?: string;
  dataAlteracao?: string;
}

export interface IObjetoRetornoGenerosResponse {
  data: IRetornoGenero[];
  total?: number;
  proxima?: string;
  anterior?: string;
}
