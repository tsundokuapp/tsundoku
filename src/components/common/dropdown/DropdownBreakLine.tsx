// Color Checked
// Components Checked

import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';
type DropdownBreakLineProps = ComponentProps<'hr'>;

export function DropdownBreakLine({
  className,
  ...props
}: DropdownBreakLineProps) {
  return (
    <hr
      className={cn('border-appMenuBreakline m-2 border-solid', className)}
      {...props}
    />
  );
}
