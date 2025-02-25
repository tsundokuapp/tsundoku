import type { ComponentProps, ReactNode } from 'react';

import { merge } from '@/helpers/twUtils';
interface ReaderContainerProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export function ReaderContainer({
  children,
  className,
  ...props
}: ReaderContainerProps) {
  return (
    <div
      className={(merge('flex items-center justify-center'), className)}
      {...props}
    >
      {children}
    </div>
  );
}
