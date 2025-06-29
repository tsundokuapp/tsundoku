'use client';
// Color Checked
// Components Checked

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { IWork } from '@/@types/Api';
import { useSearchBar } from '@/contexts/SearchBarContext';
import { InputFormSearch } from '@/helpers/Schemas';
import { getWorksBySearch } from '@/services/ProjectService';

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  // CommandSeparator,
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

    const { register, handleSubmit } = useForm<InputFormSearch>();
    const queryClient = useQueryClient();

    const [works, setWorks] = useState<IWork | null>(null);
    // const [valueSearch, setValueSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = React.useCallback(
      async ({ search }: InputFormSearch) => {
        setIsLoading(true);
        try {
          const data = await queryClient.fetchQuery({
            queryKey: ['public-search-works', search],
            queryFn: () => getWorksBySearch(search),
          });
          setWorks(data);
        } finally {
          setIsLoading(false);
        }
      },
      [queryClient],
    );

    // Problema para funcionar com a tecla Enter
    // useEffect(() => {
    //   const handleKeyDown = (event: KeyboardEvent) => {
    //     if (event.key === 'Enter') {
    //       event.preventDefault();
    //       handleFormSubmit({ search: valueSearch });
    //     }
    //   };

    //   if (isSearchBarVisible) {
    //     document.addEventListener('keydown', handleKeyDown);
    //   }

    //   return () => {
    //     document.removeEventListener('keydown', handleKeyDown);
    //   };
    // }, [isSearchBarVisible, handleSubmit, handleFormSubmit, valueSearch]);

    const ButtonSearch = () => {
      return (
        <button
          type="submit"
          className="hover:bg-appSearchHover flex items-center justify-center rounded-md"
        >
          {icon === 'Enter' ? (
            <div className="flex h-5 items-center justify-center rounded border border-dashed border-appSearchPlaceholder text-xs text-appSearchPlaceholder">
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
        <Command>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <CommandInput
              customButton={ButtonSearch}
              placeholder={placeholder}
              // com isso é possível usar o enter para buscar porém a cada tecla pressionada o componente perde o foco (talvez ele esteja sendo re-renderizado, testar usar um debounce)
              // value={valueSearch}
              // onValueChange={(value) => setValueSearch(value)}
              {...register('search')}
            />
          </form>
          <CommandList>
            {isLoading && (
              <CommandItem className="cursor-default">
                <div className="flex items-center gap-2">Buscando...</div>
              </CommandItem>
            )}
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            {works?.data && (
              <CommandGroup heading="Obras">
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
                    <div className="flex items-center gap-2">
                      {work.capa && (
                        <Image
                          src={work.capa}
                          alt={work.titulo}
                          width={40}
                          height={60}
                          className="rounded-md"
                        />
                      )}
                      <span>{work.titulo}</span>
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
        </Command>
      );
    };

    return <CommandReturn />;
  },
);

HeaderSearch.displayName = 'HeaderSearch';
