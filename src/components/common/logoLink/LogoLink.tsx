// Color Checked
// Components Checked
import Link from 'next/link';

import { cn } from '@/helpers/twUtils';

interface LogoLinkProps {
  className?: string;
}

export const LogoLink = ({ className }: LogoLinkProps) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-2 text-2xl font-extrabold text-appHeaderText',
        className,
      )}
      href="/"
    >
      <span className="text-appHeaderHighlight">/</span>
      Tsundoku
      <span className="text-appHeaderHighlight">/</span>
    </Link>
  );
};
