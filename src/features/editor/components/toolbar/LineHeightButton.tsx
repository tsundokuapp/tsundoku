import { useState } from 'react';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { useEditorStore } from '../../store/useEditorStore';

export const LineHeightButton = () => {
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
        <div className="flex w-[16px] flex-col items-center text-appText">
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
