'use client';

import { CSSProperties } from 'react';

import { cn } from '@/helpers/twUtils';

interface IButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: CSSProperties | string;
  icon?: JSX.Element;
  sideIcon?: 'left' | 'right';
}

export const Button = ({
  children,
  onClick,
  className,
  icon,
  sideIcon = 'left',
  ...props
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'disable:bg-slate-300 flex w-full max-w-[180px] items-center justify-center rounded-lg border-2 bg-white px-4 py-2 font-semibold text-textLight transition-colors hover:bg-hoverBgLight dark:border-slate-700 dark:bg-slate-900 dark:text-textDark dark:hover:bg-hoverBgDark',
        className,
      )}
      {...props}
    >
      {icon && sideIcon === 'left' && icon}
      {children}
      {icon && sideIcon === 'right' && icon}
    </button>
  );
};
