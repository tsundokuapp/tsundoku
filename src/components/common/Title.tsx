import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface TitleProps extends ComponentProps<'div'> {
  title: string;
  children?: ReactNode;
}
export function Title({ title, children, className, ...props }: TitleProps) {
  return (
    <div
      className={twMerge('flex flex-1 flex-row justify-between', className)}
      {...props}
    >
      <div className="flex flex-row gap-4 text-2xl font-black">
        <span className="text-sky-500">/</span>
        <span className="uppercase">{title}</span>
      </div>

      {children}
    </div>
  );
}
