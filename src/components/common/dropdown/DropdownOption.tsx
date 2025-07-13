// Color Checked
// Components Checked

import { Check } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';
import { useDropdownNavigation } from '@/hooks/useDropdownNavigation';

export interface DropdownOptionProps extends ComponentProps<'label'> {
  label: string;
  value: string;
  selected?: boolean;
  action?: (args: { value: string }) => void;
  onClick?: () => void;
  setIsOpen?: (isOpen: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export function DropdownOption({
  label,
  value,
  selected = false,
  action,
  onClick,
  setIsOpen,
  triggerRef,
  className,
  ...props
}: DropdownOptionProps) {
  const handleOptionAction = async () => {
    try {
      if (action) await action({ value });
      if (onClick) onClick();
    } catch (error) {
      console.error('Erro na ação da opção:', error);
    } finally {
      if (setIsOpen) setIsOpen(false);
      triggerRef?.current?.focus();
    }
  };

  const { handleKeyDown } = useDropdownNavigation({
    setIsOpen,
    triggerRef,
    onOptionAction: handleOptionAction,
  });

  return (
    <div key={value} className="dropdown-option">
      <label
        role="option"
        data-dropdown-option
        tabIndex={0}
        aria-selected={selected}
        className={cn(
          'm-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover focus:bg-appMenuHover',
          className,
        )}
        onClick={handleOptionAction}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="ml-2">{label}</span>
        {selected && <Check className="ml-auto h-5 w-5" />}
      </label>
    </div>
  );
}
