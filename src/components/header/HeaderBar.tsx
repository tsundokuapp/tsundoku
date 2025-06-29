'use client';
// Color Checked
// Components Checked
import {
  MagnifyingGlass,
  DiscordLogo,
  User,
} from '@phosphor-icons/react/dist/ssr';
import { type ComponentProps } from 'react';

import { useSearchBar } from '@/contexts/SearchBarContext';
import { cn } from '@/helpers/twUtils';

import { HeaderIcon } from './HeaderIcon';
import { HeaderLink } from './HeaderLink';
import { HeaderMenu } from './HeaderMenu';
import { LogoLink } from '../common/logoLink/LogoLink';
import { ThemeToggle } from '../theme/ThemeToogle';

type HeaderBarProps = ComponentProps<'header'>;

export function HeaderBar({ className, ...props }: HeaderBarProps) {
  const { isSearchBarVisible, openSearchBar } = useSearchBar();

  const handleSearchButton = () => {
    openSearchBar();
  };

  return (
    <header
      className={cn(
        'bg-appHeaderBackground py-4 sm:py-6',
        'px-6 sm:px-8 lg:px-16',
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
        <LogoLink />

        {!isSearchBarVisible && (
          <div className="mx-4 hidden items-center gap-6 lg:flex">
            <HeaderLink text="Home" />
            <HeaderLink text="Novels" action="/novels" />
            <HeaderLink text="Comics" action="/comics" />
            <HeaderLink text="Blog" action="/blog" />
            <HeaderLink text="Sobre Nós" action="/about" />
          </div>
        )}

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

        <div className="flex items-center gap-4 lg:hidden">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
