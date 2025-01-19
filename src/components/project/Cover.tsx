import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface CoverProps {
  src: string;
  title: string;
  category: string;
  action?: string;
  actionHome?: string;
  children?: ReactNode;
}

export function Cover({
  src,
  title,
  category,
  action = '#',
  // usar actionHome quando o item é exibido na home
  actionHome,
  children,
}: CoverProps) {
  // TODO: criar um helper para tratar todos os casos de category
  const normalizedCategory = category === 'Mangá' ? 'comics' : 'novels';
  const actionByHome = `${normalizedCategory}/${actionHome}`;

  return (
    <Link
      href={actionByHome || action}
      className="group flex w-[180px] flex-col gap-1"
    >
      <div className="overflow-hidden rounded-md">
        <Image
          src={src}
          alt={title}
          className="h-64 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
          width={180}
          height={256}
        />
        {children}
      </div>
      <div className="flex max-w-[180px] flex-col flex-wrap">
        <h1 className="max-w-[180px] truncate text-base font-bold">{title}</h1>
        <p className="text-sm">{category}</p>
      </div>
    </Link>
  );
}
