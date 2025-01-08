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

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

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
            'inline-flex w-full justify-between rounded-lg border bg-white px-3 py-2 text-base font-medium text-black focus:border-primary focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400',
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
              'wright-0 mt-2 w-56 origin-top-right rounded-md border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:border-slate-900 dark:bg-slate-800',
              menuClassname,
            )}
          >
            <div
              className={cn(
                'scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-800 max-h-[400px] overflow-y-auto',
                scrollbarClassname,
              )}
            >
              {React.Children.map(children, (child) =>
                React.isValidElement(child)
                  ? React.cloneElement(
                    child as React.ReactElement<{
                      setIsOpen: SetState<boolean>;
                    }>,
                    { setIsOpen },
                  )
                  : child,
              )}
            </div>
          </div>
        </EnterAnimation>
      )}
    </div>
  );
}
