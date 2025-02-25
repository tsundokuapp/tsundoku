// Color Checked
// Components Checked
import type { ComponentProps } from 'react';

import { merge } from '@/helpers/twUtils';

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
      className={merge(
        'inline-block rounded-lg border border-appButtonOutlineBorder px-2 py-[1px] text-sm text-appButtonOutlineText data-[variant="fill"]:bg-appButtonFillBackground data-[variant="fill"]:text-appButtonFillText',
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
