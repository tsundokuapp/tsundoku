// ---- Constantes para novels ----
export const STATUS_NOVEL = [
  'Em andamento',
  'Concluído',
  'Cancelado',
  'Hiato',
] as const;

export type TStatusNovel = (typeof STATUS_NOVEL)[number];

// ---- Constantes para mangás ----
export const STATUS_COMIC = [
  'Em andamento',
  'Concluído',
  'Cancelado',
  'Hiato',
] as const;

export type TStatusComic = (typeof STATUS_COMIC)[number];

// Considera o header e o footer
export const HEIGHT_INSIDE_READER = 'calc(100dvh-74px)';
export const HEIGHT_IMAGE_INSIDE_READER = 'calc(100vh-110px)';
