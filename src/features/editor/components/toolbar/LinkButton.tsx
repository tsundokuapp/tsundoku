import { Link } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';

import { useEditorStore } from '../../store/useEditorStore';

export const LinkButton = () => {
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
        className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-appText hover:bg-blue-600"
        onClick={() => {
          onChange(value);
        }}
      >
        Adicionar
      </button>
    </DropdownContainer>
  );
};
