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
      className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/80"
    >
      <div id="contentSearch" className="relative w-full max-w-lg p-4">
        <HeaderSearch icon="Enter" autoFocus ref={searchRef} />
      </div>
    </div>
  );
};
