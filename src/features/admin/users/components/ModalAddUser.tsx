'use client';

import { UserPlus, User as UserIcon } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useToaster } from '@/shared/contexts/ToasterContext';

import { useCreateAdminUser } from '../hooks/useAdminUsers';

interface ModalAddUserProps {
  isOpen: boolean;
  onClose: () => void;
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

export const ModalAddUser = ({ isOpen, onClose }: ModalAddUserProps) => {
  const { toaster } = useToaster();
  const createMutation = useCreateAdminUser();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('Leitor');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim()) {
      toaster({
        type: 'error',
        msg: 'Preencha o nome de usuário e e-mail.',
      });
      return;
    }

    try {
      await createMutation.mutateAsync({
        userName: userName.trim(),
        email: email.trim(),
        senha: senha || undefined,
        cargo,
      });

      toaster({
        type: 'success',
        msg: 'Usuário adicionado com sucesso!',
      });

      setUserName('');
      setEmail('');
      setSenha('');
      setCargo('Leitor');
      onClose();
    } catch {
      toaster({
        type: 'error',
        msg: 'Erro ao adicionar usuário.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[650px] bg-[#18181b] p-6 text-white sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
            <UserPlus size={24} className="text-[#259cc1]" />
            Adicionar Usuário
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulário para adicionar novo usuário no sistema
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
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
            <span className="mt-2 text-xs text-gray-400">Avatar padrão</span>
          </div>

          {/* Form Fields */}
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@tsundoku.com.br"
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Login / Usuário
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nome de usuário"
                className="w-full rounded-md border border-[#259cc1] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-200">
                Senha
              </label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none"
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
                disabled={createMutation.isPending}
                className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
              >
                {createMutation.isPending ? 'Adicionando...' : 'Adicionar'}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
