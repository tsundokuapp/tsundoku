'use client';

import { BookOpen, PencilSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/shared/utils/cn';

export interface ObraCardProps {
  id: string;
  title: string;
  coverUrl?: string;
  slug: string;
  worktype: 'novel' | 'comic';
  author?: string;
  status?: string;
  className?: string;
  onEdit?: () => void;
}

export function ObraCard({
  title,
  coverUrl,
  slug,
  worktype,
  author,
  status,
  className,
  onEdit,
}: ObraCardProps) {
  const [imageError, setImageError] = useState(false);
  const detailHref = `/project/${worktype}/${slug}`;

  return (
    <div
      data-testid="obra-card"
      className={cn(
        'group relative flex w-full max-w-[235px] flex-col overflow-hidden rounded-[8px] bg-[#202024] shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl',
        'aspect-[150/225] sm:aspect-[235/300]',
        className,
      )}
    >
      {/* Cover Image */}
      <div className="absolute inset-0 h-full w-full">
        {coverUrl && !imageError ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 150px, 235px"
            className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#18181b] p-4 text-center text-xs text-[#6c757d]">
            {title}
          </div>
        )}

        {/* Bottom gradient overlay matching Figma */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Status Badge (optional top tag) */}
      {status && (
        <div className="absolute left-2 top-2 z-10">
          <span className="rounded-[4px] bg-[#259cc1]/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#121214]">
            {status}
          </span>
        </div>
      )}

      {/* Card Content & Quick Actions */}
      <div className="relative z-10 mt-auto flex flex-col justify-end p-3">
        <Link href={detailHref} className="focus:outline-none" title={title}>
          <h3 className="line-clamp-2 text-sm font-bold text-[#e1e1e6] transition-colors hover:text-[#259cc1] sm:text-[16px]">
            {title}
          </h3>
          {author && (
            <p className="mt-0.5 truncate text-[11px] text-[#a8a8b3]">
              {author}
            </p>
          )}
        </Link>

        {/* Action Overlay Buttons matching Figma 1268:29219 & 1268:29222 */}
        <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2">
          <Link
            href={detailHref}
            aria-label={`Ver índice de ${title}`}
            className="group/btn relative flex flex-1 items-center justify-center gap-1 rounded-[4px] bg-black/60 py-1.5 text-[11px] font-medium text-[#e1e1e6] backdrop-blur-sm transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
          >
            <BookOpen size={14} weight="bold" />
            <span>Índice</span>
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/btn:opacity-100">
              Índice
            </span>
          </Link>

          {onEdit ? (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Editar ${title}`}
              className="group/btn relative flex flex-1 items-center justify-center gap-1 rounded-[4px] bg-black/60 py-1.5 text-[11px] font-medium text-[#e1e1e6] backdrop-blur-sm transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
            >
              <PencilSimple size={14} weight="bold" />
              <span>Editar</span>
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/btn:opacity-100">
                Editar
              </span>
            </button>
          ) : (
            <Link
              href={detailHref}
              aria-label={`Editar ${title}`}
              className="group/btn relative flex flex-1 items-center justify-center gap-1 rounded-[4px] bg-black/60 py-1.5 text-[11px] font-medium text-[#e1e1e6] backdrop-blur-sm transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
            >
              <PencilSimple size={14} weight="bold" />
              <span>Editar</span>
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/btn:opacity-100">
                Editar
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
