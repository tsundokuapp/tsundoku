import type { ReactNode } from 'react';

export default function ReaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--reader-color-background)] text-appText">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
