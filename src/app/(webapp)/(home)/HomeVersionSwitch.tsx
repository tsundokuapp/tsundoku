'use client';

import { useSearchParams } from 'next/navigation';

import { HomeV21 } from '@/features/project/components/v21/HomeV21';
import { HomeV22 } from '@/features/project/components/v22/HomeV22';

export function HomeVersionSwitch() {
  const searchParams = useSearchParams();
  return searchParams.get('layout') === 'v2.1' ? <HomeV21 /> : <HomeV22 />;
}
