'use client';

import {
  ArrowCircleRight,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { getWorksBySearch } from '@/features/project/api/projectApi';
import { IWork } from '@/features/project/api/types';
import { useSearchBar } from '@/shared/contexts/SearchBarContext';
import { cn } from '@/shared/utils/cn';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';

interface HeaderSearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  icon?: 'Enter' | 'Search';
  onOpenChangeDialog?: (open: boolean) => void;
}

export const HeaderSearch = React.forwardRef<
  HTMLInputElement,
  HeaderSearchProps
>(
  (
    {
      placeholder = 'Buscar...',
      icon = 'Search',
      onOpenChangeDialog,
      className,
    }: HeaderSearchProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const router = useRouter();
    const { closeSearchBar } = useSearchBar();

    const queryClient = useQueryClient();
    const isOverlaySearch = icon === 'Enter';

    const [works, setWorks] = useState<IWork | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showResults, setShowResults] = useState(false);
    const commandRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleFormSubmit = React.useCallback(
      async (searchTerm: string) => {
        if (!searchTerm?.trim()) return;

        setIsLoading(true);

        try {
          const result = await queryClient.fetchQuery({
            queryKey: ['public-search-works', searchTerm],
            queryFn: async () => {
              const response = await getWorksBySearch(searchTerm);
              if (response.ok === false)
                throw new Error('Erro ao buscar obras');
              return response.data;
            },
          });
          setWorks(result);
          setSearchInput('');
        } finally {
          setIsLoading(false);
          setShowResults(true);
        }
      },
      [queryClient],
    );

    // UseEffect para capturar Enter diretamente
    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && document.activeElement === inputRef.current) {
          e.preventDefault();
          const searchTerm = searchInput.trim();
          if (searchTerm) {
            handleFormSubmit(searchTerm);
          }
        }
      };

      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }, [searchInput, handleFormSubmit, inputRef]);

    // UseEffect para fechar resultados ao clicar fora
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          commandRef.current &&
          !commandRef.current.contains(event.target as Node) &&
          showResults
        ) {
          setShowResults(false);
          setWorks(null);
        }
      };

      if (showResults) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [showResults]);

    const handleInputChange = React.useCallback((value: string) => {
      setSearchInput(value);
      // Só limpa os resultados se o input ficar completamente vazio
      if (value.length === 0) {
        setShowResults(false);
        setWorks(null);
      }
    }, []);

    const ButtonSearch = () => {
      return (
        <button
          type="submit"
          className="flex items-center justify-center rounded-md px-1 hover:bg-appGroupHover"
        >
          {icon === 'Enter' ? (
            <div className="flex h-8 items-center justify-center rounded-lg border border-appMenuBorder bg-appBackground px-2.5 text-[11px] font-semibold tracking-wide text-appText shadow-sm">
              ENTER
            </div>
          ) : (
            <MagnifyingGlass className="h-5 w-5 text-appSearchPlaceholder" />
          )}
        </button>
      );
    };

    const getSynopsisPreview = (synopsis?: string) => {
      if (!synopsis?.trim()) return 'Sem descricao disponivel.';
      return synopsis.length > 110
        ? `${synopsis.slice(0, 107).trim()}...`
        : synopsis;
    };

    const getCountsText = (work: IWork['data'][number]) => {
      const metadata = work as unknown as Record<string, unknown>;

      const extractCount = (keys: string[]) => {
        for (const key of keys) {
          const value = metadata[key];
          if (typeof value === 'number' && Number.isFinite(value)) return value;
          if (typeof value === 'string') {
            const parsed = Number(value);
            if (!Number.isNaN(parsed)) return parsed;
          }
        }

        return null;
      };

      const chapters = extractCount([
        'totalCapitulos',
        'qtdCapitulos',
        'capitulos',
        'chaptersCount',
      ]);
      const volumes = extractCount([
        'totalVolumes',
        'qtdVolumes',
        'volumes',
        'volumesCount',
      ]);

      if (chapters === null && volumes === null) return null;

      if (chapters !== null && volumes !== null) {
        return `${chapters} capitulos • ${volumes} volumes`;
      }

      if (chapters !== null) return `${chapters} capitulos`;

      return `${volumes} volumes`;
    };

    const PathForNavigate = (slug: string, type: string) => {
      if (type !== 'Light Novel' && type !== 'Web Novel') {
        return `/comics/${slug}`;
      }
      return `/novels/${slug}`;
    };

    const getResultsCountText = (count: number) => {
      return count === 1 ? '1 item encontrado' : `${count} itens encontrados`;
    };

    const CommandReturn = () => {
      return (
        <Command
          shouldFilter={true}
          ref={commandRef}
          className={cn(
            'w-full',
            isOverlaySearch &&
              'rounded-2xl border border-appInputBorder bg-gradient-to-br from-appSearchBackground to-appGroupBackground',
            className,
          )}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const searchTerm = searchInput.trim();
              if (searchTerm) {
                handleFormSubmit(searchTerm);
              }
            }}
          >
            <CommandInput
              ref={inputRef}
              customButton={ButtonSearch}
              placeholder={placeholder}
              value={searchInput}
              onValueChange={handleInputChange}
              name="search"
              className={cn(
                isOverlaySearch && 'h-14 text-base md:text-lg',
                !isOverlaySearch && 'h-11 text-sm',
              )}
            />
          </form>
          {showResults && (
            <CommandList
              className={cn(
                isOverlaySearch &&
                  'border border-appMenuBorder bg-gradient-to-br from-appSearchBackground to-appGroupBackground',
              )}
            >
              {isLoading && (
                <CommandItem className="cursor-default">
                  <div className="flex items-center gap-2">Buscando...</div>
                </CommandItem>
              )}
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              {works?.data && (
                <CommandGroup
                  heading={
                    <div className="flex items-center justify-between gap-2">
                      <span>Resultado da pesquisa</span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-appSearchPlaceholder">
                        {getResultsCountText(works.data.length)}
                      </span>
                    </div>
                  }
                >
                  {works?.data?.map((work) => (
                    <CommandItem
                      key={work.id}
                      className="group cursor-pointer"
                      onSelect={() => {
                        router.push(PathForNavigate(work.slug, work.tipo));
                        if (onOpenChangeDialog) {
                          onOpenChangeDialog(false);
                        }
                        closeSearchBar();
                      }}
                    >
                      <div className="relative flex w-full min-w-0 items-start gap-3 overflow-hidden rounded-xl p-3 transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-appGroupHover">
                        {work.capa && (
                          <Image
                            src={work.capa}
                            alt={work.titulo}
                            width={56}
                            height={84}
                            className="h-[72px] w-12 shrink-0 rounded-md object-cover md:h-[84px] md:w-14"
                          />
                        )}
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                            <span className="truncate text-sm font-semibold text-appSearchText sm:text-base md:text-lg">
                              {work.titulo}
                            </span>
                            <span className="w-fit text-[11px] font-medium text-appSubtitle sm:inline-flex sm:items-center sm:justify-center sm:rounded-md sm:border sm:border-appMenuBorder sm:bg-appGroupBackground sm:px-2 sm:py-1 sm:text-xs sm:font-semibold sm:uppercase sm:tracking-wide sm:text-appSearchText">
                              {work.tipo}
                            </span>
                          </div>

                          <p className="text-xs text-appSubtitle md:text-sm">
                            {getSynopsisPreview(work.sinopse)}
                          </p>

                          <div className="mt-1 flex items-end gap-2 pr-16">
                            {getCountsText(work) ? (
                              <span className="text-[11px] font-medium uppercase tracking-wide text-appSearchPlaceholder md:text-xs">
                                {getCountsText(work)}
                              </span>
                            ) : (
                              <span />
                            )}
                          </div>
                        </div>

                        <ArrowCircleRight
                          size={56}
                          weight="duotone"
                          className="pointer-events-none absolute bottom-4 right-4 !h-8 !w-8 translate-x-1 text-appSearchText opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {/* <CommandSeparator />
              <CommandGroup heading="Configurações (desabilitado)">
                <CommandItem>Perfil</CommandItem>
                <CommandItem>Comentários</CommandItem>
                <CommandItem>Configurações</CommandItem>
              </CommandGroup> */}
            </CommandList>
          )}
        </Command>
      );
    };

    return <CommandReturn />;
  },
);

HeaderSearch.displayName = 'HeaderSearch';
