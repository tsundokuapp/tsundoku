'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

import { useSidebar } from './SidebarContext';

export interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  alert?: boolean;
  action: string;
}

export function SidebarItem({
  icon,
  text,
  alert,
  action = '/',
}: SidebarItemProps) {
  const { expanded } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === action;

  return (
    <li
      className={cn(
        'group relative my-1 flex cursor-pointer rounded-md font-medium text-appButtonText transition-colors',
        {
          'bg-appButtonBackground text-appButtonText': isActive,
          'hover:bg-appButtonHover hover:text-appButtonText': !isActive,
        },
      )}
    >
      <Link
        href={action}
        className="flex w-full items-center px-3.5 py-2.5"
        aria-current={isActive ? 'page' : undefined}
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
          <span
            className={cn('bg-secondary absolute right-2 h-2 w-2 rounded', {
              'top-[1.2rem]': expanded,
              'top-2': !expanded,
            })}
            aria-label="Notificação"
          />
        )}
      </Link>

      {!expanded && (
        <div
          role="tooltip"
          className="invisible absolute left-full ml-6 -translate-x-3 -translate-y-1 rounded-md bg-appButtonBackground px-4 py-2 text-sm text-appButtonText opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100"
        >
          {text}
        </div>
      )}
    </li>
  );
}
