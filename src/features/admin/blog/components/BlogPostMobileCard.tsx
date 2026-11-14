'use client';

import { BookOpen, PencilSimple } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { IAdminBlogPost } from '../types/blogAdmin';

interface BlogPostMobileCardProps {
  post: IAdminBlogPost;
  editHref?: string;
}

export const BlogPostMobileCard = ({
  post,
  editHref,
}: BlogPostMobileCardProps) => {
  const targetEditHref = editHref || `/admin/posts/${post.slug}`;

  return (
    <div
      className="flex min-h-[73px] w-full items-center justify-between gap-3 rounded-lg border border-[#2e2e38] bg-[#202024] p-3 shadow-[4px_4px_4px_0px_rgba(0,0,0,0.4)]"
      data-testid={`blog-post-mobile-card-${post.slug}`}
    >
      <div className="flex-1 overflow-hidden">
        <h4
          className="line-clamp-2 text-sm font-bold text-[#e1e1e6]"
          title={post.title}
        >
          {post.title}
        </h4>
        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-gray-400">
          <span className="text-[#259cc1]">{post.category}</span>
          <span>•</span>
          <span>{post.status}</span>
        </div>
      </div>

      {/* Action Buttons: 30x30 touch targets */}
      <div className="flex shrink-0 items-center gap-1.5">
        <Link
          href={`/blog?post=${post.slug}`}
          target="_blank"
          title="Visualizar Artigo"
          className="flex h-[32px] w-[32px] items-center justify-center rounded bg-[#18181b] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
        >
          <BookOpen size={16} />
        </Link>
        <Link
          href={targetEditHref}
          title="Editar Artigo"
          className="flex h-[32px] w-[32px] items-center justify-center rounded bg-[#18181b] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
        >
          <PencilSimple size={16} />
        </Link>
      </div>
    </div>
  );
};
