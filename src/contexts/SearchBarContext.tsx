'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from 'react';

interface SearchBarContextProps {
  isSearchBarVisible: boolean;
  closeSearchBar: () => void;
}
interface SearchBarProviderProps {
  children: ReactNode;
}

const SearchBarContext = createContext<SearchBarContextProps>(
  {} as SearchBarContextProps,
);

export const SearchBarProvider: FC<SearchBarProviderProps> = ({ children }) => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState<boolean>(false);

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

  const closeSearchBar = () => {
    setIsSearchBarVisible(false);
  };

  return (
    <SearchBarContext.Provider value={{ isSearchBarVisible, closeSearchBar }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBar = () => useContext(SearchBarContext);
