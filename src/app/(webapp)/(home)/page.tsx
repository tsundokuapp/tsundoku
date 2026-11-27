import { Suspense } from 'react';

import { HomeV22 } from '@/features/project/components/v22/HomeV22';

import { HomeVersionSwitch } from './HomeVersionSwitch';

export default function HomePage() {
  return (
    <Suspense fallback={<HomeV22 />}>
      <HomeVersionSwitch />
    </Suspense>
  );
}
