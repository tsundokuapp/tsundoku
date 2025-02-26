import { ArrowCircleLeft } from '@phosphor-icons/react/dist/ssr';
import type { ComponentProps } from 'react';

import { cn } from '@/helpers/twUtils';

interface PageSliderLeftProps extends ComponentProps<'div'> {
  text: string;
  isActive: boolean;
  className?: string;
}

export function PageSliderLeft({
  text,
  isActive,
  className,
  ...props
}: PageSliderLeftProps) {
  return (
    <div
      data-is-active={isActive}
      className={cn(
        'group/left col-span-1 row-span-1 flex cursor-pointer items-center justify-start data-[is-active=false]:cursor-default',
        className,
      )}
      {...props}
    >
      <div className="ml-20 hidden h-28 select-none flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-900 px-4 py-6 font-semibold text-zinc-900 group-hover/left:flex group-data-[is-active=false]/left:group-hover/left:hidden dark:border-zinc-700 dark:text-zinc-500">
        <ArrowCircleLeft size={32} />
        <p>{text}</p>
      </div>
    </div>
  );
}
