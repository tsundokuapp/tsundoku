'use client';
// Color Checked
// Components Checked
import {
  MagnifyingGlass,
  DiscordLogo,
  User,
  List,
} from '@phosphor-icons/react/dist/ssr';
import React, { useState, useRef, useEffect, type ComponentProps } from 'react';
import { merge } from '@/helpers/twUtils';

import { useSearchBar } from '@/contexts/SearchBarContext';

import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
import { HeaderSearch } from './HeaderSearch';
import { LogoLink } from '../common/logoLink/LogoLink';
import { ThemeToggle } from '../theme/ThemeToogle';

type HeaderBarProps = ComponentProps<'header'>;

export function HeaderBar({ className, ...props }: HeaderBarProps) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { isSearchBarVisible, closeSearchBar } = useSearchBar();

  useEffect(() => {
    const checkClickOutsideHeader = (event: MouseEvent) => {
      const headerElement = document.querySelector('header');
      if (headerElement && !headerElement.contains(event.target as Node)) {
        setIsSearchActive(false);
        closeSearchBar();
      }
    };

    const checkKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchActive(false);
        closeSearchBar();
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
  }, [closeSearchBar, isSearchActive]);

  useEffect(() => {
    if (isSearchBarVisible) {
      setIsSearchActive(true);
    }
  }, [isSearchBarVisible]);

  const handleSearchButton = () => {
    setIsSearchActive(true);
  };

  return (
    <header
      className={merge(
        'bg-appHeaderBackground py-4 sm:py-6',
        'px-6 sm:px-8 lg:px-16',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <LogoLink />

        <div className="mx-4 hidden items-center gap-6 lg:flex">
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

        <div className="hidden items-center gap-4 lg:flex">
          <HeaderIcon onClick={() => handleSearchButton()}>
            <MagnifyingGlass size={24} />
          </HeaderIcon>
          <HeaderIcon action="https://discord.com/invite/x4MyhMn3TQ">
            <DiscordLogo size={24} />
          </HeaderIcon>
          <ThemeToggle />
          <HeaderIcon action="/dashboard">
            <User size={24} />
          </HeaderIcon>
        </div>

        {/* Menu "hambúrguer" visível em telas menores */}
        <div className="flex items-center gap-4 lg:hidden">
          <HeaderIcon action="/dashboard">
            <List size={24} />
          </HeaderIcon>
        </div>
      </div>
    </header>
  );
}
