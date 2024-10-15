'use client';

import { CaretDoubleLeft, List, User } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useContext, useState, createContext } from 'react';

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
    <aside className="h-screen">
      <nav className="flex h-full flex-col border-r bg-slate-700 shadow-sm">
        <div className="item-center flex justify-between p-4 pb-2">
          <span
            className={`overflow-hidden text-lg text-white transition-all ${expanded ? 'w-32' : 'w-0'}`}
          >
            <p>Área Admin</p>
          </span>
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="h-[44px] rounded-lg bg-indigo-400 p-2.5 transition-colors hover:bg-indigo-500"
          >
            {expanded ? <CaretDoubleLeft size={24} /> : <List size={24} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex border-t p-3">
          <User size={24} />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}
          >
            <h4 className="font-semibold">Admin</h4>
            <span className="text-xs text-gray-600">user@tsundoku.com</span>
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
        className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3.5 py-2.5 font-medium transition-colors ${isActive ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 hover:text-gray-600'} `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
          />
        )}

        {!expanded && (
          <div
            className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
