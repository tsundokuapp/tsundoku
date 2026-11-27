import type { ReactNode } from 'react';

import { AdminGuard } from '@/core/auth/components/AdminGuard';
import { WebappShellV22 } from '@/shared/components/layout/v22/WebappShellV22';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <WebappShellV22 variant="admin">{children}</WebappShellV22>
    </AdminGuard>
  );
}
