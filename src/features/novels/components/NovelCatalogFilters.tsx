'use client';

import { CaretDown, MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr';

import { IPublicGenres } from '@/features/project/api/types';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { cn } from '@/shared/utils/cn';
import { ORDER_BY, STATUS_NOVEL } from '@/shared/utils/systemValues';

import { NovelFilterState } from '../utils/filterNovels';
import {
  getOriginLabel,
  IS_ORIGIN_FILTER_DEV_ENABLED,
  NOVEL_ORIGIN_OPTIONS,
} from '../utils/originCategories';

interface NovelCatalogFiltersProps {
  genres: IPublicGenres[];
  workTypes: string[];
  filters: NovelFilterState;
  onChange: (next: Partial<NovelFilterState>) => void;
  onClearAll: () => void;
  variant?: 'v21' | 'v22';
}

export function NovelCatalogFilters({
  genres,
  workTypes,
  filters,
  onChange,
  onClearAll,
  variant = 'v21',
}: NovelCatalogFiltersProps) {
  const triggerClass =
    'h-[34px] rounded-[4px] border border-appCardBorder bg-appCardBackground px-3 text-sm text-appText shadow-sm hover:bg-appGroupBackground';
  const menuClass =
    'z-50 border-appCardBorder bg-appCardBackground text-appText';

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.genres.length > 0 ||
    Boolean(filters.origin) ||
    Boolean(filters.status) ||
    Boolean(filters.workType) ||
    (Boolean(filters.orderBy) && filters.orderBy !== 'Padrão');

  const toggleGenre = (genreValue: string) => {
    const exists = filters.genres.includes(genreValue);
    const next = exists
      ? filters.genres.filter((g) => g !== genreValue)
      : [...filters.genres, genreValue];
    onChange({ genres: next });
  };

  const selectedOriginLabel = getOriginLabel(filters.origin);

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-5',
        variant === 'v21' ? 'items-center' : 'items-start',
      )}
    >
      {variant === 'v21' && (
        <div className="flex w-full max-w-[500px] flex-col items-center gap-4">
          <h1 className="text-center text-lg font-bold text-appTitle sm:text-2xl">
            Encontre sua Novel na estante da Tsun
          </h1>

          <div className="relative w-full">
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-appSubtitle"
            />
            <input
              type="search"
              aria-label="Pesquisar por título"
              placeholder="Pesquisar por título"
              value={filters.search}
              onChange={(event) => onChange({ search: event.target.value })}
              className="h-10 w-full rounded-[8px] border border-appCardBorder bg-appCardBackground pl-10 pr-4 text-sm text-appText outline-none transition-colors placeholder:text-appSubtitle focus:border-appAccentCyan"
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          'flex w-full flex-wrap items-center gap-3',
          variant === 'v21' ? 'justify-center' : 'justify-start',
        )}
      >
        {variant === 'v22' && (
          <div className="relative w-full sm:w-[240px]">
            <MagnifyingGlass
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-appSubtitle"
            />
            <input
              type="search"
              aria-label="Filtrar novels por título"
              placeholder="Filtrar por título..."
              value={filters.search}
              onChange={(event) => onChange({ search: event.target.value })}
              className="h-[34px] w-full rounded-[4px] border border-appCardBorder bg-appCardBackground pl-8 pr-3 text-xs text-appText outline-none placeholder:text-appSubtitle focus:border-appAccentCyan"
            />
          </div>
        )}

        {/* Gênero */}
        <div className="w-[160px] sm:w-[175px]">
          <DropdownContainer
            label="Gênero"
            value={
              filters.genres.length > 0
                ? `${filters.genres.length} gênero(s)`
                : 'Gênero'
            }
            buttonClassname={triggerClass}
            menuClassname={menuClass}
            customIcon={<CaretDown size={14} />}
            onClear={() => onChange({ genres: [] })}
          >
            {genres.map((genre) => (
              <DropdownOption
                key={genre.value}
                label={genre.label}
                value={genre.value}
                selected={filters.genres.includes(genre.value)}
                onClick={() => toggleGenre(genre.value)}
              />
            ))}
          </DropdownContainer>
        </div>

        {/* Tipo de obra (filtro real preservado via tipoObra) */}
        <div className="w-[160px] sm:w-[175px]">
          <DropdownContainer
            label="Tipo de obra"
            value={filters.workType || 'Tipo de obra'}
            buttonClassname={triggerClass}
            menuClassname={menuClass}
            customIcon={<CaretDown size={14} />}
            onClear={() => onChange({ workType: '' })}
          >
            {workTypes.map((workType) => (
              <DropdownOption
                key={workType}
                label={workType}
                value={workType}
                selected={filters.workType === workType}
                onClick={() =>
                  onChange({
                    workType: filters.workType === workType ? '' : workType,
                  })
                }
              />
            ))}
          </DropdownContainer>
        </div>

        {/* Nacionalidade / Origem (ativo apenas com fixtures em dev; desabilitado em prod) */}
        <div className="w-[165px] sm:w-[180px]">
          {IS_ORIGIN_FILTER_DEV_ENABLED ? (
            <DropdownContainer
              label="Nacionalidade"
              value={selectedOriginLabel || 'Nacionalidade'}
              buttonClassname={triggerClass}
              menuClassname={menuClass}
              customIcon={<CaretDown size={14} />}
              onClear={() => onChange({ origin: '' })}
            >
              {NOVEL_ORIGIN_OPTIONS.map((originOption) => (
                <DropdownOption
                  key={originOption.slug}
                  label={originOption.label}
                  value={originOption.slug}
                  selected={filters.origin === originOption.slug}
                  onClick={() =>
                    onChange({
                      origin:
                        filters.origin === originOption.slug
                          ? ''
                          : originOption.slug,
                    })
                  }
                />
              ))}
            </DropdownContainer>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Filtro por nacionalidade/origem indisponível até suporte na API"
              className={cn(
                triggerClass,
                'flex w-full cursor-not-allowed items-center justify-between opacity-60',
              )}
            >
              <span className="truncate">Nacionalidade (em breve)</span>
              <CaretDown size={14} />
            </button>
          )}
        </div>

        {/* Status */}
        <div className="w-[155px] sm:w-[175px]">
          <DropdownContainer
            label="Status"
            value={filters.status || 'Status'}
            buttonClassname={triggerClass}
            menuClassname={menuClass}
            customIcon={<CaretDown size={14} />}
            onClear={() => onChange({ status: '' })}
          >
            {STATUS_NOVEL.map((statusItem) => (
              <DropdownOption
                key={statusItem}
                label={statusItem}
                value={statusItem}
                selected={filters.status === statusItem}
                onClick={() =>
                  onChange({
                    status: filters.status === statusItem ? '' : statusItem,
                  })
                }
              />
            ))}
          </DropdownContainer>
        </div>

        {/* Ordenar por */}
        <div className="w-[155px] sm:w-[175px]">
          <DropdownContainer
            label="Ordenar por"
            value={filters.orderBy || 'Ordenar por'}
            buttonClassname={triggerClass}
            menuClassname={menuClass}
            customIcon={<CaretDown size={14} />}
            onClear={() => onChange({ orderBy: '' })}
          >
            {[...ORDER_BY, 'Padrão'].map((orderItem) => (
              <DropdownOption
                key={orderItem}
                label={orderItem}
                value={orderItem}
                selected={filters.orderBy === orderItem}
                onClick={() =>
                  onChange({
                    orderBy: filters.orderBy === orderItem ? '' : orderItem,
                  })
                }
              />
            ))}
          </DropdownContainer>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex h-[34px] items-center gap-1 rounded-[4px] border border-appCardBorder bg-appCardBackground px-3 text-xs font-medium text-appSubtitle transition-colors hover:bg-appGroupBackground hover:text-appText"
          >
            <X size={13} />
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  );
}
