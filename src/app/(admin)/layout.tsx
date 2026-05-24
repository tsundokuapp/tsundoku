import {
  AddressBookTabs,
  Bookmark,
  Checkerboard,
  IdentificationBadge,
  Users,
  UsersFour,
} from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';

import { AdminGuard } from '@/core/auth/components/AdminGuard';
import { HeaderBar } from '@/shared/components/layout/header/HeaderBar';
import { Sidebar, SidebarItem } from '@/shared/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="relative mx-auto flex min-h-screen w-full flex-row">
        <Sidebar>
          <hr className="my-3 border-t border-gray-400" />
          <SidebarItem
            icon={<Checkerboard size={24} />}
            text="Dashboard"
            action="/dashboard"
            alert
          />
          <SidebarItem
            icon={<UsersFour size={24} />}
            text="Staff"
            action="/staff"
          />
          <hr className="my-3 border-t border-gray-400" />
          <SidebarItem
            icon={<Bookmark size={24} />}
            text="Novel"
            action="/noveladmin"
          />
          <SidebarItem
            icon={<AddressBookTabs size={24} />}
            text="Mangá"
            action="/mangaadmin"
          />
          <SidebarItem
            icon={<IdentificationBadge size={24} />}
            text="Permissões"
            action="/staffadmin"
          />
          <hr className="my-3 border-t border-gray-400" />
          <SidebarItem
            icon={<Users size={24} />}
            text="Usuário"
            action="/useradmin"
          />
        </Sidebar>

        <main className="ml-[72px] flex w-full max-w-[calc(100dvw-72px)] flex-col pl-4 font-normal">
          <HeaderBar className="border-b-2 border-b-slate-700" />
          <div className="max-w-full flex-1 overflow-y-auto bg-appBackground">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
