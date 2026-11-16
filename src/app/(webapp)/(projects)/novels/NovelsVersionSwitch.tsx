'use client';

import { useSearchParams } from 'next/navigation';

import { NovelsCatalogV21 } from '@/features/novels/components/NovelsCatalogV21';
import { NovelsCatalogV22 } from '@/features/novels/components/NovelsCatalogV22';

export function NovelsVersionSwitch() {
  const searchParams = useSearchParams();
  return searchParams.get('layout') === 'v2.1' ? (
    <NovelsCatalogV21 />
  ) : (
    <NovelsCatalogV22 />
  );
}
