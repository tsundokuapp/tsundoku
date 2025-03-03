// Color Checked
// Components Checked

import { Check } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

export interface DropdownOptionProps extends ComponentProps<'label'> {
  label: string;
  value: string;
  selected?: boolean;
  action?: () => void;
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
  const handleOptionAction = () => {
    action && action();
    onClick && onClick();
    setIsOpen?.(false);
    triggerRef?.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionAction();
    }
    if (e.key === 'ArrowDown') {
      const next = e.currentTarget.parentElement
        ?.nextElementSibling as HTMLElement;
      if (next) next.querySelector('label')?.focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
      const prev = e.currentTarget.parentElement
        ?.previousElementSibling as HTMLElement;
      if (prev) prev.querySelector('label')?.focus();
      e.preventDefault();
    }
  };

  return (
    <div key={value} className="dropdown-option">
      <label
        role="option"
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
