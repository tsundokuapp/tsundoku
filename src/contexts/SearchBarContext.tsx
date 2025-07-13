'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from 'react';

import { HeaderSearch } from '@/components/header/HeaderSearch';

interface SearchBarContextProps {
  isSearchBarVisible: boolean;
  closeSearchBar: () => void;
  toggleSearchBar: () => void;
  openSearchBar: () => void;
}
interface SearchBarProviderProps {
  children: ReactNode;
}

const SearchBarContext = createContext<SearchBarContextProps>(
  {} as SearchBarContextProps,
);

export const SearchBarProvider: FC<SearchBarProviderProps> = ({ children }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

  const closeSearchBar = React.useCallback(() => {
    setIsSearchBarVisible(false);
  }, []);

  const toggleSearchBar = React.useCallback(() => {
    setIsSearchBarVisible((prev) => !prev);
  }, []);

  const openSearchBar = React.useCallback(() => {
    setIsSearchBarVisible(true);
  }, []);

  useEffect(() => {
    const checkClickOutsideHeader = (event: MouseEvent) => {
      const contentSearch = document.querySelector('#contentSearch');
      if (contentSearch && !contentSearch.contains(event.target as Node)) {
        closeSearchBar();
      }
    };

    const checkKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearchBar();
      }
    };

    if (isSearchBarVisible) {
      document.addEventListener('mousedown', checkClickOutsideHeader);
      document.addEventListener('keydown', checkKeyPress);
    } else {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
    }

    return () => {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
    };
  }, [closeSearchBar, isSearchBarVisible]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchBarVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <SearchBarContext.Provider
      value={{
        isSearchBarVisible,
        closeSearchBar,
        toggleSearchBar,
        openSearchBar,
      }}
    >
      {isSearchBarVisible && (
        <div
          id="containerSearch"
          className="absolute bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
        >
          <div id="contentSearch" className="relative w-full max-w-lg p-4">
            <HeaderSearch autoFocus />
          </div>
        </div>
      )}
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBar = () => useContext(SearchBarContext);
