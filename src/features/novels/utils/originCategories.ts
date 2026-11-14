import { IPublicNovels } from '../api/types';

export type NovelOriginSlug = 'japonesas' | 'originais' | 'americanas' | 'ue';

export interface INovelOriginOption {
  slug: NovelOriginSlug;
  label: string;
}

export interface IDevOriginNovel extends IPublicNovels {
  origemCategoria: NovelOriginSlug;
}

export const NOVEL_ORIGIN_OPTIONS: readonly INovelOriginOption[] = [
  { slug: 'japonesas', label: 'Japônesas' },
  { slug: 'originais', label: 'Originais' },
  { slug: 'americanas', label: 'Americanas' },
  { slug: 'ue', label: 'Ué?' },
] as const;

// TODO(backend-integration): Conectar filtro de categoria de origem ao contrato real de Novels.
// Dependência exata: campo `origem` ou `nacionalidade` em `IPublicNovels` (`GET /api/obras/novels`) e suporte ao parâmetro de consulta `?origem=` no endpoint `ObrasController` do `tsundoku-api` (atualmente ausente).
// Comportamento temporário: em desenvolvimento (`NODE_ENV !== 'production'`), demonstra o fluxo de submenu e seleção filtrando `DEV_NOVEL_ORIGIN_FIXTURES` com `origemCategoria` explícita; em produção, a seleção e os subitens permanecem desabilitados (`aria-disabled="true"`).
// Dados/operações necessárias: adicionar enum/slug de origem nas obras do catálogo e filtragem server-side em `GET /api/obras/novels?origem=<slug>`.
export const IS_ORIGIN_FILTER_DEV_ENABLED =
  process.env.NODE_ENV !== 'production';

export const DEV_NOVEL_ORIGIN_FIXTURES: IDevOriginNovel[] =
  IS_ORIGIN_FILTER_DEV_ENABLED
    ? [
        {
          id: 'dev-origin-jp-1',
          slug: 'kage-no-jitsuryokusha',
          titulo: 'A Eminência nas Sombras',
          alias: 'Eminência nas Sombras',
          autor: 'Aizawa Daisuke',
          statusObra: 'Em andamento',
          listaGeneros: ['Ação', 'Fantasia', 'Isekai'],
          descritivoVolume: 'Volume 01',
          urlCapa: '/cover-shadow.webp',
          tipoObraSlug: 'light-novel',
          tipoObra: 'Light Novel',
          origemCategoria: 'japonesas',
        },
        {
          id: 'dev-origin-jp-2',
          slug: 'roshidere-alya',
          titulo: 'Alya Às Vezes Fala Comigo em Russo',
          alias: 'Roshidere',
          autor: 'SunSunSun',
          statusObra: 'Em andamento',
          listaGeneros: ['Comédia', 'Romance', 'Escolar'],
          descritivoVolume: 'Volume 04',
          urlCapa: '/cover-alya.webp',
          tipoObraSlug: 'light-novel',
          tipoObra: 'Light Novel',
          origemCategoria: 'japonesas',
        },
        {
          id: 'dev-origin-orig-1',
          slug: 'cronicas-de-solaris',
          titulo: 'Crônicas de Solaris (Original)',
          alias: 'Crônicas de Solaris',
          autor: 'Autor Nacional',
          statusObra: 'Em andamento',
          listaGeneros: ['Fantasia', 'Aventura'],
          descritivoVolume: 'Volume 01',
          urlCapa: '/cover-seven.webp',
          tipoObraSlug: 'web-novel',
          tipoObra: 'Web Novel',
          origemCategoria: 'originais',
        },
        {
          id: 'dev-origin-us-1',
          slug: 'o-inicio-depois-do-fim',
          titulo: 'O Início Depois do Fim',
          alias: 'TBATE',
          autor: 'TurtleMe',
          statusObra: 'Em andamento',
          listaGeneros: ['Ação', 'Aventura', 'Fantasia'],
          descritivoVolume: 'Volume 09',
          urlCapa: '/banner-emilia.jpg',
          tipoObraSlug: 'web-novel',
          tipoObra: 'Web Novel',
          origemCategoria: 'americanas',
        },
        {
          id: 'dev-origin-ue-1',
          slug: 'manual-secreto-do-tradutor',
          titulo: 'Manual Secreto da Estante (Ué?)',
          alias: 'Manual Ué?',
          autor: 'Equipe Tsundoku',
          statusObra: 'Hiato',
          listaGeneros: ['Comédia', 'Mistério'],
          descritivoVolume: 'Único',
          urlCapa: '/banner-elaina.jpg',
          tipoObraSlug: 'light-novel',
          tipoObra: 'Light Novel',
          origemCategoria: 'ue',
        },
      ]
    : [];

export function isValidNovelOriginSlug(
  value: string | null | undefined,
): value is NovelOriginSlug {
  return (
    value === 'japonesas' ||
    value === 'originais' ||
    value === 'americanas' ||
    value === 'ue'
  );
}

export function getOriginLabel(
  slug: NovelOriginSlug | string | null | undefined,
): string {
  const found = NOVEL_ORIGIN_OPTIONS.find((item) => item.slug === slug);
  return found ? found.label : '';
}
