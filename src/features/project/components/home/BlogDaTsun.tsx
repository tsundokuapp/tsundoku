'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useHomeBlogPosts } from '@/features/blog/hooks/useHomeBlogPosts';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export function BlogDaTsun() {
  const { posts, isLoading, isError, isFixture, unavailableReason } =
    useHomeBlogPosts(3);

  return (
    <section aria-labelledby="v22-blog-heading" className="w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="v22-blog-heading"
          className="text-lg font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Blog da Tsun
        </h2>
        {isFixture && (
          <span className="rounded-full border border-appCardBorder bg-appCardBackground px-2.5 py-0.5 text-[11px] text-appSubtitle">
            Fixtures dev (aguardando API de Blog)
          </span>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="aspect-[315/177] w-full rounded-lg bg-appGroupBackground" />
              <div className="mx-auto mt-3 h-4 w-5/6 rounded bg-appGroupBackground" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appText">
          Não foi possível carregar as publicações do blog.
        </div>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          {unavailableReason ?? 'Nenhuma publicação de blog disponível.'}
        </div>
      )}

      {!isLoading && !isError && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link
                href={`/blog?post=${encodeURIComponent(post.slug)}`}
                className="block"
              >
                <div className="relative aspect-[315/177] w-full overflow-hidden rounded-lg border border-appCardBorder bg-appCardBackground shadow-sm">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-2.5 line-clamp-3 text-center text-xs font-semibold leading-snug text-appText group-hover:text-appAccentCyan sm:text-sm">
                  {post.title}
                </h3>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
