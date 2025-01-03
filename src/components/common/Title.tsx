import { cn } from '@/helpers/twUtils';
import type { ComponentProps } from 'react';

interface TitleProps extends ComponentProps<'div'> {
  title: string;
  className?: string;
}
export function Title({ title, className, ...props }: TitleProps) {
  return (
    <div
      className={cn('flex flex-row gap-4 text-2xl font-black', className)}
      {...props}
    >
      <span className="text-sky-500">/</span>
      <span className="uppercase">{title}</span>
    </div>
  );
}
