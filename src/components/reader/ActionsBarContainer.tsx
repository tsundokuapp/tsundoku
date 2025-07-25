'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Breadcrump } from '../common/Breadcrump';
import { ThemeToggle } from '../theme/ThemeToogle';

interface ActionsBarContainerProps extends ComponentProps<'div'> {
  sufixList?: string[];
  removeList?: string[];
  isReader?: boolean;
  children?: ReactNode;
}

export function ActionsBarContainer({
  sufixList = [],
  removeList = [],
  isReader,
  children,
  ...props
}: ActionsBarContainerProps) {
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
