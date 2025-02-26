import { ArrowCircleRight } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

interface PageSliderRightProps extends ComponentProps<'div'> {
  text: string;
  isActive: boolean;
  className?: string;
}

export function PageSliderRight({
  text,
  isActive,
  className,
  ...props
}: PageSliderRightProps) {
  return (
    <div
      data-is-active={isActive}
      className={cn(
        'group/right col-span-1 row-span-1 flex cursor-pointer items-center justify-end data-[is-active=false]:cursor-default',
        className,
      )}
      {...props}
    >
      <div className="mr-20 hidden h-28 select-none flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-900 px-4 py-6 font-semibold text-zinc-900 group-hover/right:flex group-data-[is-active=false]/right:group-hover/right:hidden dark:border-zinc-700 dark:text-zinc-500">
        <ArrowCircleRight size={32} />
        <p>{text}</p>
      </div>
    </div>
  );
}
