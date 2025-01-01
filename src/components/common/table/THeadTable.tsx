import { CSSProperties, ReactNode } from 'react';

import { cn } from '@/helpers/twUtils';

interface THeadeTableProps {
  children: ReactNode;
  className?: CSSProperties | string;
}

export const THeadTable = ({ children, className }: THeadeTableProps) => {
  return (
    <thead
      className={cn(
        'bg-slate-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400',
        className,
      )}
    >
      {children}
    </thead>
  );
};
