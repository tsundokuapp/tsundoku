import { CaretUpDown } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownContainerProps extends ComponentProps<'div'> {
  label: string;
  value: string;
  children: ReactNode;
  buttonClassname?: string | undefined;
  menuClassname?: string | undefined;
  scrollbarClassname?: string | undefined;
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
      className={twMerge(
        'relative inline-block w-[180px] text-left',
        className,
      )}
      {...props}
    >
      <div>
        <button
          type="button"
          className={twMerge(
            'inline-flex w-full justify-between rounded-lg border border-zinc-800 bg-transparent px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-400 focus:outline-none',
            buttonClassname,
          )}
          onClick={handleToggleDropdown}
        >
          {isOpen ? label : value}
          <CaretUpDown className="ml-2 h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <div
          className={twMerge(
            'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-zinc-800',
            menuClassname,
          )}
        >
          <div
            className={twMerge(
              'max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-zinc-500 dark:scrollbar-track-zinc-800',
              scrollbarClassname,
            )}
          >
            {React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(
                    child as React.ReactElement<{
                      setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
                    }>,
                    {
                      setIsOpen,
                    },
                  )
                : child,
            )}
          </div>
        </div>
      )}
    </div>
  );
}
