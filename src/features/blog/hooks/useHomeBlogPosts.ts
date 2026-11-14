import { useMemo } from 'react';

import { HOME_BLOG_POSTS_DEV_FIXTURES } from '../mocks/homeBlogPostsMock';
import { IBlogPostSummary } from '../types';

export interface UseHomeBlogPostsResult {
  posts: IBlogPostSummary[];
  isLoading: boolean;
  isError: boolean;
  isFixture: boolean;
  unavailableReason?: string;
}

// TODO(backend-integration): Substituir fixtures de desenvolvimento por consulta real ao serviço de Blog.
// Dependência exata: endpoint público no `tsundoku-api` (ex.: `GET /api/blog/posts?limit=3`) ou CMS integrado, ainda ausente no backend.
// Comportamento temporário: em desenvolvimento (`NODE_ENV !== 'production'`) retorna `HOME_BLOG_POSTS_DEV_FIXTURES`; em produção retorna lista vazia com estado indisponível.
// Dados/operações necessárias: listagem paginada ordenada por `publishedAt` desc contendo `id`, `slug`, `title`, `excerpt`, `coverImage`, `category` e `publishedAt`.
export function useHomeBlogPosts(limit = 3): UseHomeBlogPostsResult {
  const isDev = process.env.NODE_ENV !== 'production';

  return useMemo(() => {
    if (!isDev) {
      return {
        posts: [],
        isLoading: false,
        isError: false,
        isFixture: false,
        unavailableReason:
          'Publicações do blog ainda não possuem integração disponível no servidor.',
      };
    }

    return {
      posts: HOME_BLOG_POSTS_DEV_FIXTURES.slice(0, limit),
      isLoading: false,
      isError: false,
      isFixture: true,
    };
  }, [isDev, limit]);
}
