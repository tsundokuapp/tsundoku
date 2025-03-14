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
    try {
      if (action) action();
      if (onClick) onClick();
    } catch (error) {
      console.error('Erro na ação da opção:', error);
    } finally {
      setIsOpen?.(false);
      triggerRef?.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      const parent = e.currentTarget.parentElement?.parentElement;
      if (!parent) return;
      const options = parent.querySelectorAll('label[role="option"]');
      const optionsArray = Array.from(options) as HTMLElement[];
      const currentIndex = optionsArray.findIndex(
        (option) => option === e.currentTarget,
      );
      if (e.shiftKey) {
        const prevIndex =
          currentIndex === 0 ? optionsArray.length - 1 : currentIndex - 1;
        optionsArray[prevIndex].focus();
      } else {
        const nextIndex =
          currentIndex === optionsArray.length - 1 ? 0 : currentIndex + 1;
        optionsArray[nextIndex].focus();
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionAction();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = e.currentTarget.parentElement
        ?.nextElementSibling as HTMLElement;
      if (next) {
        const nextOption = next.querySelector(
          'label[role="option"]',
        ) as HTMLElement;
        nextOption?.focus();
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = e.currentTarget.parentElement
        ?.previousElementSibling as HTMLElement;
      if (prev) {
        const prevOption = prev.querySelector(
          'label[role="option"]',
        ) as HTMLElement;
        prevOption?.focus();
      }
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      const parent = e.currentTarget.parentElement?.parentElement;
      const first = parent?.querySelector(
        'label[role="option"]',
      ) as HTMLElement;
      first?.focus();
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      const parent = e.currentTarget.parentElement?.parentElement;
      const labels = parent?.querySelectorAll('label[role="option"]');
      if (labels && labels.length > 0) {
        (labels[labels.length - 1] as HTMLElement)?.focus();
      }
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
