'use client';

import { UserCircle, User as UserIcon } from '@phosphor-icons/react/dist/ssr';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { useUpdateUserRole } from '../hooks/useAdminUsers';
import { IUserAdmin } from '../types/userAdmin';

interface ModalEditUserProps {
  user: IUserAdmin | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestDelete?: (user: IUserAdmin) => void;
}

const CARGO_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Tradutor', label: 'Tradutor' },
  { value: 'Revisor', label: 'Revisor' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Leitor', label: 'Leitor' },
  { value: 'Apoiador', label: 'Apoiador' },
];

export const ModalEditUser = ({
  user,
  isOpen,
  onClose,
  onRequestDelete,
}: ModalEditUserProps) => {
  const { toaster } = useToaster();
  const updateRoleMutation = useUpdateUserRole();
  const currentUsername = useAuthStore((s) => s.username);

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [cargo, setCargo] = useState('Leitor');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setUserName(user.userName || '');
      const primaryRole = user.roles?.[0] || 'Leitor';
      const matched = CARGO_OPTIONS.find(
        (c) => c.value.toLowerCase() === primaryRole.toLowerCase(),
      );
      setCargo(matched ? matched.value : primaryRole);
    }
  }, [user]);

  if (!user) return null;

  const isSelf =
    Boolean(currentUsername) &&
    currentUsername?.toLowerCase() === user.userName.toLowerCase();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSelf && cargo.toLowerCase() !== 'admin') {
      toaster({
        type: 'error',
        msg: 'Você não pode remover seu próprio cargo de Administrador.',
      });
      return;
    }

    try {
      await updateRoleMutation.mutateAsync({
        userId: user.id,
        newRole: cargo,
        oldRoles: user.roles || [],
      });

      toaster({
        type: 'success',
        msg: 'Cargo de usuário atualizado com sucesso!',
      });
      onClose();
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao atualizar usuário.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[650px] bg-[#18181b] p-6 text-white sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <UserCircle size={24} className="text-[#259cc1]" />
            Editar Usuário
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para editar cargo e acessos do usuário
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleUpdate}
          className="mt-4 flex flex-col gap-6 md:flex-row"
        >
          {/* Avatar Container (150x150, border #259cc1) */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="flex h-[150px] w-[150px] items-center justify-center rounded-lg border-2 border-[#259cc1] bg-[#3E3E45] shadow-inner"
              data-testid="avatar-container"
            >
              <UserIcon size={72} className="text-gray-300" />
            </div>
            <span className="mt-2 text-xs text-gray-400">ID: {user.id}</span>
          </div>

          {/* Form Fields */}
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full cursor-not-allowed rounded-md border border-[#2e2e38] bg-[#202024]/60 px-3 py-2 text-sm text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Login / Usuário
              </label>
              <input
                type="text"
                disabled
                value={userName}
                className="w-full cursor-not-allowed rounded-md border border-[#2e2e38] bg-[#202024]/60 px-3 py-2 text-sm text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Senha
              </label>
              <input
                type="password"
                disabled
                value="••••••••••••"
                className="w-full cursor-not-allowed rounded-md border border-[#2e2e38] bg-[#202024]/60 px-3 py-2 text-sm text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Cargo
              </label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white transition-colors focus:border-[#259cc1] focus:outline-none"
              >
                {CARGO_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-[#202024] text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {isSelf && (
              <span className="text-xs text-amber-400">
                ⚠️ Você está editando sua própria conta.
              </span>
            )}

            <div className="mt-2 flex items-center justify-between">
              {onRequestDelete && (
                <button
                  type="button"
                  disabled={isSelf}
                  onClick={() => {
                    onClose();
                    onRequestDelete(user);
                  }}
                  className="rounded bg-red-600/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Excluir
                </button>
              )}

              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={updateRoleMutation.isPending}
                  className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {updateRoleMutation.isPending
                    ? 'Atualizando...'
                    : 'Atualizar'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
