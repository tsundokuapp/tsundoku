'use client';

import {
  MagnifyingGlass,
  PencilSimple,
  Plus,
  Trash,
  User as UserIcon,
} from '@phosphor-icons/react/dist/ssr';
import { useMemo, useState } from 'react';

import { BadgeRole } from '@/features/admin/components/badge/BadgeRole';
import { colorByRole } from '@/features/admin/utils/roles';

import { ModalAddUser } from './ModalAddUser';
import { ModalDeleteUser } from './ModalDeleteUser';
import { ModalEditUser } from './ModalEditUser';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { IUserAdmin } from '../types/userAdmin';

const ITEMS_PER_PAGE = 8;

const ROLE_FILTER_OPTIONS = [
  'Todos',
  'Admin',
  'Staff',
  'Tradutor',
  'Revisor',
  'Editor',
  'Leitor',
  'Apoiador',
];

interface TableUserProps {
  openModal?: () => void;
}

export const TableUser = ({ openModal }: TableUserProps) => {
  const { data: users = [], isLoading, isError } = useAdminUsers();

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUserAdmin | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUserAdmin | null>(null);

  const handleOpenAdd = () => {
    if (openModal) {
      openModal();
    }
    setIsAddOpen(true);
  };

  // Filtered list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.userName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedRole === 'Todos') return true;

      if (selectedRole === 'Apoiador') {
        return (
          u.apoiador || u.roles?.some((r) => r.toLowerCase() === 'apoiador')
        );
      }

      return u.roles?.some(
        (r) => r.toLowerCase() === selectedRole.toLowerCase(),
      );
    });
  }, [users, search, selectedRole]);

  // Pagination calculation
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="relative w-full text-white">
      {/* Top Header / Search / Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar (500x40px, bg #202024) */}
          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Pesquisar Usuários"
              className="h-[40px] w-full rounded-lg border border-[#2e2e38] bg-[#202024] pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
            <MagnifyingGlass
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Cargo filter dropdown (bg #202024) */}
          <select
            value={selectedRole}
            onChange={(e) => {
              setSelectedRole(e.target.value);
              setCurrentPage(1);
            }}
            className="h-[40px] rounded-lg border border-[#2e2e38] bg-[#202024] px-3 text-sm text-white transition-colors focus:border-[#259cc1] focus:outline-none"
          >
            {ROLE_FILTER_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#202024]">
                {opt === 'Todos' ? 'Selecione um cargo...' : opt}
              </option>
            ))}
          </select>
        </div>

        {/* Add User Button */}
        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex h-[40px] items-center gap-2 rounded-lg bg-[#259cc1] px-4 font-semibold text-[#121214] transition-all hover:brightness-110"
        >
          <Plus size={18} weight="bold" />
          Adicionar
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-[#2e2e38] bg-[#121214]">
        <table className="w-full text-left text-sm text-gray-200">
          <thead className="border-b border-[#2e2e38] bg-[#202024] text-xs uppercase text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">
                Usuário
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Cargo
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Data Cadastro
              </th>
              <th scope="col" className="px-6 py-4 text-center font-semibold">
                Apoiador
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Último Acesso
              </th>
              <th scope="col" className="px-6 py-4 text-right font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#202024]">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  Carregando usuários...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-red-400">
                  Erro ao carregar usuários. Verifique sua conexão com o
                  servidor Torii Auth.
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const primaryRole = user.roles?.[0] || 'Leitor';
                return (
                  <tr
                    key={user.id}
                    className="h-[60px] bg-[#18181b]/60 transition-colors hover:bg-[#202024]"
                  >
                    <td className="px-6 py-3 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#202024] text-gray-300">
                          <UserIcon size={16} />
                        </div>
                        <span>{user.userName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <BadgeRole
                        role={primaryRole}
                        color={colorByRole(primaryRole)}
                      />
                    </td>
                    <td className="px-6 py-3 text-gray-300">{user.email}</td>
                    <td className="px-6 py-3 text-gray-400">
                      {user.dataCadastro}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {user.apoiador ? (
                        <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-900/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                          Apoiador
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-400">
                      {user.ultimoAcesso}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingUser(user)}
                          title="Editar Usuário"
                          className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                        >
                          <PencilSimple size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingUser(user)}
                          title="Excluir Usuário"
                          className="flex h-8 w-8 items-center justify-center rounded bg-[#202024] text-gray-300 transition-colors hover:bg-red-600 hover:text-white"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-400">
        <div>
          Mostrando {totalItems === 0 ? 0 : startIndex + 1} até{' '}
          {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} de {totalItems}{' '}
          usuários
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="rounded border border-[#2e2e38] bg-[#202024] px-3 py-1.5 transition-colors hover:bg-[#2e2e38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="rounded border border-[#2e2e38] bg-[#202024] px-3 py-1.5 transition-colors hover:bg-[#2e2e38] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Próxima
          </button>
        </div>
      </div>

      {/* Modals */}
      <ModalAddUser isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      <ModalEditUser
        user={editingUser}
        isOpen={Boolean(editingUser)}
        onClose={() => setEditingUser(null)}
        onRequestDelete={(u) => setDeletingUser(u)}
      />

      <ModalDeleteUser
        user={deletingUser}
        isOpen={Boolean(deletingUser)}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
};
