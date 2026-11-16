'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

import { WebappShellV22 } from './WebappShellV22';
import { WebappShellV21 } from '../v21/WebappShellV21';

interface WebappLayoutSwitchProps {
  children: ReactNode;
}

export function WebappLayoutSwitch({ children }: WebappLayoutSwitchProps) {
  const searchParams = useSearchParams();
  const isV21 = searchParams.get('layout') === 'v2.1';

  if (isV21) {
    return <WebappShellV21>{children}</WebappShellV21>;
  }

  return <WebappShellV22>{children}</WebappShellV22>;
}
