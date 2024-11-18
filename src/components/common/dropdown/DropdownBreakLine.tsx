import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type DropdownBreakLineProps = ComponentProps<'hr'>;

export function DropdownBreakLine({
  className,
  ...props
}: DropdownBreakLineProps) {
  return (
    <hr
      className={twMerge('m-2 border-solid border-zinc-600', className)}
      {...props}
    />
  );
}
