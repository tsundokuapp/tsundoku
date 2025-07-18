'use client';

import { CaretDoubleLeft, List, User } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useState, createContext } from 'react';

import { cn } from '@/helpers/twUtils';

import { LogoLink } from '../common/logoLink/LogoLink';

interface SidebarProps {
  children?: ReactNode;
}

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  alert?: boolean;
  action: string;
}

interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps>(
  {} as SidebarContextProps,
);

export function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="fixed z-50 h-full">
      <nav className="flex h-dvh flex-col border-r bg-appHeaderBackground p-2">
        <div className="item-center flex justify-between p-4 pb-2">
          <span
            className={cn(
              'flex items-center justify-center overflow-hidden text-lg text-appText transition-all',
              {
                'w-32': expanded,
                'w-0': !expanded,
              },
            )}
          >
            <LogoLink className="text-xl" />
          </span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="bg-primary h-[44px] rounded-lg p-2.5 transition-colors hover:opacity-80"
          >
            {expanded ? <CaretDoubleLeft size={24} /> : <List size={24} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex justify-center border-t p-3 text-appText">
          <User size={24} />
          <div
            className={cn(
              'flex items-center justify-between overflow-hidden transition-all',
              {
                'ml-3 w-52': expanded,
                'w-0': !expanded,
              },
            )}
          >
            <h4 className="font-semibold text-appText">Admin</h4>
            <span className="text-xs text-appText">user@tsundoku.com</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  alert,
  action = '/',
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const isActive = pathname === action;
  return (
    <Link href={action}>
      <li
        className={cn(
          'group relative my-1 flex cursor-pointer rounded-md px-3.5 py-2.5 font-medium text-appText transition-colors',
          {
            'bg-appSearchBackground text-appSubtitle': isActive,
            'hover:bg-appMenuHover hover:text-appText': !isActive,
          },
        )}
      >
        {icon}
        <span
          className={cn('overflow-hidden transition-all', {
            'ml-3 w-52': expanded,
            'w-0': !expanded,
          })}
        >
          {text}
        </span>
        {alert && (
          <div
            className={cn('bg-secondary absolute right-2 h-2 w-2 rounded', {
              'top-[1.2rem]': expanded,
              'top-2': !expanded,
            })}
          />
        )}

        {!expanded && (
          <div
            className={
              'invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-appBackground px-2 py-1 text-sm text-appText opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100'
            }
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
