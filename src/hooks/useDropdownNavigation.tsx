import { useCallback } from 'react';

interface UseDropdownNavigationProps {
  setIsOpen?: (isOpen: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  onOptionAction?: () => void;
}

export function useDropdownNavigation({
  setIsOpen,
  triggerRef,
  onOptionAction,
}: UseDropdownNavigationProps) {
  const handleOptionAction = useCallback(() => {
    if (onOptionAction) onOptionAction();
    if (setIsOpen) setIsOpen(false);
    triggerRef?.current?.focus();
  }, [onOptionAction, setIsOpen, triggerRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const current = e.currentTarget;
      const container = current.closest('[data-dropdown-options]');
      if (!container) return;
      // Seleciona todos os itens interativos marcados com data-dropdown-option
      const options = Array.from(
        container.querySelectorAll('[data-dropdown-option]'),
      ) as HTMLElement[];
      const currentIndex = options.indexOf(current);

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          e.stopPropagation();
          if (e.shiftKey) {
            // Garante que, se for o primeiro, volte para o último
            const prevIndex =
              (currentIndex - 1 + options.length) % options.length;
            options[prevIndex].focus();
          } else {
            // Se estiver no último, volta para o primeiro
            const nextIndex = (currentIndex + 1) % options.length;
            options[nextIndex].focus();
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleOptionAction();
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (currentIndex < options.length - 1) {
            options[currentIndex + 1].focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentIndex > 0) {
            options[currentIndex - 1].focus();
          }
          break;
        case 'Home':
          e.preventDefault();
          options[0].focus();
          break;
        case 'End':
          e.preventDefault();
          options[options.length - 1].focus();
          break;
        default:
          break;
      }
    },
    [handleOptionAction],
  );

  return { handleKeyDown };
}
