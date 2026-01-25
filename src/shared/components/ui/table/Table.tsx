import { CSSProperties, ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface TableProps {
  children: ReactNode;
  className?: CSSProperties | string;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <table
      className={cn(
        'w-full text-left text-sm text-gray-500 dark:text-gray-400',
        className,
      )}
    >
      {children}
    </table>
  );
};
