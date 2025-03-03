'use client';
// Color Checked
// Components Checked
import { useTheme } from 'next-themes';
import React, { useRef } from 'react';

import { DropdownContainer } from '../common/dropdown/DropdownContainer';
import { DropdownOption } from '../common/dropdown/DropdownOption';

const themeOptions = [
  { label: 'Light', value: 'theme-light' },
  { label: 'Sepia', value: 'theme-sepia' },
  { label: 'Dark Blue', value: 'theme-blue' },
  { label: 'Dark', value: 'theme-dark' },
];

export function ThemeToggleList() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const currentThemeOption =
    themeOptions.find((option) => option.value === theme) || themeOptions[0];

  function handleSelect(newTheme: string) {
    setTheme(newTheme);
  }

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
        {themeOptions.map(({ label, value }) => (
          <DropdownOption
            key={value}
            label={label}
            value={label}
            onClick={() => handleSelect(value)}
            selected={value === theme}
            className="h-12"
          />
        ))}
      </DropdownContainer>
    </div>
  );
}
