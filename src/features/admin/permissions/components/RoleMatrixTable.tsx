'use client';

import {
  Check,
  Key,
  MagnifyingGlass,
  Plus,
  Shield,
  Trash,
  X,
} from '@phosphor-icons/react/dist/ssr';
import React, { useMemo, useState } from 'react';

import { BadgeRole } from '@/features/admin/components/badge/BadgeRole';
import { colorByRole } from '@/features/admin/utils/roles';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { ModalAddPermission } from './ModalAddPermission';
import { ModalAddRole } from './ModalAddRole';
import {
  useDeleteRole,
  usePermissionsMatrix,
  useTogglePermission,
} from '../hooks/usePermissionsAdmin';
import { IPermissao, IRole } from '../types/permissionsAdmin';

export const PROTECTED_ROLES = ['admin', 'staff', 'tradutor', 'leitor'];

export async function executeRoleDelete(
  roleName: string,
  toaster: (props: {
    type: 'warning' | 'error' | 'success';
    msg: string;
  }) => void,
  deleteRoleMutation: {
    mutateAsync: (
      roleName: string,
    ) => Promise<{ success: boolean; message?: string }>;
  },
) {
  if (PROTECTED_ROLES.includes(roleName.toLowerCase().trim())) {
    toaster({
      type: 'warning',
      msg: `O cargo padrão "${roleName}" não pode ser excluído.`,
    });
    return {
      success: false,
      message: `O cargo padrão "${roleName}" não pode ser excluído.`,
    };
  }

  try {
    const res = await deleteRoleMutation.mutateAsync(roleName);
    if (res && !res.success) {
      toaster({
        type: 'warning',
        msg:
          res.message || `O cargo padrão "${roleName}" não pode ser excluído.`,
      });
      return res;
    }
    toaster({
      type: 'success',
      msg: `Cargo "${roleName}" excluído com sucesso.`,
    });
    return res;
  } catch (err) {
    toaster({
      type: 'error',
      msg: 'Erro ao excluir cargo.',
    });
    throw err;
  }
}

function getResourceGroup(valor: string): string {
  if (valor === '*.*' || valor.startsWith('global')) return 'Global / Sistema';
  const prefix = valor.split('.')[0];
  switch (prefix) {
    case 'obra':
      return 'Obras';
    case 'capitulo':
      return 'Capítulos';
    case 'usuario':
      return 'Usuários';
    default:
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
}

export const RoleMatrixTable = () => {
  const { toaster } = useToaster();
  const { data: matrix, isLoading, isError } = usePermissionsMatrix();
  const toggleMutation = useTogglePermission();
  const deleteRoleMutation = useDeleteRole();

  const [search, setSearch] = useState('');
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isAddPermOpen, setIsAddPermOpen] = useState(false);

  const roles = useMemo(() => matrix?.roles || [], [matrix?.roles]);
  const permissions = useMemo(
    () => matrix?.permissions || [],
    [matrix?.permissions],
  );
  const rolePermissions = useMemo(
    () => matrix?.rolePermissions || {},
    [matrix?.rolePermissions],
  );

  // Filter permissions
  const filteredPermissions = useMemo(() => {
    if (!search.trim()) return permissions;
    const q = search.toLowerCase();
    return permissions.filter(
      (p) =>
        p.valor.toLowerCase().includes(q) ||
        p.descricao.toLowerCase().includes(q) ||
        getResourceGroup(p.valor).toLowerCase().includes(q),
    );
  }, [permissions, search]);

  // Group by resource
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, IPermissao[]> = {};
    for (const p of filteredPermissions) {
      const g = getResourceGroup(p.valor);
      if (!groups[g]) groups[g] = [];
      groups[g].push(p);
    }
    return groups;
  }, [filteredPermissions]);

  const handleToggle = async (
    role: IRole,
    perm: IPermissao,
    currentlyGranted: boolean,
  ) => {
    const roleKey = role.name.toLowerCase();

    // Prevent stripping *.* from admin accidentally
    if (roleKey === 'admin' && perm.valor === '*.*' && currentlyGranted) {
      toaster({
        type: 'warning',
        msg: 'A permissão de acesso total (*.*) deve ser mantida para o cargo Administrador.',
      });
      return;
    }

    try {
      await toggleMutation.mutateAsync({
        roleName: role.name,
        permissaoId: perm.id,
        currentlyGranted,
      });
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao atualizar permissão da role.',
      });
    }
  };

  const handleDeleteRole = async (roleName: string) => {
    await executeRoleDelete(roleName, toaster, deleteRoleMutation);
  };

  return (
    <div className="relative w-full text-white">
      {/* Top Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full max-w-[450px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar permissões por recurso ou ação..."
            className="h-[40px] w-full rounded-lg border border-[#2e2e38] bg-[#202024] pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-[#259cc1] focus:outline-none"
          />
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddPermOpen(true)}
            className="flex h-[40px] items-center gap-2 rounded-lg border border-[#2e2e38] bg-[#202024] px-3.5 text-sm font-medium text-gray-200 transition-colors hover:border-[#259cc1] hover:text-white"
          >
            <Key size={18} className="text-[#259cc1]" />
            Nova Permissão
          </button>

          <button
            type="button"
            onClick={() => setIsAddRoleOpen(true)}
            className="flex h-[40px] items-center gap-2 rounded-lg bg-[#259cc1] px-4 text-sm font-semibold text-[#121214] transition-all hover:brightness-110"
          >
            <Plus size={18} weight="bold" />
            Novo Cargo
          </button>
        </div>
      </div>

      {/* Interactive Matrix Table */}
      <div className="overflow-x-auto rounded-lg border border-[#2e2e38] bg-[#121214]">
        <table className="w-full text-left text-sm text-gray-200">
          <thead className="border-b border-[#2e2e38] bg-[#202024] text-xs uppercase text-gray-400">
            <tr>
              <th scope="col" className="min-w-[280px] px-6 py-4 font-semibold">
                Permissão
              </th>
              <th scope="col" className="min-w-[160px] px-4 py-4 font-semibold">
                Chave
              </th>
              {roles.map((role) => {
                const isProtected = PROTECTED_ROLES.includes(
                  role.name.toLowerCase(),
                );
                return (
                  <th
                    key={role.id}
                    scope="col"
                    className="min-w-[120px] px-4 py-4 text-center font-semibold"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <BadgeRole
                        role={role.name}
                        color={colorByRole(role.name)}
                      />
                      {!isProtected && (
                        <button
                          type="button"
                          onClick={() => handleDeleteRole(role.name)}
                          title={`Excluir cargo ${role.name}`}
                          className="text-gray-500 hover:text-red-400"
                        >
                          <Trash size={14} />
                        </button>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#202024]">
            {isLoading ? (
              <tr>
                <td
                  colSpan={2 + roles.length}
                  className="py-8 text-center text-gray-400"
                >
                  Carregando matriz de permissões do Torii...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td
                  colSpan={2 + roles.length}
                  className="py-8 text-center text-red-400"
                >
                  Erro ao carregar permissões do servidor Torii Auth.
                </td>
              </tr>
            ) : Object.keys(groupedPermissions).length === 0 ? (
              <tr>
                <td
                  colSpan={2 + roles.length}
                  className="py-8 text-center text-gray-400"
                >
                  Nenhuma permissão correspondente encontrada.
                </td>
              </tr>
            ) : (
              Object.entries(groupedPermissions).map(([groupName, perms]) => (
                <React.Fragment key={groupName}>
                  {/* Group Section Header */}
                  <tr className="bg-[#18181b] font-semibold text-[#259cc1]">
                    <td
                      colSpan={2 + roles.length}
                      className="px-6 py-2.5 text-xs uppercase tracking-wider"
                    >
                      <div className="flex items-center gap-2">
                        <Shield size={16} />
                        {groupName}
                      </div>
                    </td>
                  </tr>

                  {/* Permissions in this group */}
                  {perms.map((perm) => (
                    <tr
                      key={perm.id}
                      className="h-[52px] bg-[#121214] transition-colors hover:bg-[#1a1a1f]"
                    >
                      <td className="px-6 py-2 text-white">
                        <div className="font-medium">{perm.descricao}</div>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-gray-400">
                        {perm.valor}
                      </td>
                      {roles.map((role) => {
                        const roleKey = role.name.toLowerCase();
                        const activeIds = rolePermissions[roleKey] || [];
                        const isDirectlyGranted = activeIds.includes(perm.id);
                        const hasAdminWildcard =
                          roleKey === 'admin' &&
                          (activeIds.includes(10) ||
                            activeIds.includes(perm.id));
                        const isGranted = isDirectlyGranted || hasAdminWildcard;

                        return (
                          <td key={role.id} className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() =>
                                handleToggle(role, perm, isGranted)
                              }
                              title={`${isGranted ? 'Revogar' : 'Conceder'} ${perm.descricao} para ${role.name}`}
                              className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition-all ${
                                isGranted
                                  ? 'border-[#259cc1] bg-[#259cc1] text-[#121214] hover:brightness-110'
                                  : 'border-[#2e2e38] bg-[#202024] text-gray-500 hover:border-gray-400 hover:text-white'
                              }`}
                            >
                              {isGranted ? (
                                <Check size={16} weight="bold" />
                              ) : (
                                <X size={14} />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <ModalAddRole
        isOpen={isAddRoleOpen}
        onClose={() => setIsAddRoleOpen(false)}
      />

      <ModalAddPermission
        isOpen={isAddPermOpen}
        onClose={() => setIsAddPermOpen(false)}
      />
    </div>
  );
};
