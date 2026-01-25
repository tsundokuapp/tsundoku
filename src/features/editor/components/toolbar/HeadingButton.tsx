import { type Level } from '@tiptap/extension-heading';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { useEditorStore } from '../../store/useEditorStore';

export const HeadingButton = () => {
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
