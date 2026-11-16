import { filterAndSortNovels, NovelFilterState } from './filterNovels';
import { IPublicNovels } from '../api/types';

const BASE_NOVELS: IPublicNovels[] = [
  {
    id: '1',
    slug: 'bruxa-errante',
    titulo: 'Bruxa Errante: A Jornada de Elaina',
    alias: 'Bruxa Errante',
    autor: 'Shiraishi Jougi',
    statusObra: 'Em andamento',
    listaGeneros: ['Aventura', 'Fantasia'],
    descritivoVolume: 'Volume 02',
    urlCapa: '/banner-elaina.jpg',
    tipoObraSlug: 'light-novel',
    tipoObra: 'Light Novel',
  },
  {
    id: '2',
    slug: 'alpha-web',
    titulo: 'Alpha Web Chronicle',
    alias: 'Alpha Web',
    autor: 'Autor Demo',
    statusObra: 'Concluído',
    listaGeneros: ['Ação', 'Fantasia'],
    descritivoVolume: 'Volume 01',
    urlCapa: '/cover-seven.webp',
    tipoObraSlug: 'web-novel',
    tipoObra: 'Web Novel',
  },
];

const EMPTY_FILTERS: NovelFilterState = {
  search: '',
  genres: [],
  origin: '',
  status: '',
  workType: '',
  orderBy: '',
};

describe('filterAndSortNovels', () => {
  it('filtra obras reais por gênero, tipo de obra, status, busca e ordenação A-Z/Z-A', () => {
    const byGenreAndOrder = filterAndSortNovels(BASE_NOVELS, {
      ...EMPTY_FILTERS,
      genres: ['Fantasia'],
      orderBy: 'A-Z',
    });

    expect(byGenreAndOrder.isOriginFixtureMode).toBe(false);
    expect(byGenreAndOrder.items.map((n) => n.slug)).toEqual([
      'alpha-web',
      'bruxa-errante',
    ]);

    const byTypeAndStatus = filterAndSortNovels(BASE_NOVELS, {
      ...EMPTY_FILTERS,
      workType: 'Light Novel',
      status: 'Em andamento',
      search: 'Elaina',
    });

    expect(byTypeAndStatus.items.map((n) => n.slug)).toEqual(['bruxa-errante']);

    const reverseOrder = filterAndSortNovels(BASE_NOVELS, {
      ...EMPTY_FILTERS,
      orderBy: 'Z-A',
    });

    expect(reverseOrder.items.map((n) => n.slug)).toEqual([
      'bruxa-errante',
      'alpha-web',
    ]);
  });

  it('usa fixtures de origem explícita em desenvolvimento quando isDevOriginEnabled=true', () => {
    const result = filterAndSortNovels(
      BASE_NOVELS,
      {
        ...EMPTY_FILTERS,
        origin: 'japonesas',
      },
      true,
    );

    expect(result.isOriginFixtureMode).toBe(true);
    expect(result.originIgnoredInProd).toBe(false);
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((n) => n.tipoObra === 'Light Novel')).toBe(true);
  });

  it('ignora filtro de origem e sinaliza indisponibilidade em produção (isDevOriginEnabled=false)', () => {
    const result = filterAndSortNovels(
      BASE_NOVELS,
      {
        ...EMPTY_FILTERS,
        origin: 'japonesas',
      },
      false,
    );

    expect(result.isOriginFixtureMode).toBe(false);
    expect(result.originIgnoredInProd).toBe(true);
    expect(result.items.map((n) => n.slug)).toEqual([
      'bruxa-errante',
      'alpha-web',
    ]);
  });
});
