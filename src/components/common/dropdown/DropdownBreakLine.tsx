import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';
type DropdownBreakLineProps = ComponentProps<'hr'>;

export function DropdownBreakLine({
  className,
  ...props
}: DropdownBreakLineProps) {
  return (
    <hr
      className={cn('m-2 border-solid border-zinc-600', className)}
      {...props}
    />
  );
}
