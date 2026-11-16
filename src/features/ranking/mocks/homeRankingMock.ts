import { IRankingEntry } from '../types';

/**
 * Fixtures tipadas de desenvolvimento para a seção "Ranking" da Home V2.2.
 * Restritas a `process.env.NODE_ENV !== 'production'`.
 */
export const HOME_RANKING_DEV_FIXTURES: IRankingEntry[] = [
  {
    id: 'rank-1',
    position: 1,
    displayName: 'Fulano de Tal',
    badgeLabel: 'Top 1 - Apoiador',
    avatarUrl: '/cover-shadow.webp',
  },
  {
    id: 'rank-2',
    position: 2,
    displayName: 'Helena Sakuragi',
    badgeLabel: 'Top 2 - Apoiador',
    avatarUrl: '/cover-alya.webp',
  },
  {
    id: 'rank-3',
    position: 3,
    displayName: 'Rafael Takahashi',
    badgeLabel: 'Top 3 - Apoiador',
    avatarUrl: '/cover-seven.webp',
  },
  {
    id: 'rank-4',
    position: 4,
    displayName: 'Beatriz Morimi',
    badgeLabel: 'Top 4 - Apoiador',
    avatarUrl: '/honrado.jpeg',
  },
  {
    id: 'rank-5',
    position: 5,
    displayName: 'Lucas Aizawa',
    badgeLabel: 'Top 5 - Leitor Ativo',
    avatarUrl: '/cover-shadow.webp',
  },
  {
    id: 'rank-6',
    position: 6,
    displayName: 'Camila Shiraishi',
    badgeLabel: 'Top 6 - Leitor Ativo',
    avatarUrl: '/banner-elaina.jpg',
  },
  {
    id: 'rank-7',
    position: 7,
    displayName: 'Mateus Kurosawa',
    badgeLabel: 'Top 7 - Comentarista',
    avatarUrl: '/banner-bocchi.jpg',
  },
  {
    id: 'rank-8',
    position: 8,
    displayName: 'Mariana Miaki',
    badgeLabel: 'Top 8 - Apoiador',
    avatarUrl: '/banner-emilia.jpg',
  },
];
