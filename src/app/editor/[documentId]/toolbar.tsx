'use client';

import {
  ArrowUUpLeft,
  ChatText,
  FileMagnifyingGlass,
  Highlighter,
  Image as IconImage,
  Link,
  ListBullets,
  ListChecks,
  ListNumbers,
  Minus,
  Plus,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextTSlash,
  TextUnderline,
} from '@phosphor-icons/react/dist/ssr';
import { type Level } from '@tiptap/extension-heading';
import { useEditorState } from '@tiptap/react';
import { useState } from 'react';
import { type ColorResult, CirclePicker } from 'react-color';

import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';
import { useModal } from '@/contexts/ModalContext';
import { cn } from '@/helpers/twUtils';
import { useEditorStore } from '@/store/useEditor';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const [lineHeight, setLineHeight] = useState('1.15');

  const handleLineHeightChange = (value: string) => {
    setLineHeight(value);
    editor?.chain().focus().setLineHeight(value).run();
  };

  const isActive = (value: string) => {
    return editor?.isActive('textStyle', { lineHeight: value });
  };

  const options = [
    { label: '1.15', value: '1.15', isActive: isActive('1.15') },
    { label: '1.5', value: '1.5', isActive: isActive('1.5') },
    { label: '2.0', value: '2.0', isActive: isActive('2.0') },
    { label: '4.0', value: '4.0', isActive: isActive('4.0') },
  ];

  return (
    <DropdownContainer
      isButton
      label={
        <div className="flex w-[16px] flex-col items-center">
          <span className="text-appText">LH</span>
          <span className="h-1 w-full" style={{ lineHeight }} />
        </div>
      }
      value={lineHeight}
    >
      {options.map(({ label, value, isActive }) => (
        <DropdownOption
          key={value}
          label={label}
          onClick={() => handleLineHeightChange(value)}
          value={value}
          selected={isActive}
        />
      ))}
    </DropdownContainer>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes('textStyle').fontSize;

  const [fontSize, setFontSize] = useState(currentFontSize || '12px');
  const [inputValue, setInputValue] = useState(fontSize);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(Number(size)) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <button onClick={decrementFontSize}>
          <Minus size={16} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-12 rounded-sm border border-gray-300 bg-transparent text-center focus:outline-none focus:ring-0"
        />
        <button
          onClick={() => {
            incrementFontSize();
          }}
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: 'Lista Ordenada',
      icon: <ListNumbers size={16} />,
      isActive: editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: 'Bullet List',
      icon: <ListBullets size={16} />,
      isActive: editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
  ];

  const LabelButton = () => {
    return (
      <div className="flex w-[16px] flex-col items-center">
        <ListBullets size={16} />
      </div>
    );
  };

  return (
    <DropdownContainer isButton label={<LabelButton />} value={'Alinhamento'}>
      {lists.map(({ label, icon, isActive, onClick }) => (
        <DropdownOption
          key={label}
          className={cn(
            'flex items-center gap-x-2',
            isActive && 'bg-neutral-200/80',
          )}
          selected={isActive}
          icon={icon}
          label={label}
          onClick={onClick}
          value={label}
        />
      ))}
    </DropdownContainer>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    { label: 'Esquerda', value: 'left', icon: <TextAlignLeft size={16} /> },
    { label: 'Centro', value: 'center', icon: <TextAlignCenter size={16} /> },
    { label: 'Direita', value: 'right', icon: <TextAlignRight size={16} /> },
    {
      label: 'Justificado',
      value: 'justify',
      icon: <TextAlignJustify size={16} />,
    },
  ];

  const LabelButton = () => {
    return (
      <div className="flex w-[16px] flex-col items-center">
        <TextAlignCenter size={16} />
      </div>
    );
  };

  return (
    <DropdownContainer isButton label={<LabelButton />} value={'Alinhamento'}>
      {alignments.map(({ label, value, icon }) => (
        <DropdownOption
          className={cn(
            'flex items-center gap-x-2',
            editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80',
          )}
          selected={editor?.isActive({ textAlign: value })}
          icon={icon}
          key={label}
          label={label}
          onClick={() => {
            editor?.chain().focus().setTextAlign(value).run();
          }}
          value={value}
        />
      ))}
    </DropdownContainer>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState('');
  const { Modal, openModal, closeModal } = useModal();

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl('');
      closeModal();
    }
  };

  const LabelButton = () => {
    return <IconImage size={16} />;
  };

  const options = [
    { label: 'Carregar Imagem', onClick: onUpload },
    { label: 'Colar URL da Imagem', onClick: () => openModal() },
  ];

  return (
    <>
      <DropdownContainer isButton label={<LabelButton />} value={imageUrl}>
        {options.map(({ label, onClick }) => (
          <DropdownOption
            key={label}
            label={label}
            onClick={onClick}
            value={label} // não necessário, mas exigido pelo DropdownOption
          />
        ))}
      </DropdownContainer>
      <Modal title="Upload de Imagem">
        <div className="mb-4">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit();
              }
            }}
            placeholder="Cole a URL da imagem aqui"
            className="w-full rounded border border-gray-300 p-2"
          />
          <button
            className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleImageUrlSubmit}
          >
            Adicionar Imagem
          </button>
        </div>
      </Modal>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes('link').href || '');

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setValue('');
  };

  const LabelButton = () => {
    return <Link size={16} />;
  };

  return (
    <DropdownContainer isButton label={<LabelButton />} value={value}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://examplo.com"
        className="w-full rounded border border-gray-300 p-2"
      />
      <button
        className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => {
          onChange(value);
        }}
      >
        Adicionar
      </button>
    </DropdownContainer>
  );
};

const HightLightColorButton = () => {
  const { editor } = useEditorStore();

  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  const value = editor?.getAttributes('highlight').color || '#FFFF00';

  const LabelButton = () => {
    return (
      <div className="flex w-[16px] flex-col items-center">
        <Highlighter size={16} weight="bold" />
        <span className="h-1 w-full" style={{ backgroundColor: value }} />
      </div>
    );
  };

  return (
    <DropdownContainer isButton label={<LabelButton />} value={'Cor de texto'}>
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

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  const LabelButton = () => {
    return (
      <div className="flex w-[16px] flex-col items-center">
        <span className="text-appText">A</span>
        <span className="h-1 w-full" style={{ backgroundColor: value }} />
      </div>
    );
  };

  return (
    <DropdownContainer isButton label={<LabelButton />} value={'Cor de texto'}>
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

  const {
    isArial = false,
    isCourierNew = false,
    isGeorgia = false,
    isTimesNewRoman = false,
    isVerdana = false,
  } = useEditorState({
    editor,
    selector: () => {
      return {
        isArial: editor?.isActive('textStyle', { fontFamily: 'Arial' }),
        isCourierNew: editor?.isActive('textStyle', {
          fontFamily: 'Courier New',
        }),
        isGeorgia: editor?.isActive('textStyle', { fontFamily: 'Georgia' }),
        isTimesNewRoman: editor?.isActive('textStyle', {
          fontFamily: 'Times New Roman',
        }),
        isVerdana: editor?.isActive('textStyle', { fontFamily: 'Verdana' }),
      };
    },
  }) ?? {};

  const getCurrentFontFamily = () => {
    if (isArial) return 'Arial';
    if (isCourierNew) return 'Courier New';
    if (isGeorgia) return 'Georgia';
    if (isTimesNewRoman) return 'Times New Roman';
    if (isVerdana) return 'Verdana';
    return 'Arial'; // Default
  };

  return (
    <DropdownContainer
      value={getCurrentFontFamily()}
      label={getCurrentFontFamily()}
    >
      {fontFamilies.map(({ label, value }) => (
        <DropdownOption
          key={value}
          label={label}
          onClick={() => {
            editor?.chain().focus().setFontFamily(value).run();
          }}
          value={label}
          selected={label === getCurrentFontFamily()}
        />
      ))}
    </DropdownContainer>
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
    <div className="relative flex min-h-[40px] items-center gap-x-0.5 rounded-[10px] rounded-b-none bg-[#FAFAFB] px-2.5 py-0.5 print:hidden">
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
    </div>
  );
};
