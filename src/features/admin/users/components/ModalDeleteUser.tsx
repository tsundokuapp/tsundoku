'use client';

import { Warning } from '@phosphor-icons/react/dist/ssr';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { useDeleteAdminUser } from '../hooks/useAdminUsers';
import { IUserAdmin } from '../types/userAdmin';

interface ModalDeleteUserProps {
  user: IUserAdmin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDeleteUser = ({
  user,
  isOpen,
  onClose,
}: ModalDeleteUserProps) => {
  const { toaster } = useToaster();
  const deleteMutation = useDeleteAdminUser();
  const currentUsername = useAuthStore((s) => s.username);

  if (!user) return null;

  const isSelf =
    Boolean(currentUsername) &&
    currentUsername?.toLowerCase() === user.userName.toLowerCase();

  const handleDelete = async () => {
    if (isSelf) {
      toaster({
        type: 'error',
        msg: 'Você não pode excluir sua própria conta.',
      });
      return;
    }

    try {
      const result = await deleteMutation.mutateAsync(user.id);
      if (result.success) {
        toaster({
          type: 'success',
          msg: result.message || 'Usuário excluído com sucesso.',
        });
      } else {
        toaster({
          type: 'warning',
          msg: result.message,
        });
      }
      onClose();
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao excluir usuário.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[480px] bg-[#18181b] p-6 text-white sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-red-500">
            <Warning size={24} />
            Excluir Usuário
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirmação de exclusão de usuário
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm text-gray-300">
            Tem certeza de que deseja excluir o usuário{' '}
            <strong className="text-white">{user.userName}</strong> (
            {user.email})?
          </p>

          {isSelf ? (
            <div
              className="rounded-md border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300"
              data-testid="self-delete-warning"
            >
              ⚠️ Ação bloqueada: Por motivos de segurança, você não pode remover
              sua própria conta de administrador.
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              Esta ação removerá os acessos do usuário no sistema
              administrativo.
            </p>
          )}

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={isSelf || deleteMutation.isPending}
              onClick={handleDelete}
              className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {deleteMutation.isPending ? 'Excluindo...' : 'Confirmar Exclusão'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
