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

  // Atualiza o posicionamento com base no trigger
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownWidth = rect.width;
      const triggerHeight = rect.height;
      const vertical: 'up' | 'down' =
        rect.bottom + triggerHeight > window.innerHeight ? 'up' : 'down';
      const horizontal: 'left' | 'right' =
        rect.left + dropdownWidth > window.innerWidth ? 'right' : 'left';
      setComputedPosition({ vertical, horizontal });
    }
  }, [isOpen]);

  // Define animações de entrada/saída com base na direção vertical
  const triggerHeight =
    triggerRef.current?.getBoundingClientRect().height ?? 40;

  const animationInitial =
    computedPosition.vertical === 'down'
      ? { opacity: 0, y: -10 }
      : { opacity: 0, y: -triggerHeight };
  const animationAnimate =
    computedPosition.vertical === 'down'
      ? { opacity: 1, y: 8 }
      : { opacity: 1, y: -triggerHeight - 8 };
  const animationExit = animationInitial;

  const handleToggleDropdown = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ignora se o clique foi no trigger
      if (
        triggerRef.current &&
        triggerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // Fecha o dropdown se o clique for fora do dropdown
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

  // Foca no primeiro item do dropdown ao abrir, se não houver nenhum selecionado
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

  // Fecha o dropdown ao apertar Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  // Fecha o dropdown ao sair do foco do menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const currentMenu = menuRef.current;
      const handleFocusOut = (e: FocusEvent) => {
        const newFocused = e.relatedTarget as Node;
        // Se o novo foco estiver no trigger, não fecha
        if (triggerRef.current && triggerRef.current.contains(newFocused)) {
          return;
        }
        if (!currentMenu.contains(newFocused)) {
          setIsOpen(false);
        }
      };
      currentMenu.addEventListener('focusout', handleFocusOut);
      return () => {
        currentMenu.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, [isOpen]);

  // Define as classes do menu com base na posição calculada
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
        <EnterAnimation
          delay={0.3}
          initial={animationInitial}
          animate={animationAnimate}
          exit={animationExit}
        >
          <div ref={menuRef} className={menuClasses}>
            <div
              className={cn(
                'max-h-[400px] overflow-y-auto',
                scrollbarClassname,
              )}
            >
              {React.Children.map(children, (child) => {
                if (!React.isValidElement(child) || !('type' in child))
                  return child;

                if (typeof child.type === 'string') {
                  const intrinsicType =
                    child.type as keyof JSX.IntrinsicElements;
                  return React.cloneElement(
                    child as React.ReactElement<
                      JSX.IntrinsicElements[typeof intrinsicType]
                    >,
                    { tabIndex: child.props.tabIndex ?? 0 },
                  );
                }
                return React.cloneElement(
                  child as React.ReactElement<DropdownOptionProps>,
                  {
                    setIsOpen,
                    triggerRef,
                  },
                );
              })}
            </div>
          </div>
        </EnterAnimation>
      )}
    </div>
  );
}
