// Color Checked
// Components Checked
import type { ComponentProps } from 'react';

import { merge } from '@/helpers/twUtils';
interface DropdownTextProps extends ComponentProps<'p'> {
  text: string;
}

export function DropdownText({ text, className, ...props }: DropdownTextProps) {
  return (
    <p
      className={merge(
        'text-appMenuTitle mx-2 my-2 text-sm font-semibold',
        className,
      )}
      {...props}
    >
      {text}
    </p>
  );
}
