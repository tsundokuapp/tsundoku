import {
  Users,
  AddressBookTabs,
  IdentificationBadge,
  Checkerboard,
  UsersFour,
  BookOpenText,
} from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';

import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { HeaderBar } from '@/components/header/HeaderBar';
import { Sidebar, SidebarItem } from '@/components/sidebar/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-row">
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
          icon={<BookOpenText size={24} />}
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
          action="/staffmanagement"
        />
        <hr className="my-3 border-t border-gray-400" />
        <SidebarItem
          icon={<Users size={24} />}
          text="Usuário"
          action="/usermanagement"
        />
      </Sidebar>

      <main className="ml-[72px] flex w-full max-w-[calc(100dvw-72px)] flex-col overflow-scroll font-normal">
        <HeaderBar className="border-b-2 border-b-slate-700" />
        {children}
      </main>
      <ScrollToTopButton />
    </div>
  );
}
