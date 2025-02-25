import type { ReactNode } from 'react';

export default function ComicReaderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto bg-zinc-300 dark:bg-zinc-900 dark:text-gray-300">
      <main className="">{children}</main>
    </div>
  );
}
