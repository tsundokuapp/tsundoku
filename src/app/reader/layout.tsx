import type { ReactNode } from 'react';

export default function ReaderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-appBackground text-appText">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
