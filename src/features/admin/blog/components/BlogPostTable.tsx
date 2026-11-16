'use client';

import {
  BookOpen,
  Eye,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

import { IAdminBlogPost } from '../types/blogAdmin';

interface BlogPostTableProps {
  posts: IAdminBlogPost[];
  onDelete?: (post: IAdminBlogPost) => void;
  editHrefPrefix?: string;
}

export const BlogPostTable = ({
  posts,
  onDelete,
  editHrefPrefix = '/admin/posts',
}: BlogPostTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#2e2e38] bg-[#121214]">
      <table className="w-full text-left text-sm text-gray-200">
        <thead className="border-b border-[#2e2e38] bg-[#202024] text-xs uppercase text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4 font-semibold">
              Título Post
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Autor
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Status
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Views
            </th>
            <th scope="col" className="px-4 py-4 font-semibold">
              Data
            </th>
            <th scope="col" className="px-6 py-4 text-right font-semibold">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#202024]">
          {posts.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-400">
                Nenhum post encontrado.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr
                key={post.id}
                className="h-[60px] bg-[#18181b]/60 transition-colors hover:bg-[#202024]"
                data-testid={`blog-post-row-${post.slug}`}
              >
                <td className="px-6 py-3 font-medium text-white">
                  <div className="max-w-[420px]">
                    <div className="truncate font-semibold text-[#e1e1e6] hover:text-[#259cc1]">
                      {post.title}
                    </div>
                    <span className="text-xs text-gray-400">
                      {post.category}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">{post.author}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      post.status === 'Publicado'
                        ? 'border border-emerald-500/40 bg-emerald-950/80 text-emerald-400'
                        : 'border border-amber-500/40 bg-amber-950/80 text-amber-400'
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">
                  <span className="flex items-center gap-1">
                    <Eye size={14} className="text-gray-400" />
                    {post.views.toLocaleString('pt-BR')}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {post.publishedAt || post.createdAt}
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/blog?post=${post.slug}`}
                      target="_blank"
                      title="Visualizar no site"
                      className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                    >
                      <BookOpen size={16} />
                    </Link>
                    <Link
                      href={`${editHrefPrefix}/${post.slug}`}
                      title="Editar Post"
                      className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                    >
                      <PencilSimple size={16} />
                    </Link>
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(post)}
                        title="Excluir Post"
                        className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-red-600 hover:text-white"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
