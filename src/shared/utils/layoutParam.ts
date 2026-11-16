/**
 * Preserva ou adiciona `?layout=v2.1` em rotas internas enquanto o usuário
 * estiver navegando pela prévia V2.1. Mantém `/` e `/novels` abrindo a 2.2 por padrão.
 */
export function withV21LayoutParam(
  href: string,
  layoutParam: string | null | undefined,
): string {
  if (layoutParam !== 'v2.1') {
    return href;
  }

  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const pathAndQuery = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : undefined;

  const queryIndex = pathAndQuery.indexOf('?');
  const pathname =
    queryIndex >= 0 ? pathAndQuery.slice(0, queryIndex) : pathAndQuery;
  const query = queryIndex >= 0 ? pathAndQuery.slice(queryIndex + 1) : '';

  const params = new URLSearchParams(query);
  params.set('layout', 'v2.1');
  const qs = params.toString();
  const base = qs ? `${pathname}?${qs}` : pathname;

  return hash !== undefined ? `${base}#${hash}` : base;
}
