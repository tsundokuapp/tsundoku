'use client';

import { createContext, useContext } from 'react';

export interface SidebarContextProps {
  expanded: boolean;
  toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a Sidebar component');
  }
  return context;
}
