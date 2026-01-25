'use client';

import { cn } from '@/shared/utils/cn';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  icon?: JSX.Element;
  size?: 'sm' | 'normal' | 'lg';
  sideIcon?: 'left' | 'right';
}

export const Button = ({
  children,
  onClick,
  className,
  icon,
  sideIcon = 'left',
  size = 'normal',
  ...props
}: IButtonProps) => {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    normal: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      tabIndex={0}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        'disabled:hover:bg-appPrimary focus:border-primary flex w-full max-w-[180px] items-center justify-center rounded-lg border-2 bg-white font-semibold text-textLight transition-colors hover:bg-hoverBgLight disabled:cursor-not-allowed disabled:bg-slate-300 disabled:opacity-60',
        sizeClasses[size],
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
