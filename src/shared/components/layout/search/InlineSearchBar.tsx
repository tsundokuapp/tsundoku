'use client';

import { MagnifyingGlass, Spinner } from '@phosphor-icons/react/dist/ssr';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getWorksBySearch } from '@/features/project/api/projectApi';
import { IWork, IWorkData } from '@/features/project/api/types';
import { cn } from '@/shared/utils/cn';
import { BLUR_DATA_URL } from '@/shared/utils/image';

interface InlineSearchBarProps {
  placeholder?: string;
  variant?: 'pill' | 'bordered';
  className?: string;
  inputClassName?: string;
}

function getWorkRoute(work: IWorkData): string {
  const normalizedType = work.tipo?.toLowerCase() ?? '';
  if (normalizedType.includes('novel')) {
    return `/novels/${work.slug}`;
  }
  return `/comics/${work.slug}`;
}

export function InlineSearchBar({
  placeholder = 'Novel, Comic, Gênero...',
  variant = 'pill',
  className,
  inputClassName,
}: InlineSearchBarProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IWorkData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const executeSearch = useCallback(
    async (searchTerm: string) => {
      const trimmed = searchTerm.trim();
      if (!trimmed) {
        setIsOpen(false);
        setResults([]);
        setHasError(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);
      setIsOpen(true);

      try {
        const data = await queryClient.fetchQuery<IWork>({
          queryKey: ['public-search-works', trimmed],
          queryFn: async () => {
            const response = await getWorksBySearch(trimmed);
            if (!response.ok) {
              throw new Error('Falha ao buscar obras');
            }
            return response.data;
          },
        });
        setResults(data?.data ?? []);
      } catch {
        setResults([]);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [queryClient],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void executeSearch(query);
  };

  const handleSelectWork = (work: IWorkData) => {
    setIsOpen(false);
    setQuery('');
    router.push(getWorkRoute(work));
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className={cn(
          'flex items-center justify-between transition-colors',
          variant === 'pill'
            ? 'h-[30px] rounded-[20px] bg-appSearchBackground px-3.5 text-appSearchText shadow-sm'
            : 'h-[30px] rounded-[8px] border border-appMenuBorder bg-appCardBackground px-3 text-appText',
        )}
      >
        <input
          type="search"
          aria-label="Pesquisar obras"
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            if (!next.trim()) {
              setIsOpen(false);
              setResults([]);
              setHasError(false);
            }
          }}
          className={cn(
            'w-full min-w-0 bg-transparent text-xs outline-none placeholder:text-appSearchPlaceholder',
            inputClassName,
          )}
        />
        <button
          type="submit"
          aria-label="Executar busca"
          className="ml-2 flex shrink-0 items-center justify-center text-appSearchPlaceholder transition-colors hover:text-appAccentCyan"
        >
          {isLoading ? (
            <Spinner size={14} className="animate-spin" />
          ) : (
            <MagnifyingGlass size={14} weight="bold" />
          )}
        </button>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[36px] z-50 max-h-[340px] min-w-[260px] overflow-y-auto rounded-lg border border-appCardBorder bg-appCardBackground p-2 shadow-xl">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 py-4 text-xs text-appSubtitle">
              <Spinner size={16} className="animate-spin" />
              <span>Buscando obras...</span>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="px-3 py-3 text-center text-xs text-red-500">
              Não foi possível consultar a busca agora. Tente novamente.
            </div>
          )}

          {!isLoading && !hasError && results.length === 0 && (
            <div className="px-3 py-3 text-center text-xs text-appSubtitle">
              Nenhuma obra encontrada para &ldquo;{query}&rdquo;.
            </div>
          )}

          {!isLoading && !hasError && results.length > 0 && (
            <ul className="flex flex-col gap-1">
              {results.map((work) => (
                <li key={work.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectWork(work)}
                    className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-appGroupBackground"
                  >
                    <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded bg-appGroupBackground">
                      {work.capa ? (
                        <Image
                          src={work.capa}
                          alt={work.titulo}
                          fill
                          sizes="36px"
                          placeholder="blur"
                          blurDataURL={BLUR_DATA_URL}
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-appText">
                        {work.titulo}
                      </p>
                      <p className="truncate text-[11px] text-appSubtitle">
                        {work.tipo}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
