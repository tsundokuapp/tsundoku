import { Check } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface DropdownOptionProps extends ComponentProps<'label'> {
  label: string;
  value: string;
  selected?: boolean;
  action: () => void;
  setIsOpen?: (isOpen: boolean) => void;
}

export function DropdownOption({
  label,
  value,
  selected = false,
  action,
  setIsOpen,
  className,
  ...props
}: DropdownOptionProps) {
  const handleOptionAction = () => {
    action();
    setIsOpen?.(false);
  };

  return (
    <div key={value} className="dropdown-option">
      <label
        className={twMerge(
          'm-1 flex cursor-pointer items-center rounded-lg px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700',
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
