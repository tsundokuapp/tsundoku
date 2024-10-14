'use client';

import {
  MagnifyingGlass,
  DiscordLogo,
  User,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';

import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
import { HeaderSearch } from './HeaderSearch'; // Certifique-se de ter este componente
import { ThemeToggle } from '../theme/ThemeToogle';

export function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchButton = () => {
    setIsSearchActive(true);
  };

  useEffect(() => {
    const checkClickOutsideHeader = (event: MouseEvent) => {
      const headerElement = document.querySelector('header');
      if (headerElement && !headerElement.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    const checkKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchActive(false);
      }
    };

    if (isSearchActive) {
      document.addEventListener('mousedown', checkClickOutsideHeader);
      document.addEventListener('keydown', checkKeyPress);
    } else {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
    }

    return () => {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
    };
  }, [isSearchActive]);

  return (
    <header className="flex h-[120px] items-center justify-between bg-slate-900 px-[180px]">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-2 text-2xl font-extrabold text-white"
          href="/"
        >
          <span className="text-sky-600">/</span>
          Tsundoku
          <span className="text-sky-600">/</span>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        {isSearchActive ? (
          <div ref={searchRef}>
            <HeaderSearch autoFocus />
          </div>
        ) : (
          <>
            <HeaderLink text="Home" />
            <HeaderLink text="Novels" action="/novels" />
            <HeaderLink text="Comics" action="/comics" />
            <HeaderLink text="Blog" action="/blog" />
            <HeaderLink text="Sobre Nós" action="/about" />
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <HeaderIcon onClick={() => handleSearchButton()}>
          <MagnifyingGlass size={24} />
        </HeaderIcon>
        <HeaderIcon action="https://discord.com/invite/x4MyhMn3TQ">
          <DiscordLogo size={24} />
        </HeaderIcon>
        <HeaderIcon>
          <User size={24} />
        </HeaderIcon>
        <ThemeToggle />
      </div>
    </header>
  );
}
