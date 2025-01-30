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
