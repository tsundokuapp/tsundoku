'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Breadcrump } from '@/shared/components/ui/Breadcrump';
import { ThemeToggle } from '@/shared/components/ui/theme/ThemeToggle';

interface ActionsBarProps extends ComponentProps<'div'> {
  sufixList?: string[];
  removeList?: string[];
  isReader?: boolean;
  children?: ReactNode;
}

export function ActionsBar({
  sufixList = [],
  removeList = [],
  isReader,
  children,
  ...props
}: ActionsBarProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-appBackground px-6 py-4 shadow-sm"
      {...props}
    >
      <Breadcrump
        sufixList={sufixList}
        removeList={removeList}
        isReader={isReader}
      />

      <div className="flex flex-row gap-2">
        {children}
        <ThemeToggle />
      </div>
    </div>
  );
}
