import {
  DEV_NOVEL_ORIGIN_FIXTURES,
  IS_ORIGIN_FILTER_DEV_ENABLED,
  isValidNovelOriginSlug,
} from './originCategories';
import { IPublicNovels } from '../api/types';

export interface NovelFilterState {
  search: string;
  genres: string[];
  origin: string;
  status: string;
  workType: string;
  orderBy: string;
}

export interface FilteredNovelsResult {
  items: IPublicNovels[];
  isOriginFixtureMode: boolean;
  originIgnoredInProd: boolean;
  availableWorkTypes: string[];
}

function normalizeText(value?: string | null): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function extractAvailableWorkTypes(novels: IPublicNovels[]): string[] {
  const defaults = ['Light Novel', 'Web Novel'];
  const set = new Set<string>(defaults);

  for (const novel of novels) {
    if (novel.tipoObra?.trim()) {
      set.add(novel.tipoObra.trim());
    }
  }

  return Array.from(set);
}

export function filterAndSortNovels(
  realNovels: IPublicNovels[],
  filters: NovelFilterState,
  isDevOriginEnabled = IS_ORIGIN_FILTER_DEV_ENABLED,
): FilteredNovelsResult {
  const hasValidOrigin = isValidNovelOriginSlug(filters.origin);
  let baseList: IPublicNovels[] = realNovels;
  let isOriginFixtureMode = false;
  let originIgnoredInProd = false;

  if (hasValidOrigin) {
    if (isDevOriginEnabled) {
      isOriginFixtureMode = true;
      baseList = DEV_NOVEL_ORIGIN_FIXTURES.filter(
        (item) => item.origemCategoria === filters.origin,
      );
    } else {
      originIgnoredInProd = true;
    }
  }

  const availableWorkTypes = extractAvailableWorkTypes([
    ...realNovels,
    ...(isOriginFixtureMode ? baseList : []),
  ]);

  const searchNorm = normalizeText(filters.search);
  const statusNorm = normalizeText(filters.status);
  const typeNorm = normalizeText(filters.workType);
  const genresNorm = filters.genres.map(normalizeText).filter(Boolean);

  const filtered = baseList.filter((novel) => {
    if (searchNorm) {
      const haystacks = [novel.titulo, novel.alias, novel.autor].map(
        normalizeText,
      );
      if (!haystacks.some((entry) => entry.includes(searchNorm))) {
        return false;
      }
    }

    if (genresNorm.length > 0) {
      const novelGenres = (novel.listaGeneros ?? []).map(normalizeText);
      const matchesAllSelected = genresNorm.every((selected) =>
        novelGenres.some((g) => g.includes(selected)),
      );
      if (!matchesAllSelected) return false;
    }

    if (statusNorm && statusNorm !== 'todos') {
      if (normalizeText(novel.statusObra) !== statusNorm) {
        return false;
      }
    }

    if (typeNorm && typeNorm !== 'todos') {
      const matchesType =
        normalizeText(novel.tipoObra) === typeNorm ||
        normalizeText(novel.tipoObraSlug) === typeNorm;
      if (!matchesType) return false;
    }

    return true;
  });

  const sorted = [...filtered];
  if (filters.orderBy === 'A-Z') {
    sorted.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  } else if (filters.orderBy === 'Z-A') {
    sorted.sort((a, b) => b.titulo.localeCompare(a.titulo, 'pt-BR'));
  }

  return {
    items: sorted,
    isOriginFixtureMode,
    originIgnoredInProd,
    availableWorkTypes,
  };
}
