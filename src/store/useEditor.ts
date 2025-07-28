import { type Editor } from '@tiptap/react';
import { create } from 'zustand';

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
  margin: {
    left: number;
    right: number;
  };
  setMargin: (margin: { left: number; right: number }) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
  margin: {
    left: 56,
    right: 56,
  },
  setMargin: (margin) => set({ margin }),
}));
