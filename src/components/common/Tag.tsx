// Color Checked
// Components Checked
import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TagProps extends ComponentProps<'span'> {
  variant?: 'regular' | 'fill';
  text: string;
}

export function Tag({
  variant = 'regular',
  text,
  className,
  ...props
}: TagProps) {
  return (
    <span
      data-variant={variant}
      className={twMerge(
        'data-[variant="fill"]:bg-appButtonFillBackground data-[variant="fill"]:text-appButtonFillText inline-block rounded-lg border border-appButtonOutlineBorder px-2 py-[1px] text-sm text-appButtonOutlineText',
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
