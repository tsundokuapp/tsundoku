import {
  ArrowsInLineVertical,
  ArrowsOutLineVertical,
} from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { IFontLineHeight } from '@/types/Reader';

import { ActionButtonControl } from './actionButtonControl/ActionButtonControl';

interface ActionFontLineHeightControlProps {
  onChange: (lineHeight: IFontLineHeight) => void;
}

export function ActionFontLineHeightControl({
  onChange,
}: ActionFontLineHeightControlProps) {
  const lineHeight: IFontLineHeight[] = [
    'leading-5',
    'leading-6',
    'leading-7',
    'leading-8',
    'leading-9',
  ];
  const [currentLineHeightIndex, setCurrentLineHeightIndex] = useState(1);

  const increaseLineHeight = () => {
    if (currentLineHeightIndex < lineHeight.length - 1) {
      const newIndex = currentLineHeightIndex + 1;
      setCurrentLineHeightIndex(newIndex);
      onChange(lineHeight[newIndex]);
    }
  };

  const decreaseLineHeight = () => {
    if (currentLineHeightIndex > 0) {
      const newIndex = currentLineHeightIndex - 1;
      setCurrentLineHeightIndex(newIndex);
      onChange(lineHeight[newIndex]);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <ActionButtonControl
        onClick={decreaseLineHeight}
        data-testid="decrease-line-height"
        disable={currentLineHeightIndex === 0}
      >
        <ArrowsInLineVertical size={16} />
      </ActionButtonControl>

      <ActionButtonControl
        onClick={increaseLineHeight}
        data-testid="increase-line-height"
        disable={currentLineHeightIndex === lineHeight.length - 1}
      >
        <ArrowsOutLineVertical size={16} />
      </ActionButtonControl>
    </div>
  );
}
