import type { ReactNode } from 'react';

import { Breadcrump } from '@/components/common/Breadcrump';

export default function webappLayoutAdmin({
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
