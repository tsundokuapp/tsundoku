import { create } from 'zustand';

interface IAuthStore {
  username: string;
  setUsername: (username: string) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  username: '',
  setUsername: (username) => set({ username }),
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));
