import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

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
      className={(twMerge('flex items-center justify-center'), className)}
      {...props}
    >
      {children}
    </div>
  );
}
