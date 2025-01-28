import { create } from 'zustand';

import { IVolumeZustand } from '@/types/Volume';

interface INovelStore {
  novel: string | null;
  chapterId: string | null;
  volumeList: IVolumeZustand[] | null;
  setNovel: (novel: string | null) => void;
  setChapterId: (id: string | null) => void;
  setVolumeList: (list: IVolumeZustand[] | null) => void;
}

export const useNovelStore = create<INovelStore>((set) => ({
  novel: null,
  setNovel: (novel) => set({ novel }),

  chapterId: null,
  setChapterId: (id) => set({ chapterId: id }),

  volumeList: null,
  setVolumeList: (list) => set({ volumeList: list }),
}));
