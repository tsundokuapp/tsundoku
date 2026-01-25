import { create } from 'zustand';

interface IBannerStore {
  banner: string;
  setBanner: (banner: string) => void;
}

export const useBannerStore = create<IBannerStore>((set) => ({
  banner: '/banner-emilia.jpg', // Default banner image
  setBanner: (banner) => set({ banner }),
}));
