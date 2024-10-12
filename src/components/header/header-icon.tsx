import Link from 'next/link';
import type { ReactNode } from 'react';

interface HeaderIconProps {
  action?: string;
  children: ReactNode;
}
export function HeaderIcon({ action = '/', children }: HeaderIconProps) {
  return (
    <Link href={action}>
      <span className="flex items-center rounded-full bg-slate-700 text-white w-10 h-10 justify-center">
        {children}
      </span>
    </Link>
  );
}
