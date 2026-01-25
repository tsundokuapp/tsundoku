import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  IFontFamiliesList,
  IFontLineHeight,
  IFontSizeList,
} from '../types/Reader';
import type { ScrollMode } from '../types/ScrollMode';

interface ReaderPreferencesState {
  // Novel
  fontSize: IFontSizeList;
  lineHeight: IFontLineHeight;
  fontFamily: IFontFamiliesList;

  // Comic
  scrollMode: ScrollMode;

  // Actions - Novel
  setFontSize: (fontSize: IFontSizeList) => void;
  setLineHeight: (lineHeight: IFontLineHeight) => void;
  setFontFamily: (fontFamily: IFontFamiliesList) => void;

  // Actions - Comic
  setScrollMode: (scrollMode: ScrollMode) => void;

  // Reset
  resetNovelPreferences: () => void;
  resetComicPreferences: () => void;
  resetAll: () => void;
}

const DEFAULT_NOVEL_PREFERENCES = {
  fontSize: 'text-base' as IFontSizeList,
  lineHeight: 'leading-6' as IFontLineHeight,
  fontFamily: 'Poppins' as IFontFamiliesList,
};

const DEFAULT_COMIC_PREFERENCES = {
  scrollMode: 'infinite' as ScrollMode,
};

export const useReaderPreferences = create<ReaderPreferencesState>()(
  persist(
    (set) => ({
      // Novel defaults
      ...DEFAULT_NOVEL_PREFERENCES,

      // Comic defaults
      ...DEFAULT_COMIC_PREFERENCES,

      // Novel actions
      setFontSize: (fontSize) => set({ fontSize }),
      setLineHeight: (lineHeight) => set({ lineHeight }),
      setFontFamily: (fontFamily) => set({ fontFamily }),

      // Comic actions
      setScrollMode: (scrollMode) => set({ scrollMode }),

      // Reset actions
      resetNovelPreferences: () => set(DEFAULT_NOVEL_PREFERENCES),
      resetComicPreferences: () => set(DEFAULT_COMIC_PREFERENCES),
      resetAll: () =>
        set({ ...DEFAULT_NOVEL_PREFERENCES, ...DEFAULT_COMIC_PREFERENCES }),
    }),
    {
      name: 'tsundoku-reader-preferences',
      partialize: (state) => ({
        fontSize: state.fontSize,
        lineHeight: state.lineHeight,
        fontFamily: state.fontFamily,
        scrollMode: state.scrollMode,
      }),
    },
  ),
);
