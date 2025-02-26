// Color Checked
// Components Checked
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

interface TitleProps extends ComponentProps<'div'> {
  title: string;
  className?: string;
}

export function Title({ title, className, ...props }: TitleProps) {
  return (
    <div
      className={cn(
        'flex flex-row gap-2 text-xl font-black sm:gap-4 sm:text-2xl',
        className,
      )}
      {...props}
    >
      <span className="text-appHighlight">/</span>
      <span className="uppercase text-appTitle">{title}</span>
    </div>
  );
}
