import type { ReactNode } from 'react';

interface IButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const TsunButton = ({
  children,
  onClick,
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`focus:ring-3 mb-2 me-2 flex h-7 w-fit items-center justify-center rounded bg-blue-500 px-5 py-2.5 text-sm text-white hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
