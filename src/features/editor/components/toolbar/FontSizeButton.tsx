import { Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { useEditorStore } from '../../store/useEditorStore';

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes('textStyle').fontSize;

  const [fontSize, setFontSize] = useState(currentFontSize || '12px');
  const [inputValue, setInputValue] = useState(fontSize);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(Number(size)) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <button onClick={decrementFontSize}>
          <Minus size={16} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="w-12 rounded-sm border border-gray-300 bg-transparent text-center focus:outline-none focus:ring-0"
        />
        <button
          onClick={() => {
            incrementFontSize();
          }}
        >
          <Plus size={16} />
        </button>
      </div>
    </>
  );
};
