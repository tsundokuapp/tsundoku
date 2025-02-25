// Color Checked
// Components Checked

import { Check } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { merge } from '@/helpers/twUtils';

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
        className={merge(
          'm-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover',
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
