// Color Checked
// Component Checked
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/helpers/twUtils';

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
      className={cn('flex flex-1 flex-row justify-between', className)}
      {...props}
    >
      {children}
    </div>
  );
}
