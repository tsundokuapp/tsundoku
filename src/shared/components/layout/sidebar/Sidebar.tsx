'use client';

import {
  ArrowCircleLeft,
  List,
  UserCircle,
} from '@phosphor-icons/react/dist/ssr';
import { ReactNode, useCallback, useState } from 'react';

import { LogoLink } from '@/shared/components/ui/logoLink/LogoLink';
import { cn } from '@/shared/utils/cn';

import { SidebarContext } from './SidebarContext';

export interface SidebarProps {
  children?: ReactNode;
  userName?: string;
  userEmail?: string;
}

export function Sidebar({
  children,
  userName = 'Admin',
  userEmail = 'user@tsundoku.com',
}: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <aside className="fixed z-50 h-full" role="navigation">
      <nav
        className="flex h-dvh flex-col border-r bg-appHeaderBackground p-2 text-appButtonText"
        aria-label="Menu principal"
      >
        <div className="item-center flex justify-between p-4 pb-2">
          <span
            className={cn(
              'flex items-center justify-center overflow-hidden text-lg transition-all',
              {
                'w-32': expanded,
                'w-0': !expanded,
              },
            )}
          >
            <LogoLink className="text-lg" />
          </span>
          <button
            onClick={toggle}
            aria-label={expanded ? 'Recolher menu' : 'Expandir menu'}
            aria-expanded={expanded}
            className="h-[44px] rounded-lg p-2.5 transition-colors hover:bg-appButtonHover"
          >
            {expanded ? <ArrowCircleLeft size={24} /> : <List size={24} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded, toggle }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex justify-center border-t p-3 pt-5 text-appButtonText">
          <UserCircle size={32} weight="fill" aria-hidden="true" />
          <div
            className={cn(
              'flex items-center justify-between overflow-hidden transition-all',
              {
                'ml-3 w-52': expanded,
                'w-0': !expanded,
              },
            )}
          >
            <h4 className="font-semibold text-appButtonText">{userName}</h4>
            <span className="text-xs text-appButtonText">{userEmail}</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
