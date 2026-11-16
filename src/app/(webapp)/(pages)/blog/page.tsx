'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { useHomeBlogPosts } from '@/features/blog/hooks/useHomeBlogPosts';
import { cn } from '@/shared/utils/cn';
import { BLUR_DATA_URL } from '@/shared/utils/image';

function BlogContent() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get('post');
  const { posts, isFixture, unavailableReason } = useHomeBlogPosts(6);

  return (
    <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-appTitle sm:text-3xl">
            Blog da Tsun
          </h1>
          <p className="mt-1 text-sm text-appSubtitle">
            Artigos, entrevistas e novidades da equipe Tsundoku Traduções.
          </p>
        </div>

        {isFixture && (
          <span className="rounded-full border border-appCardBorder bg-appCardBackground px-3 py-1 text-xs font-medium text-appSubtitle">
            Modo dev: fixtures tipadas (API de Blog pendente)
          </span>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-10 text-center">
          <h2 className="text-lg font-semibold text-appTitle">
            Publicações indisponíveis no momento
          </h2>
          <p className="mt-2 text-sm text-appSubtitle">
            {unavailableReason ||
              'Em breve — o serviço de publicações do Blog será integrado.'}
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-[4px] bg-appAccentCyan px-4 py-2 text-xs font-bold text-white hover:opacity-90"
          >
            Voltar para o Início
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const isHighlighted = activeSlug === post.slug;
            return (
              <article
                key={post.id}
                className={cn(
                  'flex flex-col overflow-hidden rounded-xl border bg-appCardBackground shadow-sm transition-shadow',
                  isHighlighted
                    ? 'ring-appAccentCyan/40 border-appAccentCyan ring-2'
                    : 'border-appCardBorder',
                )}
              >
                <div className="relative h-48 w-full bg-appGroupBackground">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-center justify-between text-[11px] font-medium text-appAccentCyan">
                    <span>{post.category}</span>
                    <span className="text-appSubtitle">{post.publishedAt}</span>
                  </div>
                  <h2 className="text-base font-bold leading-snug text-appTitle">
                    {post.title}
                  </h2>
                  <p className="text-xs leading-relaxed text-appSubtitle">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-sm text-appSubtitle">
          Carregando blog...
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
