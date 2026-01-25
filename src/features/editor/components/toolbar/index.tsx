'use client';

import {
  ArrowUUpLeft,
  ChatText,
  FileMagnifyingGlass,
  ListChecks,
  TextB,
  TextItalic,
  TextTSlash,
  TextUnderline,
} from '@phosphor-icons/react/dist/ssr';

import { SearchAndReplaceButton } from '@/features/editor/components/SearchAndReplaceButton';
import { useEditorStore } from '@/features/editor/store/useEditorStore';

import { AlignButton } from './AlignButton';
import { FontFamilyButton } from './FontFamilyButton';
import { FontSizeButton } from './FontSizeButton';
import { HeadingButton } from './HeadingButton';
import { HightLightColorButton } from './HightLightColorButton';
import { ImageButton } from './ImageButton';
import { LineHeightButton } from './LineHeightButton';
import { LinkButton } from './LinkButton';
import { ListButton } from './ListButton';
import { TextColorButton } from './TextColorButton';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarSeparator } from './ToolbarSeparator';

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sizeDefault = 16;
  const sections: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Desfazer',
        icon: <ArrowUUpLeft size={sizeDefault} />,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: 'Refazer',
        icon: <ArrowUUpLeft size={sizeDefault} className="rotate-180" />,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: 'Ortografia',
        icon: (
          <FileMagnifyingGlass
            size={sizeDefault}
            fill={
              editor?.view.dom.getAttribute('spellcheck') === 'false'
                ? '#ffffff'
                : '#0284C7'
            }
          />
        ),
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false',
          );
        },
      },
    ],
    [
      {
        label: 'Negrito',
        icon: <TextB weight="bold" size={sizeDefault} />,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold'),
      },
      {
        label: 'Itálico',
        icon: <TextItalic size={sizeDefault} />,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic'),
      },
      {
        label: 'Sublinhado',
        icon: <TextUnderline size={sizeDefault} />,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive('underline'),
      },
    ],
    [
      {
        label: 'Comentário',
        icon: <ChatText size={sizeDefault} />,
        onClick: () => {
          console.log('Add comment functionality not implemented yet');
        },
        isActive: false, // Placeholder for future comment functionality
      },
      {
        label: 'Lista',
        icon: <ListChecks size={sizeDefault} />,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive('taskList'),
      },
      {
        label: 'Remover Formatação',
        icon: <TextTSlash size={sizeDefault} />,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="relative flex min-h-[40px] items-center gap-x-0.5 rounded-[10px] rounded-b-none bg-appBackground px-2.5 py-0.5 print:hidden">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <ToolbarSeparator />
      <FontFamilyButton />
      <HeadingButton />
      <ToolbarSeparator />
      <FontSizeButton />
      <ToolbarSeparator />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HightLightColorButton />
      <ToolbarSeparator />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
      <ToolbarSeparator />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <SearchAndReplaceButton />
    </div>
  );
};
