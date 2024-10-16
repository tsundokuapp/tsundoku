import type { ReactNode } from 'react';

interface TitleProps {
  title: string;
  children?: ReactNode;
}
export function Title({ title, children }: TitleProps) {
  return (
    <div className="flex flex-1 flex-row justify-between">
      <div className="flex flex-row gap-4 text-2xl font-black">
        <span className="text-sky-500">/</span>
        <span className="uppercase">{title}</span>
      </div>

      {children}
    </div>
  );
}
