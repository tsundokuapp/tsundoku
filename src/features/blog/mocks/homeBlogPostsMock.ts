import { IBlogPostSummary } from '../types';

/**
 * Fixtures tipadas de desenvolvimento para os blocos de Blog (V2.1 "Novos Posts" e V2.2 "Blog da Tsun").
 * Restritas a `process.env.NODE_ENV !== 'production'`.
 * Usa exclusivamente imagens locais válidas em `public/`.
 */
export const HOME_BLOG_POSTS_DEV_FIXTURES: IBlogPostSummary[] = [
  {
    id: 'blog-dev-1',
    slug: 'sugaru-miaki-autor-preferido-equipe-tsun',
    title:
      'Sugaru Miaki: por que se tornou o autor preferido da Equipe Tsun? Confira as opiniões dos membros sobre o mestre da melancolia.',
    excerpt:
      'Uma conversa aberta com tradutores e revisores sobre Três Dias de Felicidade, Parasita Apaixonado e outras obras marcantes.',
    coverImage: '/cover-alya.webp',
    publishedAt: '2026-03-15',
    category: 'Editorial',
  },
  {
    id: 'blog-dev-2',
    slug: 'controversa-obra-mushoku-tensei',
    title:
      'A controversa obra de Mushoku Tensei, os pontos altos e baixos do grande sucesso da light novel',
    excerpt:
      'Analisamos construção de mundo, ritmo narrativo e evolução de personagens ao longo dos volumes.',
    coverImage: '/banner-emilia.jpg',
    publishedAt: '2026-03-10',
    category: 'Resenha',
  },
  {
    id: 'blog-dev-3',
    slug: 'entrevista-jougi-shiraishi-bruxa-errante',
    title:
      'Entrevista: Uma conversa com Jougi Shiraishi, autor de Bruxa Errante: A Jornada de Elaina.',
    excerpt:
      'Bastidores sobre o formato episódico, viagens de Elaina e inspirações para novos contos.',
    coverImage: '/banner-elaina.jpg',
    publishedAt: '2026-03-04',
    category: 'Entrevista',
  },
];
