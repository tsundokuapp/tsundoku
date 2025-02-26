// Color Checked
// Components Checked

import { CaretUpDown } from '@phosphor-icons/react/dist/ssr';
import React, { ReactElement } from 'react';
import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type ComponentProps,
} from 'react';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { cn } from '@/helpers/twUtils';

interface DropdownContainerProps extends ComponentProps<'div'> {
  label: string | ReactElement;
  value: string | ReactElement;
  children: ReactNode;
  buttonClassname?: string;
  menuClassname?: string;
  scrollbarClassname?: string;
}

export function DropdownContainer({
  label,
  value,
  children,
  className,
  buttonClassname,
  menuClassname,
  scrollbarClassname,
  ...props
}: DropdownContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block min-w-[180px] text-left', className)}
      {...props}
    >
      <div>
        <button
          type="button"
          className={cn(
            'focus:border-primary inline-flex h-10 w-full items-center justify-between rounded-lg border border-appInputBorder bg-appInputBackground px-3 text-sm text-appInputPlaceholder focus:outline-none',
            buttonClassname,
          )}
          onClick={handleToggleDropdown}
        >
          {isOpen ? label : value}
          <CaretUpDown className="ml-2 h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <EnterAnimation delay={0.3} className="absolute z-10">
          <div
            className={cn(
              'wright-0 mt-2 w-56 origin-top-right rounded-md border border-appMenuBorder bg-appMenuBackground p-1 shadow-lg ring-1 ring-appMenuBorder ring-opacity-5',
              menuClassname,
            )}
          >
            <div
              className={cn(
                'max-h-[400px] overflow-y-auto',
                scrollbarClassname,
              )}
            >
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement<{
                    setIsOpen?: (isOpen: boolean) => void;
                  }>(child)
                ) {
                  return React.cloneElement(child, { setIsOpen });
                }
                return child;
              })}
            </div>
          </div>
        </EnterAnimation>
      )}
    </div>
  );
}
