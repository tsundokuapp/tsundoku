'use client';
import { BookOpenText, DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tag } from '../common/Tag';

export interface ChapterProps {
  number: string;
  date: Date;
  variant?: 'regular' | 'fill';
}

export function Chapter({ number, date, variant = 'regular' }: ChapterProps) {
  // Caso o back-end forneça o link, não é necessário usar o hook usePathname e nem 'use client'
  const pathname = usePathname();
  const chapterLink = `${pathname}/${number}`;
  const formatDate = date.toLocaleDateString('pt-BR');
  const tagText = variant === 'regular' ? 'Leia Agora' : 'Lido';

  return (
    <Link
      href={chapterLink}
      className="flex flex-row items-center justify-between border-b border-slate-200 px-6 py-4 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
    >
      <div className="flex flex-row items-center gap-2">
        <BookOpenText size={24} weight={variant} />

        <span className="font-bold"> Capítulo {number}</span>
        <DotOutline size={24} weight="fill" />
        <span className="text-sm">{formatDate}</span>
      </div>
      <span>
        <Tag variant={variant}>{tagText}</Tag>
      </span>
    </Link>
  );
}
