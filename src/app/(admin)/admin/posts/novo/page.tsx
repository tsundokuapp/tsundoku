'use client';

import { BlogPostForm } from '@/features/admin/blog/components/BlogPostForm';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';

export default function NovoPostPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      <div className="mb-4">
        <AdminBreadcrumbs />
      </div>
      <BlogPostForm isEdit={false} backHref="/admin/posts" />
    </div>
  );
}
