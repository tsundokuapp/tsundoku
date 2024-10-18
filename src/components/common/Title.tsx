import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps extends ComponentProps<'div'> {
  title: string;
}
export function Title({ title, className, ...props }: TitleProps) {
  return (
    <div
      className={twMerge('flex flex-row gap-4 text-2xl font-black', className)}
      {...props}
    >
      <span className="text-sky-500">/</span>
      <span className="uppercase">{title}</span>
    </div>
  );
}
