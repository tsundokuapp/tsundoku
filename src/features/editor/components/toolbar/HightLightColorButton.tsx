import { Highlighter } from '@phosphor-icons/react/dist/ssr';
import { type ColorResult, CirclePicker } from 'react-color';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';

import { useEditorStore } from '../../store/useEditorStore';

export const HightLightColorButton = () => {
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
