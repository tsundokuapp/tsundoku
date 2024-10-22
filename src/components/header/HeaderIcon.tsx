import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/helpers/twUtils';

interface HeaderIconProps {
  action?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: CSSProperties | string;
}
export function HeaderIcon({
  action,
  children,
  className,
  ...props
}: HeaderIconProps) {
  return (
    <div className={cn(className)}>
      {action ? (
        <Link href={action}>
          <span
            {...props}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white hover:bg-gradient-to-b hover:from-slate-700 hover:to-slate-800"
          >
            {children}
          </span>
        </Link>
      ) : (
        <span
          {...props}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-700 text-white hover:bg-gradient-to-b hover:from-slate-700 hover:to-slate-800"
        >
          {children}
        </span>
      )}
    </div>
  );
}
