import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleContainerProps extends ComponentProps<'div'> {
  children?: ReactNode;
}
export function TitleContainer({
  children,
  className,
  ...props
}: TitleContainerProps) {
  return (
    <div
      className={twMerge('flex flex-1 flex-row justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
