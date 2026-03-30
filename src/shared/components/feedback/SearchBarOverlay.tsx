'use client';

import { useRef } from 'react';

import { HeaderSearch } from '@/shared/components/layout/header/HeaderSearch';
import { useSearchBar } from '@/shared/contexts/SearchBarContext';

export const SearchBarOverlay = () => {
  const { isSearchBarVisible } = useSearchBar();
  const searchRef = useRef<HTMLInputElement>(null);

  if (!isSearchBarVisible) return null;

  return (
    <div
      id="containerSearch"
      className="absolute inset-0 z-50 flex h-full w-full items-start justify-center bg-black/70 px-4 pt-[10vh] backdrop-blur-sm"
    >
      <div id="contentSearch" className="relative w-full max-w-4xl">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-appHeaderHighlight">
            Pesquisar Obras
          </p>
          <h2 className="mt-1 text-2xl font-bold text-appHeaderText md:text-3xl">
            Encontre novels e comics em segundos
          </h2>
        </div>

        <HeaderSearch icon="Enter" autoFocus ref={searchRef} />
      </div>
    </div>
  );
};
