// Color Checked
// Components Checked
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
  text?: string;
}

export function Cover({
  src,
  title,
  category,
  action,
  actionHome,
  children,
  text = '',
}: CoverProps) {
  const PathToNavigate = (slug: string, type: string) => {
    if (!slug) {
      return '/';
    }

    if (type === 'Light Novel' || type === 'Web Novel') {
      return `/novels/${slug}`;
    }
    return `/comics/${slug}`;
  };

  const actionByHome = PathToNavigate(actionHome!, category);

  return (
    <Link
      href={action || actionByHome}
      className="group flex w-[180px] flex-col gap-1"
    >
      <div className="relative overflow-hidden rounded-md">
        <Image
          src={src}
          alt={title}
          className="h-64 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
          width={180}
          height={256}
        />
        {children}
        <div
          data-text={text}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 transform justify-center rounded-full bg-appHighlight px-3 py-1.5 text-xs font-bold uppercase text-appHighlightText shadow-xl data-[text='']:hidden"
        >
          {text}
        </div>
      </div>
      <div className="flex max-w-[180px] flex-col flex-wrap">
        <h1 className="max-w-[180px] text-wrap text-base font-bold text-appTitle">
          {title}
        </h1>
        <p className="text-sm text-appSubtitle">{category}</p>
      </div>
    </Link>
  );
}
