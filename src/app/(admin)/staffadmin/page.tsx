'use client';

import { RoleMatrixTable } from '@/features/admin/permissions/components/RoleMatrixTable';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';

export default function StaffAdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      <header className="mb-6 flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Permissões
        </h1>
        <p className="text-sm text-gray-400">
          Matriz de permissões e governança de acessos por cargo (RBAC)
          integrada ao Torii Auth.
        </p>
      </header>

      <main>
        <RoleMatrixTable />
      </main>
    </div>
  );
}
