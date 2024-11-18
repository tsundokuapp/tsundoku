import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownTextProps extends ComponentProps<'p'> {
  text: string;
}

export function DropdownText({ text, className, ...props }: DropdownTextProps) {
  return (
    <p
      className={twMerge(
        'mx-2 my-2 text-sm font-semibold text-zinc-600',
        className,
      )}
      {...props}
    >
      {text}
    </p>
  );
}
