import { CSSProperties, ReactNode } from 'react';

import { merge } from '@/helpers/twUtils';

interface TableProps {
  children: ReactNode;
  className?: CSSProperties | string;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <table
      className={merge(
        'w-full text-left text-sm text-gray-500 dark:text-gray-400',
        className,
      )}
    >
      {children}
    </table>
  );
};
