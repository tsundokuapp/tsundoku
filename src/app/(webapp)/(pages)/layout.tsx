import type { ReactNode } from 'react';

import { Breadcrump } from '@/components/common/Breadcrump';

export default function webappPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Breadcrump />
      {children}
    </>
  );
}
