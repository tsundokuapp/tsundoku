'use client';

import { ShieldPlus } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { useCreateRole } from '../hooks/usePermissionsAdmin';

interface ModalAddRoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddRole = ({ isOpen, onClose }: ModalAddRoleProps) => {
  const { toaster } = useToaster();
  const createRoleMutation = useCreateRole();
  const [roleName, setRoleName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toaster({
        type: 'error',
        msg: 'Informe o nome do cargo.',
      });
      return;
    }

    try {
      await createRoleMutation.mutateAsync(roleName.trim());
      toaster({
        type: 'success',
        msg: `Cargo "${roleName.trim()}" criado com sucesso!`,
      });
      setRoleName('');
      onClose();
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao criar cargo.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[450px] bg-[#18181b] p-6 text-white sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <ShieldPlus size={24} className="text-[#259cc1]" />
            Adicionar Novo Cargo
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para cadastrar novo cargo no Torii
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Nome do Cargo
            </label>
            <input
              type="text"
              required
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="ex: revisor, editor, moderador"
              className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
            <span className="mt-1 block text-xs text-gray-400">
              O cargo será cadastrado no Identity do Torii em letras minúsculas.
            </span>
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createRoleMutation.isPending}
              className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
            >
              {createRoleMutation.isPending ? 'Criando...' : 'Criar Cargo'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
