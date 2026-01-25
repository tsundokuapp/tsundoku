import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/utils/cn';

interface HeaderIconProps {
  action?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
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
            className="flex h-10 w-10 items-center justify-center rounded-md bg-transparent text-appButtonIcon hover:bg-appButtonBackground"
          >
            {children}
          </span>
        </Link>
      ) : (
        <span
          {...props}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-transparent text-appButtonIcon hover:bg-appButtonBackground"
        >
          {children}
        </span>
      )}
    </div>
  );
}
