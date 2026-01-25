import { ListBullets, ListNumbers } from '@phosphor-icons/react/dist/ssr';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { cn } from '@/shared/utils/cn';

import { useEditorStore } from '../../store/useEditorStore';

export const ListButton = () => {
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
      <div className="flex w-[16px] flex-col items-center text-appText">
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
