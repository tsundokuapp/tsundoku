import {
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
} from '@phosphor-icons/react/dist/ssr';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { cn } from '@/shared/utils/cn';

import { useEditorStore } from '../../store/useEditorStore';

export const AlignButton = () => {
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
      <div className="flex w-[16px] flex-col items-center text-appText">
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
