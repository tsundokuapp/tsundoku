import { create } from 'zustand';

interface IAuthStore {
  username: string | null;
  setUsername: (username: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  tsunId: string | null;
  setTsunId: (tsunId: string) => void;
  logout: () => void;
  position: string | null;
  setPosition: (position: string | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  username: null,
  setUsername: (username) => set({ username }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  tsunId: null,
  setTsunId: (tsunId) => set({ tsunId }),
  logout: () => {
    set({
      username: null,
      accessToken: null,
      tsunId: null,
      position: null,
    });
  },
  position: null,
  setPosition: (position) => set({ position }),
}));
