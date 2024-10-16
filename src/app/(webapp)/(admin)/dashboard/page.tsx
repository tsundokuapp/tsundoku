import {
  AddressBookTabs,
  Checkerboard,
  IdentificationBadge,
  UsersFour,
  BookOpenText,
  Users,
} from '@phosphor-icons/react/dist/ssr';

import { Sidebar, SidebarItem } from '@/components/sidebar/Sidebar';

import styles from './styles.module.css';

export default function Dashboard() {
  return (
    <main className={styles.container}>
      <Sidebar>
        <hr className="my-3 border-t border-gray-400" />
        <SidebarItem
          icon={<Checkerboard size={24} />}
          text="Dashboard"
          action="/dashboard"
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
      <div>
        <h1>Admin Page</h1>
      </div>
    </main>
  );
}
