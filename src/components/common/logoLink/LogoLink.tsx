// Color Checked
// Components Checked
import Link from 'next/link';

import { cn } from '@/helpers/twUtils';

interface LogoLinkProps {
  className?: string;
  label?: string;
}

export const LogoLink = ({ className, label }: LogoLinkProps) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-2 text-2xl font-extrabold text-appText',
        className,
      )}
      href="/"
    >
      <span className="text-appHeaderHighlight">/</span>
      {label ? <>{label}</> : <>Tsundoku</>}
      <span className="text-appHeaderHighlight">/</span>
    </Link>
  );
};
