// Color Checked
// Components Checked

import { Check } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

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

  function handleTab(e: React.KeyboardEvent<HTMLLabelElement>) {
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
  }

  function handleEnterSpace(
    e: React.KeyboardEvent<HTMLLabelElement>,
    handleOptionAction: () => void,
  ) {
    e.preventDefault();
    handleOptionAction();
  }

  function handleArrowDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    e.preventDefault();
    const next = e.currentTarget.parentElement
      ?.nextElementSibling as HTMLElement;
    if (next) {
      const nextOption = next.querySelector(
        'label[role="option"]',
      ) as HTMLElement;
      nextOption?.focus();
    }
  }

  function handleArrowUp(e: React.KeyboardEvent<HTMLLabelElement>) {
    e.preventDefault();
    const prev = e.currentTarget.parentElement
      ?.previousElementSibling as HTMLElement;
    if (prev) {
      const prevOption = prev.querySelector(
        'label[role="option"]',
      ) as HTMLElement;
      prevOption?.focus();
    }
  }

  function handleHome(e: React.KeyboardEvent<HTMLLabelElement>) {
    e.preventDefault();
    const parent = e.currentTarget.parentElement?.parentElement;
    const first = parent?.querySelector('label[role="option"]') as HTMLElement;
    first?.focus();
  }

  function handleEnd(e: React.KeyboardEvent<HTMLLabelElement>) {
    e.preventDefault();
    const parent = e.currentTarget.parentElement?.parentElement;
    const labels = parent?.querySelectorAll('label[role="option"]');
    if (labels && labels.length > 0) {
      (labels[labels.length - 1] as HTMLElement)?.focus();
    }
  }

  const keyHandlers: Record<
    string,
    (e: React.KeyboardEvent<HTMLLabelElement>) => void
  > = {
    Tab: handleTab,
    Enter: (e) => handleEnterSpace(e, handleOptionAction),
    ' ': (e) => handleEnterSpace(e, handleOptionAction),
    ArrowDown: handleArrowDown,
    ArrowUp: handleArrowUp,
    Home: handleHome,
    End: handleEnd,
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    const handler = keyHandlers[e.key];
    if (handler) {
      handler(e);
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
