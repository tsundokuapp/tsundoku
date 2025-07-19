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
import { type Level } from '@tiptap/extension-heading';
import { type ColorResult, CirclePicker } from 'react-color';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { cn } from '@/helpers/twUtils';
import { useEditorStore } from '@/store/useEditor';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownContainer label="A" value={value}>
      <CirclePicker
        color={value}
        onChangeComplete={onChangeColor}
        width="100%"
        circleSize={24}
        circleSpacing={8}
        className="p-2"
      />
    </DropdownContainer>
  );
};

const HeadingButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: 'Normal', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '34px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal'; // Default
  };

  return (
    <DropdownContainer value={getCurrentHeading()} label={getCurrentHeading()}>
      {headings.map(({ label, value }) => (
        <DropdownOption
          key={value}
          label={label}
          onClick={() => {
            if (value === 0) {
              editor?.chain().focus().setParagraph().run();
            } else {
              editor
                ?.chain()
                .focus()
                .setHeading({ level: value as Level })
                .run();
            }
          }}
          value={label}
          selected={label === getCurrentHeading()}
        />
      ))}
    </DropdownContainer>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fontFamilies = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Verdana', value: 'Verdana' },
  ];

  return (
    // TODO: trocar select pelo dropdown da tsun
    <select
      value={editor?.getAttributes('fontFamily').fontFamily || ''}
      onChange={(e) => {
        editor?.chain().focus().setFontFamily(e.target.value).run();
      }}
      className="h-7 min-w-7 rounded-sm bg-white px-2 text-sm hover:bg-neutral-200/80"
    >
      {fontFamilies.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
};

const ToolbarSeparator = () => {
  return <span className="mx-1 h-6 w-[1px] bg-neutral-300" />;
};

const ToolbarButton = ({
  icon,
  onClick,
  isActive = false,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80',
        {
          'bg-neutral-200/80': isActive,
        },
      )}
    >
      {icon}
    </button>
  );
};

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
        icon: <FileMagnifyingGlass size={sizeDefault} />,
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
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#F1F4F9] px-2.5 py-0.5 print:hidden">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <ToolbarSeparator />
      <FontFamilyButton />
      <HeadingButton />
      <ToolbarSeparator />
      {/* font size */}
      <ToolbarSeparator />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <ToolbarSeparator />
      <TextColorButton />
      {/* Highlight color */}
      <ToolbarSeparator />
      {/* Link */}
      <ToolbarSeparator />
      {/* Image */}
      <ToolbarSeparator />
      {/* Align */}
      <ToolbarSeparator />
      {/* Line height */}
      <ToolbarSeparator />
      {/* List */}
      <ToolbarSeparator />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
