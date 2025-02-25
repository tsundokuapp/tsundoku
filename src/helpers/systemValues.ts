// ---- Constants for novel ----
export const STATUS_NOVEL = [
  'Em andamento',
  'Concluído',
  'Cancelado',
  'Hiato',
] as const;

export type TStatusNovel = (typeof STATUS_NOVEL)[number];

export const GENRES_NOVEL = [
  'Ação',
  'Aventura',
  'Comédia',
  'Drama',
  'Fantasia',
  'Romance',
] as const;

export type TGenresNovel = (typeof GENRES_NOVEL)[number];

// Considera o header e o footer
export const HEIGHT_INSIDE_READER = 'calc(100dvh-74px)';
export const HEIGHT_IMAGE_INSIDE_READER = 'calc(100vh-110px)';
