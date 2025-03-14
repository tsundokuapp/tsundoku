// DropdownContainer.tsx
// Color Checked
// Components Checked

import { CaretUpDown } from '@phosphor-icons/react/dist/ssr';
import React, {
  ReactElement,
  useState,
  useEffect,
  useRef,
  ReactNode,
  ComponentProps,
  useCallback,
} from 'react';

import { DropdownAnimation } from '@/animation/DropdownAnimation';
import { cn } from '@/helpers/twUtils';

import type { DropdownOptionProps } from './DropdownOption';

interface DropdownContainerProps extends ComponentProps<'div'> {
  label: string | ReactElement;
  value: string | ReactElement;
  children: ReactNode;
  buttonClassname?: string;
  menuClassname?: string;
  scrollbarClassname?: string;
  direction?: 'up' | 'down';
  noIcon?: boolean;
}

interface Position {
  vertical: 'up' | 'down';
  horizontal: 'left' | 'right';
}

export function DropdownContainer({
  label,
  value,
  children,
  className,
  buttonClassname,
  menuClassname,
  scrollbarClassname,
  direction = 'down',
  noIcon = false,
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
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = rect.width;
      const triggerHeight = rect.height;
      const vertical: 'up' | 'down' =
        rect.bottom + triggerHeight > window.innerHeight ? 'up' : 'down';
      const horizontal: 'left' | 'right' =
        rect.left + dropdownWidth > window.innerWidth ? 'right' : 'left';
      setComputedPosition({ vertical, horizontal });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleResize = () => updatePosition();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isOpen, updatePosition]);

  const triggerHeight =
    triggerRef.current?.getBoundingClientRect().height ?? 40;

  const handleToggleDropdown = useCallback(() => {
    setIsOpen((prev) => {
      if (prev && triggerRef.current) {
        setTimeout(() => {
          triggerRef.current?.focus();
        }, 0);
      }
      return !prev;
    });
  }, []);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Foca na opção selecionada (ou na primeira) ao abrir o dropdown
  useEffect(() => {
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
  }, [isOpen]);

  // Fecha o dropdown ao pressionar Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // Fecha o dropdown se o foco sair do menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const currentMenu = menuRef.current;
      const handleFocusOut = (e: FocusEvent) => {
        const newFocused = e.relatedTarget as Node;
        if (triggerRef.current && triggerRef.current.contains(newFocused)) {
          return;
        }
        if (!currentMenu.contains(newFocused)) {
          setIsOpen(false);
        }
      };
      currentMenu.addEventListener('focusout', handleFocusOut);
      return () => currentMenu.removeEventListener('focusout', handleFocusOut);
    }
  }, [isOpen]);

  const menuClasses = cn(
    'absolute z-10 w-56 rounded-md border border-appMenuBorder bg-appMenuBackground p-1 shadow-lg ring-1 ring-appMenuBorder ring-opacity-5',
    computedPosition.vertical === 'down'
      ? computedPosition.horizontal === 'left'
        ? 'left-0 top-full origin-top-left'
        : 'right-0 top-full origin-top-right'
      : computedPosition.horizontal === 'left'
        ? 'left-0 bottom-full origin-bottom-left'
        : 'right-0 bottom-full origin-bottom-right',
    menuClassname,
  );

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block min-w-[180px] text-left', className)}
      {...props}
    >
      <div>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className={cn(
            'focus:border-primary inline-flex h-10 w-full items-center justify-between rounded-lg border border-appInputBorder bg-appInputBackground px-3 text-sm text-appInputPlaceholder focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2',
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
          delay={0.3}
          direction={computedPosition.vertical}
          triggerHeight={triggerHeight}
        >
          <div ref={menuRef} className={menuClasses} role="menu">
            <div
              className={cn(
                'max-h-[400px] overflow-y-auto',
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
            </div>
          </div>
        </DropdownAnimation>
      )}
    </div>
  );
}
