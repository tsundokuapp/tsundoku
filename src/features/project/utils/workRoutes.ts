export function isComicWorkType(tipoObra?: string): boolean {
  const normalized = (tipoObra ?? '').toLowerCase();
  return (
    normalized.includes('comic') ||
    normalized.includes('mang') ||
    normalized.includes('manh')
  );
}

export function getWorkDetailHref(
  tipoObra: string | undefined,
  slug: string,
): string {
  const section = isComicWorkType(tipoObra) ? 'comics' : 'novels';
  return `/${section}/${slug}`;
}

export function getReaderChapterHref(
  tipoObra: string | undefined,
  slugObra: string,
  slugCapitulo?: string,
): string {
  if (!slugCapitulo) {
    return getWorkDetailHref(tipoObra, slugObra);
  }
  const section = isComicWorkType(tipoObra) ? 'comics' : 'novels';
  return `/reader/${section}/${slugObra}/${slugCapitulo}`;
}
