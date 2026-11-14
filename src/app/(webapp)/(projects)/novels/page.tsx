import { Suspense } from 'react';

import { NovelsCatalogV21 } from '@/features/novels/components/NovelsCatalogV21';

export default function NovelsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1200px] px-4 py-10 text-sm text-appSubtitle">
          Carregando catálogo de novels...
        </div>
      }
    >
      <NovelsCatalogV21 />
    </Suspense>
  );
}
