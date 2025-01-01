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
}

export function DropdownOption({
  label,
  value,
  selected = false,
  action,
  onClick,
  setIsOpen,
  className,
  ...props
}: DropdownOptionProps) {
  const handleOptionAction = () => {
    action && action();
    onClick && onClick();
    setIsOpen?.(false);
  };

  return (
    <div key={value} className="dropdown-option">
      <label
        className={cn(
          'm-1 flex cursor-pointer items-center rounded-lg bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
          className,
        )}
        onClick={handleOptionAction}
        {...props}
      >
        <span className="ml-2">{label}</span>
        {selected && <Check className="ml-auto h-5 w-5" />}
      </label>
    </div>
  );
}
