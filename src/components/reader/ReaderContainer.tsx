import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/helpers/twUtils';
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
      className={(cn('flex items-center justify-center'), className)}
      {...props}
    >
      {children}
    </div>
  );
}
