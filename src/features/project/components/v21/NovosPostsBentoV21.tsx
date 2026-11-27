'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useHomeBlogPosts } from '@/features/blog/hooks/useHomeBlogPosts';
import { BLUR_DATA_URL } from '@/shared/utils/image';

export function NovosPostsBentoV21() {
  const { posts, isFixture, unavailableReason } = useHomeBlogPosts(3);

  const featured = posts[0];
  const secondary = posts.slice(1, 3);

  return (
    <section aria-labelledby="v21-posts-heading" className="w-full">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2
          id="v21-posts-heading"
          className="text-base font-bold text-appTitle sm:text-xl lg:text-2xl"
        >
          Novos Posts
        </h2>
        {isFixture && (
          <span className="rounded-full border border-appCardBorder bg-appCardBackground px-2.5 py-0.5 text-[11px] font-medium text-appSubtitle">
            Fixtures dev (aguardando API de Blog)
          </span>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-appCardBorder bg-appCardBackground p-6 text-center text-sm text-appSubtitle">
          {unavailableReason ||
            'Nenhuma publicação de blog disponível no momento.'}
        </div>
      ) : (
        <>
          {/* Mobile 2-column layout (1321:35435) */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {posts.slice(0, 2).map((post) => (
              <Link
                key={`${post.id}-mobile`}
                href={`/blog?post=${post.slug}`}
                className="group relative block h-[140px] overflow-hidden rounded-[8px] bg-appCardBackground"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="180px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <p className="absolute bottom-2 left-2 right-2 line-clamp-3 text-[10px] font-bold leading-tight text-white">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>

          {/* Desktop asymmetric bento layout (1024:256) */}
          <div className="hidden gap-6 md:grid md:grid-cols-12">
            {featured && (
              <Link
                href={`/blog?post=${featured.slug}`}
                className="group relative col-span-8 block h-[460px] overflow-hidden rounded-[16px] bg-appCardBackground lg:h-[620px]"
              >
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 66vw, 810px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <p className="absolute bottom-6 left-7 right-7 text-xl font-bold leading-snug text-white lg:text-2xl">
                  {featured.title}
                </p>
              </Link>
            )}

            <div className="col-span-4 flex flex-col gap-5 lg:gap-6">
              {secondary.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog?post=${post.slug}`}
                  className="group relative block h-[220px] overflow-hidden rounded-[8px] bg-appCardBackground lg:h-[298px]"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="340px"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <p className="absolute bottom-3.5 left-4 right-4 line-clamp-3 text-sm font-bold leading-snug text-white">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
