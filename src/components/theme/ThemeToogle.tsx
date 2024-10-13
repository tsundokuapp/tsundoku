'use client';

import { Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle() {
    document.documentElement.classList.add('theme-transition');
    setTheme(theme === 'light' ? 'dark' : 'light');
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 100); // A mesma duração definida na transição CSS
  }

  return (
    <button
      className="flex items-center rounded-full bg-slate-700 text-white w-10 h-10 justify-center"
      onClick={() => handleThemeToggle()}
    >
      <Sun size={24} className="hidden dark:block" />
      <Moon size={24} className="block dark:hidden " />
    </button>
  );
}
