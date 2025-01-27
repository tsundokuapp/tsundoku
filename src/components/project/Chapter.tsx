'use client';
import { BookOpenText, DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Tag } from '../common/Tag';

export interface ChapterProps extends React.HTMLAttributes<HTMLAnchorElement> {
  number: string;
  date: Date | string;
  variant?: 'regular' | 'fill';
  border?: 'bottom' | 'full';
}

export function Chapter({
  number,
  date,
  variant = 'regular',
  border = 'bottom',
  className,
  ...props
}: ChapterProps) {
  // Caso o back-end forneça o link, não é necessário usar o hook usePathname e nem 'use client'
  console.log('numero', number);
  const pathname = usePathname();
  const chapterLink = `${pathname}/${number}`;
  const formatDate = new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tagText = variant === 'regular' ? 'Leia Agora' : 'Lido';

  return (
    <Link
      data-border={border}
      href={chapterLink}
      className={twMerge(
        'flex flex-row items-center justify-between border-slate-200 px-6 py-4 hover:bg-slate-100 data-[border=full]:rounded-lg data-[border=full]:border data-[border=bottom]:border-b dark:border-slate-800 dark:hover:bg-slate-800 data-[border=full]:dark:bg-slate-800 data-[border=full]:dark:hover:bg-slate-900',
        className,
      )}
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        <BookOpenText size={24} weight={variant} />

        <span className="font-bold"> Capítulo {number}</span>
        <DotOutline size={24} weight="fill" />
        <span className="text-sm">{formatDate}</span>
      </div>
      <span>
        <Tag variant={variant} text={tagText} />
      </span>
    </Link>
  );
}
