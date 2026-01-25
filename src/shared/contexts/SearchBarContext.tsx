'use client';

import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const closeSearchBar = useCallback(() => {
    setIsSearchBarVisible(false);
  }, []);

  const toggleSearchBar = useCallback(() => {
    setIsSearchBarVisible((prev) => !prev);
  }, []);

  const openSearchBar = useCallback(() => {
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
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', checkClickOutsideHeader);
      document.removeEventListener('keydown', checkKeyPress);
      document.body.style.overflow = 'unset';
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
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBar = () => useContext(SearchBarContext);
