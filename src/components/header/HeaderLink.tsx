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
        'relative text-white font-bold text-xl uppercase transition-all duration-300 group'
      }
    >
      {text}
      <span
        className={`absolute left-0 bottom-0 w-full h-[2px] bg-sky-600 transform transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  );
}
