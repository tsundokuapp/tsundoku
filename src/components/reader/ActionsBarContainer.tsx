'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { Breadcrump } from '../common/Breadcrump';
import { ThemeToggle } from '../theme/ThemeToogle';

interface ActionsBarContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
}

export function ActionsBarContainer({
  children,
  ...props
}: ActionsBarContainerProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 shadow-sm dark:bg-zinc-900"
      {...props}
    >
      <Breadcrump sufixList={['Capítulo']} removeList={['reader']} />

      <div className="flex flex-row gap-2">
        {children}
        <ThemeToggle />
      </div>
    </div>
  );
}
