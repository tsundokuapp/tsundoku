// Color Checked
// Components Checked

import type { ComponentProps } from 'react';

import { merge } from '@/helpers/twUtils';
type DropdownBreakLineProps = ComponentProps<'hr'>;

export function DropdownBreakLine({
  className,
  ...props
}: DropdownBreakLineProps) {
  return (
    <hr
      className={merge('border-appMenuBreakline m-2 border-solid', className)}
      {...props}
    />
  );
}
