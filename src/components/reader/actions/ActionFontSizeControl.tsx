import { useState } from 'react';

import { IFontSizeList } from '@/types/Reader';

import { ActionButtonControl } from './ActionButtonControl';

interface ActionFontSizeControlProps {
  onChange: (fontSize: IFontSizeList) => void;
}

export function ActionFontSizeControl({
  onChange,
}: ActionFontSizeControlProps) {
  const fontSizes: IFontSizeList[] = [
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
  ];
  const [currentSizeIndex, setCurrentSizeIndex] = useState(1); // Default: "text-base"

  const increaseFontSize = () => {
    if (currentSizeIndex < fontSizes.length - 1) {
      const newIndex = currentSizeIndex + 1;
      setCurrentSizeIndex(newIndex);
      onChange(fontSizes[newIndex]);
    }
  };

  const decreaseFontSize = () => {
    if (currentSizeIndex > 0) {
      const newIndex = currentSizeIndex - 1;
      setCurrentSizeIndex(newIndex);
      onChange(fontSizes[newIndex]);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <ActionButtonControl
        onClick={decreaseFontSize}
        disable={currentSizeIndex === 0}
      >
        A-
      </ActionButtonControl>
      <ActionButtonControl
        onClick={increaseFontSize}
        disable={currentSizeIndex === fontSizes.length - 1}
      >
        A+
      </ActionButtonControl>
    </div>
  );
}
