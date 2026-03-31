'use client';

import { Check, Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { EnterAnimation } from '@/shared/animations/EnterAnimation';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { cn } from '@/shared/utils/cn';

export const THEME_OPTIONS = [
  { label: 'Light', value: 'theme-light' },
  { label: 'Sepia', value: 'theme-sepia' },
  { label: 'Dark Blue', value: 'theme-blue' },
  { label: 'Dark', value: 'theme-dark' },
] as const;

export type ThemeValue = (typeof THEME_OPTIONS)[number]['value'];

interface ThemeToggleProps {
  buttonClassName?: string;
}

export function ThemeToggle({ buttonClassName }: ThemeToggleProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toaster } = useToaster();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = useMemo(
    () => theme === 'theme-dark' || theme === 'theme-blue',
    [theme],
  );

  const handleSelect = useCallback(
    (newTheme: ThemeValue) => {
      if (newTheme === theme) {
        toaster({ type: 'info', msg: 'O tema já está ativo' });
        return;
      }
      setTheme(newTheme);
      setIsOpen(false);
    },
    [theme, setTheme, toaster],
  );

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-label="Alterar tema"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-appButtonIcon hover:bg-appButtonBackground',
          isOpen && 'bg-appButtonBackground',
          buttonClassName,
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {mounted ? (
          isDarkTheme ? (
            <Moon size={24} />
          ) : (
            <Sun size={24} />
          )
        ) : (
          <div className="h-6 w-6" /> // Placeholder para evitar hydration mismatch
        )}
      </button>

      {isOpen && (
        <EnterAnimation delay={0.3} className="relative z-10">
          <ul
            role="menu"
            aria-label="Opções de tema"
            className="absolute right-0 mt-2 w-36 rounded-md bg-appMenuBackground p-1 shadow-md"
          >
            {THEME_OPTIONS.map(({ label, value }) => (
              <li
                key={value}
                role="menuitem"
                tabIndex={0}
                onClick={() => handleSelect(value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(value)}
                className="m-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover focus:bg-appMenuHover focus:outline-none"
              >
                <span className="ml-2">{label}</span>
                {value === theme && (
                  <Check className="ml-auto h-5 w-5" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </EnterAnimation>
      )}
    </div>
  );
}
