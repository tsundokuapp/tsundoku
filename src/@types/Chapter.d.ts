export interface IListChapterZustand {
  id: string;
  numero: string;
  ordemCapitulo: number;
  parte?: string;
}

export interface INextChapterNovelInfo {
  volumeNumber: string | null;
  nextChapterId: string | null;
  nextChapterNumber: string | null;
  nextUrl: string;
}

export interface IPreviousChapterNovelInfo {
  volumeNumber: string | null;
  previousChapterId: string | null;
  previousChapterNumber: string | null;
  previousUrl: string;
}

export interface IChapterData {
  id: string;
  numero: string;
  publicado: boolean;
  ordemCapitulo: number;
  slug: string;
  descritivoCapitulo: string;
  dataInclusao: string;
}
