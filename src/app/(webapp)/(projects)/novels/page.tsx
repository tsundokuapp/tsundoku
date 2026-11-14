import { Suspense } from 'react';

import { NovelsVersionSwitch } from './NovelsVersionSwitch';

export default function NovelsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1200px] px-4 py-10 text-sm text-appSubtitle">
          Carregando catálogo de novels...
        </div>
      }
    >
      <NovelsVersionSwitch />
    </Suspense>
  );
}
