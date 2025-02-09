'use client';
import { BookOpenText, DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/twUtils';
import { useNovelStore } from '@/store/useNovelStore';

import { Tag } from '../common/Tag';

export interface ChapterProps extends React.HTMLAttributes<HTMLAnchorElement> {
  chapterId: string;
  number: string;
  volumeNumber: string;
  date: Date | string;
  variant?: 'regular' | 'fill';
  border?: 'bottom' | 'full';
}

export function Chapter({
  chapterId,
  number,
  date,
  variant = 'regular',
  border = 'bottom',
  className,
  volumeNumber,
  ...props
}: ChapterProps) {
  const { setChapterId } = useNovelStore();

  const pathname = usePathname();
  const chapterLink = `${pathname}/${volumeNumber}/${number}`;
  const formatDate = new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tagText = variant === 'regular' ? 'Leia Agora' : 'Lido';

  const handleClick = () => {
    setChapterId(chapterId);
  };

  return (
    <Link
      data-border={border}
      href={chapterLink}
      className={cn(
        'flex flex-row items-center justify-between border-slate-200 px-6 py-4 hover:bg-slate-100 data-[border=full]:rounded-lg data-[border=full]:border data-[border=bottom]:border-b dark:border-slate-800 dark:hover:bg-slate-800 data-[border=full]:dark:bg-slate-800 data-[border=full]:dark:hover:bg-slate-900',
        className,
      )}
      onClick={() => handleClick()}
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
