'use client';

import FileHandler from '@tiptap/extension-file-handler';
import HighLight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TableKit } from '@tiptap/extension-table';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import {
  TextStyle,
  FontFamily,
  Color,
  FontSize,
  LineHeight,
} from '@tiptap/extension-text-style';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { useEditorStore } from '@/store/useEditor';

import { Ruler } from './Ruler';

export const Editor = () => {
  const { setEditor, margin } = useEditorStore();

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor, error }) {
      console.error('Content error:', error);
      setEditor(editor);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        style: `padding-left: ${margin.left ?? 56}px; padding-right: ${margin.right ?? 56}px;`,
        class:
          'focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
      },
    },
    extensions: [
      StarterKit,
      LineHeight,
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
        defaultAlignment: 'left',
      }),
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      Color,
      HighLight.configure({
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      TaskList,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TaskItem.configure({
        nested: true,
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    content: '',
  });

  return (
    <div className="size-full overflow-x-auto bg-appGroupBackground px-4 text-black print:overflow-visible print:bg-white print:p-0">
      <Ruler />
      <div className="mx-auto flex w-[816px] min-w-max justify-center py-4 print:w-full print:min-w-0 print:py-0">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
