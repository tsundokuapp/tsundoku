'use client';
// Color Checked
// Components Checked
import { BookOpenText, DotOutline } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/twUtils';
import { useNovelStore } from '@/store/useNovelStore';

import { Tag } from '../common/Tag';

export interface ChapterProps extends React.HTMLAttributes<HTMLAnchorElement> {
  id: string;
  slug: string;
  name: string;
  number?: string;
  date?: Date | string;
  variant?: 'regular' | 'fill';
  border?: 'bottom' | 'full';
}

export function Chapter({
  id,
  slug,
  name,
  number,
  date = new Date(),
  variant = 'regular',
  border = 'bottom',
  className,
  ...props
}: ChapterProps) {
  const { setChapterId } = useNovelStore();

  const pathname = usePathname();
  const chapterLink = `${pathname}/${slug}`;
  const formatDate = new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const tagText = variant === 'regular' ? 'Leia Agora' : 'Lido';

  const handleClick = () => {
    setChapterId(id);
  };

  const ChapterInfo = ({
    name,
    date,
    number,
  }: {
    name: string;
    date: string;
    number: string;
  }) => {
    return (
      <div className="flex flex-row items-center gap-2">
        <BookOpenText size={24} weight={variant} />

        {number !== '' ? (
          <span className="font-bold">Capítulo {number}</span>
        ) : (
          <span className="font-bold">{name}</span>
        )}
        <DotOutline size={24} weight="fill" className="hidden md:inline" />
        <span className="hidden text-sm md:inline">{date}</span>
      </div>
    );
  };

  return (
    <Link
      data-border={border}
      href={chapterLink}
      className={cn(
        'flex flex-row items-center justify-between border-appListBorder px-6 py-4 hover:bg-appListHover data-[border=full]:rounded-lg data-[border=full]:border data-[border=bottom]:border-b',
        className,
      )}
      onClick={() => handleClick()}
      {...props}
    >
      <ChapterInfo name={name} number={number ?? ''} date={formatDate} />

      <span>
        <Tag variant={variant} text={tagText} />
      </span>
    </Link>
  );
}
