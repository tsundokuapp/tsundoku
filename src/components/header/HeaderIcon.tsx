// Color Checked
// Components Checked
import Link from 'next/link';
import type { ReactNode } from 'react';

import { merge } from '@/helpers/twUtils';

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
    <div className={merge(className)}>
      {action ? (
        <Link href={action}>
          <span
            {...props}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-appButtonBackground text-appButtonIcon hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
          >
            {children}
          </span>
        </Link>
      ) : (
        <span
          {...props}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-appButtonBackground text-appButtonIcon hover:bg-gradient-to-b hover:from-appButtonBackground hover:to-appButtonHover"
        >
          {children}
        </span>
      )}
    </div>
  );
}
