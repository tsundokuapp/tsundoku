'use client';

import {
  MagnifyingGlass,
  Plus,
  SquaresFour,
  Table as TableIcon,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { BlogPostCard } from '@/features/admin/blog/components/BlogPostCard';
import { BlogPostMobileCard } from '@/features/admin/blog/components/BlogPostMobileCard';
import { BlogPostTable } from '@/features/admin/blog/components/BlogPostTable';
import {
  useAdminBlogPosts,
  useDeleteAdminBlogPost,
} from '@/features/admin/blog/hooks/useBlogAdmin';
import { IAdminBlogPost } from '@/features/admin/blog/types/blogAdmin';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';
import { useToaster } from '@/shared/contexts/ToasterContext';

export default function BlogPostsPage() {
  const { toaster } = useToaster();
  const { data: postsResult, isLoading } = useAdminBlogPosts();
  const deleteMutation = useDeleteAdminBlogPost();

  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const posts = useMemo(() => postsResult?.data || [], [postsResult?.data]);
  const isUnavailable = postsResult?.isUnavailable || false;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === 'Todos') return true;
      return post.status === statusFilter;
    });
  }, [posts, search, statusFilter]);

  const handleDeletePost = async (post: IAdminBlogPost) => {
    try {
      const res = await deleteMutation.mutateAsync(post.id);
      if (res.success) {
        toaster({
          type: 'success',
          msg: `Post "${post.title}" excluído.`,
        });
      } else {
        toaster({
          type: 'warning',
          msg: res.message || 'Erro ao excluir post.',
        });
      }
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao excluir post.',
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      {/* Header & Breadcrumbs */}
      <header className="mb-6 flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Posts do Blog
        </h1>
        <p className="text-sm text-gray-400">
          Gerenciamento e publicação de artigos, entrevistas, atualizações e
          devaneios.
        </p>
      </header>

      {/* Production R3 Notice Banner if backend unavailable */}
      {isUnavailable && (
        <div
          className="mb-6 rounded-lg border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-300"
          data-testid="blog-posts-prod-notice"
        >
          ℹ️ {postsResult?.unavailableReason}
        </div>
      )}

      {/* Search, Status Filter & View Toggle Bar (Figma 1302:35487 / 1192:618) */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar (500x40px) */}
          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por posts, por categoria..."
              className="h-[40px] w-full rounded-lg border border-[#2e2e38] bg-[#202024] pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-[40px] rounded-lg border border-[#2e2e38] bg-[#202024] px-3 text-sm text-white transition-colors focus:border-[#259cc1] focus:outline-none"
          >
            <option value="Todos">Todos os Status</option>
            <option value="Publicado">Publicados</option>
            <option value="Rascunho">Rascunhos</option>
          </select>
        </div>

        {/* View Toggle (Grid / Table) & Add Post Button */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-lg border border-[#2e2e38] bg-[#202024] p-1 sm:flex">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Visualização em Grade de Cards"
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#259cc1] text-[#121214]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <SquaresFour size={18} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Visualização em Tabela"
              className={`rounded p-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-[#259cc1] text-[#121214]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TableIcon size={18} />
            </button>
          </div>

          <Link
            href="/admin/posts/novo"
            className="flex h-[40px] items-center gap-2 rounded-lg bg-[#259cc1] px-4 text-sm font-semibold text-[#121214] transition-all hover:brightness-110"
          >
            <Plus size={18} weight="bold" />
            Adicionar
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Carregando artigos do blog...
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#2e2e38] py-12 text-center text-sm text-gray-400">
          Nenhum artigo encontrado.
        </div>
      ) : (
        <>
          {/* Mobile View: Feature 37 (Figma 1321:35631) */}
          <div className="flex flex-col gap-2.5 sm:hidden">
            {filteredPosts.map((post) => (
              <BlogPostMobileCard key={post.id} post={post} />
            ))}
          </div>

          {/* Desktop View: Grid or Table */}
          <div className="hidden sm:block">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <BlogPostTable
                posts={filteredPosts}
                onDelete={handleDeletePost}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
