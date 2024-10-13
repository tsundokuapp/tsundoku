'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
      className={
        'group relative text-xl font-bold uppercase text-white transition-all duration-300'
      }
    >
      {text}
      <span
        className={`absolute bottom-0 left-0 h-[2px] w-full transform bg-sky-600 transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}
