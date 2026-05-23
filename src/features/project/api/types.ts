export interface IProjectRecomendations {
  titulo: string;
  capa: string;
  slugObra: string;
  sinopse: string;
  tipoObra: string;
}

export interface IProjectsHome {
  numeroCapitulo: string;
  parteCapitulo: string;
  slugCapitulo: string;
  dataInclusao: string;
  numeroVolume: string;
  urlCapa: string;
  aliasObra: string;
  autorObra: string;
  tipoObra: string;
  slugObra: string;
}

export interface IPublicGenres {
  label: string;
  value: string;
}

export interface IWorkData {
  id: string;
  slug: string;
  titulo: string;
  alias: string;
  capa: string;
  tipo: 'Manga' | 'Manhwa' | 'Light Novel' | 'Web Novel' | 'Manhua';
  sinopse: string;
}

export interface IWork {
  total: number;
  data: IWorkData[];
}
