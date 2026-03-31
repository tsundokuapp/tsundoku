import { TextAa } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { IFontFamiliesList } from '@/features/reader/types/Reader';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

interface ActionFontFamilyControlProps {
  onChange: (fontFamily: IFontFamiliesList) => void;
}

export function ActionFontFamilyControl({
  onChange,
}: ActionFontFamilyControlProps) {
  const fontFamilies: IFontFamiliesList[] = ['Poppins', 'Merriweather'];
  const [currentFontFamilyIndex, setCurrentFontFamilyIndex] = useState(0);

  const handleChangeFontFamily = (fontFamily: IFontFamiliesList) => {
    const index = fontFamilies.indexOf(fontFamily);
    setCurrentFontFamilyIndex(index);
    onChange(fontFamilies[index]);
  };

  return (
    <DropdownContainer
      label={
        <>
          <span className="sm:hidden">
            <TextAa size={16} />
          </span>
          <span className="hidden sm:inline">
            {fontFamilies[currentFontFamilyIndex]}
          </span>
        </>
      }
      value={
        <>
          <span className="sm:hidden">
            <TextAa size={16} />
          </span>
          <span className="hidden sm:inline">
            {fontFamilies[currentFontFamilyIndex]}
          </span>
        </>
      }
      className="min-w-[52px] sm:min-w-[180px]"
      buttonClassname="border-appMenuBorder bg-appInputBackground px-2 hover:bg-appGroupBackground sm:px-3 justify-center gap-1 sm:justify-between"
      menuClassname="min-w-[180px]"
      matchTriggerWidth={false}
    >
      {fontFamilies.map((item, index) => (
        <DropdownOption
          key={index}
          label={item}
          value={item}
          onClick={() => {
            handleChangeFontFamily(item);
          }}
          selected={item === fontFamilies[currentFontFamilyIndex]}
        />
      ))}
    </DropdownContainer>
  );
}
