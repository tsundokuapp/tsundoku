// Color Checked
// Components Checked

import { CaretUpDown } from '@phosphor-icons/react/dist/ssr';
import React, {
  ComponentProps,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { DropdownAnimation } from '@/animation/DropdownAnimation';
import { cn } from '@/helpers/twUtils';

import { DropdownBreakLine } from './DropdownBreakLine';
import DropdownCleaner from './DropdownCleaner';
import type { DropdownOptionProps } from './DropdownOption';

interface DropdownContainerProps extends ComponentProps<'div'> {
  label: string | ReactElement;
  value: string | ReactElement;
  buttonClassname?: string;
  menuClassname?: string;
  scrollbarClassname?: string;
  direction?: 'up' | 'down';
  noIcon?: boolean;
  onClear?: () => void;
  children: ReactNode;
}

interface Position {
  vertical: 'up' | 'down';
  horizontal: 'left' | 'right';
}

export function DropdownContainer({
  label,
  value,
  buttonClassname,
  menuClassname,
  scrollbarClassname,
  direction = 'down',
  noIcon = false,
  onClear,
  children,
  className,
  ...props
}: DropdownContainerProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [computedPosition, setComputedPosition] = useState<Position>({
    vertical: direction,
    horizontal: 'left',
  });

  const updatePosition = useCallback(() => {
    setComputedPosition({
      vertical: direction,
      horizontal: 'left',
    });
  }, [direction]);

  useEffect(() => {
    updatePosition();
    const handleResize = () => isOpen && updatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        updatePosition();
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, updatePosition]);

  const triggerHeightRef = useRef(40);

  useLayoutEffect(() => {
    if (triggerRef.current) {
      triggerHeightRef.current =
        triggerRef.current.getBoundingClientRect().height;
    }
  }, []);

  const handleToggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      const newFocused = e.relatedTarget as Node;
      if (triggerRef.current && triggerRef.current.contains(newFocused)) {
        return;
      }
      if (!menuRef.current?.contains(newFocused)) {
        setIsOpen(false);
      }
    };

    if (isOpen && dropdownRef.current) {
      const selectedOption = dropdownRef.current.querySelector(
        'label[aria-selected="true"]',
      ) as HTMLElement;
      if (selectedOption) {
        selectedOption.focus();
      } else {
        const firstOption = dropdownRef.current.querySelector(
          'label[role="option"]',
        ) as HTMLElement;
        firstOption?.focus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    const menuNode = menuRef.current;
    menuNode?.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
      menuNode?.removeEventListener('focusout', handleFocusOut);
    };
  }, [isOpen]);

  return (
    <div
      data-dropdown-options
      ref={dropdownRef}
      className={cn('relative inline-block min-w-[180px] text-left', className)}
      style={{ zIndex: isOpen ? 9999 : 'auto' }}
      {...props}
    >
      <div>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          data-testid="dropdown-trigger"
          className={cn(
            'focus:border-primary inline-flex h-10 w-full items-center justify-between rounded-lg border border-appInputBorder bg-appInputBackground px-3 text-sm text-appText focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2',
            buttonClassname,
          )}
          onClick={handleToggleDropdown}
        >
          {isOpen ? label : value}
          {!noIcon && <CaretUpDown className="ml-2 h-5 w-5" />}
        </button>
      </div>
      {isOpen && (
        <DropdownAnimation
          duration={0.3}
          direction={computedPosition.vertical}
          triggerHeight={triggerHeightRef.current}
        >
          <div
            ref={menuRef}
            className={cn(
              'absolute w-56 rounded-md border border-appMenuBorder bg-appMenuBackground p-1 shadow-lg ring-1 ring-appMenuBorder ring-opacity-5',
              computedPosition.vertical === 'down'
                ? 'left-0 top-full origin-top-left'
                : 'bottom-full left-0 origin-bottom-left',
              menuClassname,
            )}
            role="menu"
            style={{
              width: triggerRef.current?.offsetWidth || 'auto',
            }}
          >
            <div
              className={cn(
                'max-h-[220px] overflow-y-auto',
                scrollbarClassname,
              )}
            >
              {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                if (typeof child.type === 'string') {
                  const childProps =
                    child.props as React.HTMLAttributes<HTMLElement>;
                  return React.cloneElement(
                    child as React.ReactElement<
                      React.HTMLAttributes<HTMLElement>
                    >,
                    { tabIndex: childProps.tabIndex ?? 0 },
                  );
                }
                return React.cloneElement(
                  child as React.ReactElement<DropdownOptionProps>,
                  { setIsOpen, triggerRef },
                );
              })}
              {onClear && (
                <>
                  <DropdownBreakLine />
                  <DropdownCleaner onClean={onClear} />
                </>
              )}
            </div>
          </div>
        </DropdownAnimation>
      )}
    </div>
  );
}
