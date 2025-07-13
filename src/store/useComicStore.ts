import { create } from 'zustand';

interface IComicStore {
  comicBanner: string;
  setComicBanner: (comicBanner: string) => void;
}

export const useComicStore = create<IComicStore>((set) => ({
  comicBanner: '/banner-emilia.jpg', // Default banner image
  setComicBanner: (comicBanner) => set({ comicBanner }),
}));
