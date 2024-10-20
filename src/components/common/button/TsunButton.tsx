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

export const TsunButton = ({
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
        'focus:ring-3 mb-2 me-2 flex h-7 w-fit items-center justify-center gap-2 rounded bg-blue-500 px-5 py-2.5 text-sm text-white hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
        {
          className,
        },
      )}
      {...props}
    >
      {icon && sideIcon === 'left' && icon}
      {children}
      {icon && sideIcon === 'right' && icon}
    </button>
  );
};
