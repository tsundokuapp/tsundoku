'use client';

import { type ComponentProps, type ReactNode } from 'react';

import { HeaderButtonLogin } from '@/shared/components/layout/header/HeaderButtonLogin';
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
      className="fixed left-0 top-0 z-50 flex w-full flex-col gap-2 bg-appBackground px-2 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4"
      {...props}
    >
      <div className="flex w-full items-center justify-between sm:w-auto sm:flex-1">
        <Breadcrump
          sufixList={sufixList}
          removeList={removeList}
          isReader={isReader}
          className="shrink-0"
        />

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle buttonClassName="border border-appMenuBorder bg-appInputBackground text-appText hover:bg-appGroupBackground" />
          <HeaderButtonLogin compact />
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-end [&>*]:shrink-0">
        {children}
        <ThemeToggle buttonClassName="hidden border border-appMenuBorder bg-appInputBackground text-appText hover:bg-appGroupBackground sm:flex" />
        <div className="hidden sm:block">
          <HeaderButtonLogin compact />
        </div>
      </div>
    </div>
  );
}
