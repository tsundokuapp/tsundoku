'use client';

import { BookOpen, Eye, PencilSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { IAdminBlogPost } from '../types/blogAdmin';

interface BlogPostCardProps {
  post: IAdminBlogPost;
  editHref?: string;
}

export const BlogPostCard = ({ post, editHref }: BlogPostCardProps) => {
  const [imageError, setImageError] = useState(false);
  const targetEditHref = editHref || `/admin/posts/${post.slug}`;

  return (
    <div
      className="group relative flex w-full max-w-[280px] flex-col overflow-hidden rounded-lg border border-[#2e2e38] bg-[#202024] shadow-md transition-all hover:border-[#259cc1]/60 hover:shadow-lg"
      data-testid={`blog-post-card-${post.slug}`}
    >
      {/* Cover Image Container (approx 16:9) */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#18181b]">
        {!imageError && post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#18181b] p-3 text-center text-xs text-gray-500">
            {post.title}
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute right-2 top-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-semibold ${
              post.status === 'Publicado'
                ? 'border border-emerald-500/40 bg-emerald-950/80 text-emerald-400'
                : 'border border-amber-500/40 bg-amber-950/80 text-amber-400'
            }`}
          >
            {post.status}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-2 left-2">
          <span className="rounded bg-[#121214]/80 px-2 py-0.5 text-xs font-medium text-[#259cc1] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Info & Actions */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <h3
            className="line-clamp-2 text-sm font-bold text-[#e1e1e6] transition-colors group-hover:text-white"
            title={post.title}
          >
            {post.title}
          </h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
            <span>{post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {post.views.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Action Buttons: "Índice" and "Editar" (Figma 1302:35356 / 1302:35359) */}
        <div className="mt-3 flex items-center justify-end gap-2 border-t border-[#2e2e38] pt-2.5">
          <Link
            href={`/blog?post=${post.slug}`}
            target="_blank"
            title="Visualizar Artigo (Índice)"
            className="flex h-7 items-center gap-1.5 rounded bg-[#18181b] px-2.5 text-xs font-medium text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
          >
            <BookOpen size={14} />
            Índice
          </Link>

          <Link
            href={targetEditHref}
            title="Editar Artigo"
            className="flex h-7 items-center gap-1.5 rounded bg-[#18181b] px-2.5 text-xs font-medium text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
          >
            <PencilSimple size={14} />
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
};
