import { useEditorState } from '@tiptap/react';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { useEditorStore } from '../../store/useEditorStore';

export const FontFamilyButton = () => {
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
