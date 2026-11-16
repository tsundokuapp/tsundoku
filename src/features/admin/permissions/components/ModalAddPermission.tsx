'use client';

import { Key } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { useCreatePermission } from '../hooks/usePermissionsAdmin';

interface ModalAddPermissionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddPermission = ({
  isOpen,
  onClose,
}: ModalAddPermissionProps) => {
  const { toaster } = useToaster();
  const createPermissionMutation = useCreatePermission();

  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!valor.trim() || !descricao.trim()) {
      toaster({
        type: 'error',
        msg: 'Informe o valor e a descrição da permissão.',
      });
      return;
    }

    if (!valor.includes('.') && valor !== '*.*') {
      toaster({
        type: 'error',
        msg: 'O valor da permissão deve seguir o formato recurso.acao (ex: obra.aprovar).',
      });
      return;
    }

    try {
      await createPermissionMutation.mutateAsync({
        valor: valor.trim().toLowerCase(),
        descricao: descricao.trim(),
      });
      toaster({
        type: 'success',
        msg: `Permissão "${valor.trim()}" criada com sucesso!`,
      });
      setValor('');
      setDescricao('');
      onClose();
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao criar permissão.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[480px] bg-[#18181b] p-6 text-white sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <Key size={24} className="text-[#259cc1]" />
            Nova Permissão Base
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para cadastrar nova permissão hierárquica base
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Valor da Permissão (recurso.acao)
            </label>
            <input
              type="text"
              required
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="ex: obra.aprovar, capitulo.publicar"
              className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
            <span className="mt-1 block text-xs text-gray-400">
              Padrão hierárquico Torii: formato <code>recurso.acao</code> ou{' '}
              <code>*.*</code>.
            </span>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-200">
              Descrição
            </label>
            <input
              type="text"
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="ex: Aprovar ou publicar obras"
              className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
            />
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
              disabled={createPermissionMutation.isPending}
              className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
            >
              {createPermissionMutation.isPending
                ? 'Cadastrando...'
                : 'Cadastrar Permissão'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
