'use client';

import { cn } from '@/helpers/twUtils';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
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
        'flex w-full max-w-[180px] items-center justify-center rounded-lg border-2 bg-white px-4 py-2 font-semibold text-textLight transition-colors hover:bg-hoverBgLight disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-textDark dark:hover:bg-hoverBgDark disabled:dark:opacity-60 disabled:dark:hover:bg-slate-900',
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
