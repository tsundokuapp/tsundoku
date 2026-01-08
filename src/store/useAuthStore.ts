import { create } from 'zustand';

interface IAuthStore {
  username: string | null;
  setUsername: (username: string | null) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  username: null,
  setUsername: (username) => set({ username }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
