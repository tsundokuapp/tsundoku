// Color Checked
// Components Checked

import type { ComponentProps } from 'react';

import { cn } from '@/shared/utils/cn';
type DropdownBreakLineProps = ComponentProps<'hr'>;

export function DropdownBreakLine({
  className,
  ...props
}: DropdownBreakLineProps) {
  return (
    <hr
      className={cn('m-2 border-solid border-appMenuBreakline', className)}
      {...props}
    />
  );
}
