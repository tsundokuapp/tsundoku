import { ColorResult, CirclePicker } from 'react-color';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';

import { useEditorStore } from '../../store/useEditorStore';

export const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChangeColor = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  const LabelButton = () => {
    return (
      <div className="flex w-[16px] flex-col items-center text-appText">
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
