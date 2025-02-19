'use client';
// Color Checked
// Components Checked
import { Check, Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';

import { EnterAnimation } from '@/animation/EnterAnimation';

const themeOptions = [
  { label: 'Light', value: 'theme-light' },
  { label: 'Sepia', value: 'theme-sepia' },
  { label: 'Dark Blue', value: 'theme-blue' },
  { label: 'Dark', value: 'theme-dark' },
];

export function ThemeToggle() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(newTheme: string) {
    setTheme(newTheme);
    setIsOpen(false);
  }

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
    <div ref={dropdownRef} className="relative">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-appButtonBackground text-appButtonIcon hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === 'dark' || theme === 'blue' ? (
          <>
            <Sun size={24} className="block dark:hidden" />
            <Moon size={24} className="hidden dark:block" />
          </>
        ) : (
          <>
            <Sun size={24} className="hidden dark:block" />
            <Moon size={24} className="block dark:hidden" />
          </>
        )}
      </button>

      {isOpen && (
        <EnterAnimation delay={0.3} className="absolute z-10">
          <ul className="absolute mt-2 w-36 rounded-md bg-appMenuBackground p-1 shadow-md">
            {themeOptions.map(({ label, value }) => (
              <li
                key={value}
                onClick={() => handleSelect(value)}
                className="m-1 flex cursor-pointer items-center rounded-lg bg-appMenuBackground px-3 py-2 text-sm text-appMenuText hover:bg-appMenuHover"
              >
                <span className="ml-2">{label}</span>
                {value === theme && <Check className="ml-auto h-5 w-5" />}
              </li>
            ))}
          </ul>
        </EnterAnimation>
      )}
    </div>
  );
}
