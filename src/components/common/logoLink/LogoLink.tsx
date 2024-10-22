import Link from 'next/link';
import { CSSProperties } from 'react';

import { cn } from '@/helpers/twUtils';

interface LogoLinkProps {
  className?: CSSProperties | string;
}

export const LogoLink = ({ className }: LogoLinkProps) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-2 text-2xl font-extrabold text-white',
        className,
      )}
      href="/"
    >
      <span className="text-sky-600">/</span>
      Tsundoku
      <span className="text-sky-600">/</span>
    </Link>
  );
};
