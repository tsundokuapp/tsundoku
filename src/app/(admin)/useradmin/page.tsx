'use client';

import { TableUser } from '@/features/admin/users/components/TableUser';
import { AdminBreadcrumbs } from '@/shared/components/layout/v22/AdminBreadcrumbs';

export default function UserAdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6">
      <header className="mb-6 flex flex-col gap-2">
        <AdminBreadcrumbs />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Usuários
        </h1>
        <p className="text-sm text-gray-400">
          Gerenciamento de usuários, atribuição de cargos e controle de acessos
          da plataforma.
        </p>
      </header>

      <main>
        <TableUser />
      </main>
    </div>
  );
}
