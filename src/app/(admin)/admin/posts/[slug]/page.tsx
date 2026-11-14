'use client';

import { useParams } from 'next/navigation';

import { BlogPostForm } from '@/features/admin/blog/components/BlogPostForm';
import { useAdminBlogPost } from '@/features/admin/blog/hooks/useBlogAdmin';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';

export default function EditarPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: postResult, isLoading } = useAdminBlogPost(slug);
  const post = postResult?.post;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      <div className="mb-4">
        <AdminBreadcrumbs />
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-gray-400">
          Carregando dados do artigo...
        </div>
      ) : !post ? (
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 py-12 text-center text-sm text-red-400">
          Artigo não encontrado. Verifique se o slug fornecido está correto.
        </div>
      ) : (
        <BlogPostForm
          initialData={post}
          isEdit={true}
          backHref="/admin/posts"
        />
      )}
    </div>
  );
}
