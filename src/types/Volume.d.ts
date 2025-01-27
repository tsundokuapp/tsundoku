import { IChapterNovelData } from './Api';

export interface IVolumeNovel {
  title: string;
  subTitle?: string;
  sinopse: string;
  cover: string;
  chapters: IChapterNovelData[];
}
