'use client';
// Color Checked
// Components Checked
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/twUtils';

interface HeaderLinkProps {
  text: string;
  action?: string;
}

export function HeaderLink({ text, action = '/', ...props }: HeaderLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === action;

  return (
    <Link
      {...props}
      href={action}
      className="group relative text-xs font-bold uppercase text-appHeaderText transition-all duration-300 sm:text-sm xl:text-lg"
    >
      {text}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-[2px] w-full transform bg-appHeaderHighlight transition-transform duration-300',
          {
            'scale-x-100': isActive,
            'scale-x-0 group-hover:scale-x-100': !isActive,
          },
        )}
      />
    </Link>
  );
}
