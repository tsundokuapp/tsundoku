import { Suspense } from 'react';

import { WebappLayoutSwitch } from '@/shared/components/layout/v22/WebappLayoutSwitch';
import { WebappShellV22 } from '@/shared/components/layout/v22/WebappShellV22';

export default function WebappLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<WebappShellV22>{children}</WebappShellV22>}>
      <WebappLayoutSwitch>{children}</WebappLayoutSwitch>
    </Suspense>
  );
}
