'use client';
// Color Checked
// Components Checked

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { IWork } from '@/@types/Api';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { getWorksBySearch } from '@/services/ProjectService';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../shadcn/command';

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
  ({
    placeholder = 'Buscar...',
    icon = 'Search',
    onOpenChangeDialog,
  }: HeaderSearchProps) => {
    const router = useRouter();
    const { closeSearchBar } = useSearchBar();

    const queryClient = useQueryClient();

    const [works, setWorks] = useState<IWork | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showResults, setShowResults] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = React.useCallback(
      async (searchTerm: string) => {
        if (!searchTerm?.trim()) return;

        setIsLoading(true);

        try {
          const result = await queryClient.fetchQuery({
            queryKey: ['public-search-works', searchTerm],
            queryFn: () => getWorksBySearch(searchTerm),
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
    }, [searchInput, handleFormSubmit]);

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
          className="hover:bg-appSearchHover flex items-center justify-center rounded-md"
        >
          {icon === 'Enter' ? (
            <div className="flex h-5 items-center justify-center rounded border border-dashed border-appSearchPlaceholder px-1 text-xs text-appSearchPlaceholder">
              ENTER
            </div>
          ) : (
            <MagnifyingGlass className="h-5 w-5 text-appSearchPlaceholder" />
          )}
        </button>
      );
    };

    const PathForNavigate = (slug: string, type: string) => {
      if (type !== 'Light Novel' && type !== 'Web Novel') {
        return `/comics/${slug}`;
      }
      return `/novels/${slug}`;
    };

    const CommandReturn = () => {
      return (
        <Command shouldFilter={true}>
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
            />
          </form>
          {showResults && (
            <CommandList>
              {isLoading && (
                <CommandItem className="cursor-default">
                  <div className="flex items-center gap-2">Buscando...</div>
                </CommandItem>
              )}
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              {works?.data && (
                <CommandGroup heading="Resultado da pesquisa:">
                  {works?.data?.map((work) => (
                    <CommandItem
                      key={work.id}
                      className="cursor-pointer"
                      onSelect={() => {
                        router.push(PathForNavigate(work.slug, work.tipo));
                        if (onOpenChangeDialog) {
                          onOpenChangeDialog(false);
                        }
                        closeSearchBar();
                      }}
                    >
                      <div className="flex w-full items-center gap-2">
                        {work.capa && (
                          <Image
                            src={work.capa}
                            alt={work.titulo}
                            width={40}
                            height={60}
                            className="rounded-md"
                          />
                        )}
                        <div className="flex w-full items-center justify-between gap-2">
                          <span>{work.titulo}</span>
                          <span className="flex items-center justify-center rounded border border-appHighlight px-2 py-1 text-xs">
                            {work.tipo}
                          </span>
                        </div>
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
