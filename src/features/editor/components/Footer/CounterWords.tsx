'use client';

import type { CharacterCountStorage } from '@/features/editor/extensions/CharacterCount';
import { useEditorStore } from '@/features/editor/store/useEditorStore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

export const CounterWords = () => {
  const { editor } = useEditorStore();

  const priceTsunCoin = 1.25;

  const getCharacterCount = (): number => {
    if (!editor) return 0;

    const storage = editor.storage.characterCount as
      | CharacterCountStorage
      | undefined;
    if (!storage?.characters) return 0;

    return storage.characters();
  };

  const getWordCount = (): number => {
    if (!editor) return 0;

    const storage = editor.storage.characterCount as
      | CharacterCountStorage
      | undefined;
    if (!storage?.words) return 0;

    return storage.words();
  };

  return (
    <div className="flex items-center gap-2">
      <span>{getCharacterCount()} Caracteres</span>
      <span>|</span>
      <TooltipProvider>
        <Tooltip>
          <TooltipContent>
            <p>Valor por mil palavras: T$ {priceTsunCoin}</p>
            <p>
              Total do documento: T${' '}
              {Math.round((getWordCount() / 1000) * priceTsunCoin).toFixed(2)}
            </p>
          </TooltipContent>
          <TooltipTrigger>
            <span>{getWordCount()} Palavras</span>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
