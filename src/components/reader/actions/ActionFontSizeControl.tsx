import { useState } from 'react';

import type { FontSizeList } from '@/@types/FontSizeList';

interface ActionFontSizeControlProps {
  onChange: (fontSize: FontSizeList) => void;
}

export function ActionFontSizeControl({
  onChange,
}: ActionFontSizeControlProps) {
  const fontSizes: FontSizeList[] = [
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
      <button
        onClick={decreaseFontSize}
        className="inline-flex w-full justify-between rounded-lg border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-400 focus:outline-none"
        disabled={currentSizeIndex === 0}
      >
        A-
      </button>
      <button
        onClick={increaseFontSize}
        className="inline-flex w-full justify-between rounded-lg border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-400 focus:outline-none"
        disabled={currentSizeIndex === fontSizes.length - 1}
      >
        A+
      </button>
    </div>
  );
}
