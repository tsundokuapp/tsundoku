import { create } from 'zustand';

import { IVolumeNovelZustand } from '@/features/admin/novels/types/Volume';

interface INovelStore {
  novelBanner: string | null;
  chapterId: string | null;
  volumeList: IVolumeNovelZustand[] | null;
  setNovelBanner: (novel: string | null) => void;
  setChapterId: (id: string | null) => void;
  setVolumeList: (list: IVolumeNovelZustand[] | null) => void;
}

export const useNovelStore = create<INovelStore>((set) => ({
  novelBanner: null,
  setNovelBanner: (novelBanner) => set({ novelBanner }),

  chapterId: null,
  setChapterId: (id) => set({ chapterId: id }),

  volumeList: null,
  setVolumeList: (list) => set({ volumeList: list }),
}));
