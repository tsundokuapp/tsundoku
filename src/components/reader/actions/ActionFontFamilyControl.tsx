import { useState } from 'react';

import { IFontFamiliesList } from '@/@types/Reader';
import { DropdownContainer } from '@/components/common/dropdown/DropdownContainer';
import { DropdownOption } from '@/components/common/dropdown/DropdownOption';

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
      label={fontFamilies[currentFontFamilyIndex]}
      value={fontFamilies[currentFontFamilyIndex]}
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
