'use client';

import { useTheme } from 'next-themes';
import { useCallback, useMemo, useRef } from 'react';

import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';

import { THEME_OPTIONS, ThemeValue } from './ThemeToggle';

export function ThemeToggleList() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const currentThemeOption = useMemo(
    () =>
      THEME_OPTIONS.find((option) => option.value === theme) ??
      THEME_OPTIONS[0],
    [theme],
  );

  const handleSelect = useCallback(
    (newTheme: ThemeValue) => {
      if (newTheme === theme) return;
      setTheme(newTheme);
    },
    [theme, setTheme],
  );

  return (
    <div ref={dropdownRef} className="relative">
      <DropdownContainer
        label="Escolher outro Tema"
        value={`Utilizando o Tema ${currentThemeOption.label}`}
        direction="up"
        buttonClassname="h-12 justify-center border border-appButtonBorder bg-transparent text-appButtonText uppercase font-bold hover:bg-appButtonHover"
        menuClassname="w-full"
        className="w-full"
        noIcon
      >
        {THEME_OPTIONS.map(({ label, value }) => (
          <DropdownOption
            key={value}
            label={label}
            value={value}
            onClick={() => handleSelect(value)}
            selected={value === theme}
            className="h-12"
          />
        ))}
      </DropdownContainer>
    </div>
  );
}
