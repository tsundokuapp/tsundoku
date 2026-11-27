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

import { validateNewUserPassword } from '../api/userAdminApi';
import {
  useAssignNewUserRole,
  useCreateAdminUser,
} from '../hooks/useAdminUsers';

interface ModalAddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PendingRoleAssignment {
  userId: number | null;
  userName: string;
  cargo: string;
  message: string;
}

// TODO(backend-integration): o seed do Torii (UsuarioContext.cs) cria apenas as
// roles `admin`, `leitor` e `tradutor`. Para Staff, Revisor, Editor e Apoiador o
// `AddToRoleAsync` falha até a role existir (POST api/roles); o modal mostra o
// resultado parcial e permite retomar a atribuição depois de criar a role.
const CARGO_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Staff', label: 'Staff' },
  { value: 'Tradutor', label: 'Tradutor' },
  { value: 'Revisor', label: 'Revisor' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Leitor', label: 'Leitor' },
  { value: 'Apoiador', label: 'Apoiador' },
];

const errorMessage = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

export const ModalAddUser = ({ isOpen, onClose }: ModalAddUserProps) => {
  const { toaster } = useToaster();
  const createMutation = useCreateAdminUser();
  const assignMutation = useAssignNewUserRole();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [cargo, setCargo] = useState('Leitor');
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingRoleAssignment | null>(null);

  const resetForm = () => {
    setUserName('');
    setEmail('');
    setSenha('');
    setConfirmaSenha('');
    setCargo('Leitor');
    setFormError(null);
    setPending(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;

    if (!userName.trim() || !email.trim()) {
      setFormError('Preencha o nome de usuário e e-mail.');
      toaster({
        type: 'error',
        msg: 'Preencha o nome de usuário e e-mail.',
      });
      return;
    }

    const passwordError = validateNewUserPassword(senha, confirmaSenha);
    if (passwordError) {
      setFormError(passwordError);
      toaster({ type: 'error', msg: passwordError });
      return;
    }

    setFormError(null);

    try {
      const result = await createMutation.mutateAsync({
        userName: userName.trim(),
        email: email.trim(),
        senha,
        confirmaSenha,
        cargo,
      });

      if (result.status === 'role_pending') {
        setSenha('');
        setConfirmaSenha('');
        setPending({
          userId: result.userId,
          userName: result.user.userName,
          cargo: result.cargo,
          message: result.message,
        });
        toaster({
          type: 'error',
          msg: `Conta criada, mas o cargo ${result.cargo} não foi atribuído.`,
        });
        return;
      }

      toaster({
        type: 'success',
        msg: 'Usuário adicionado com sucesso!',
      });
      handleClose();
    } catch (err) {
      const msg = errorMessage(err, 'Erro ao adicionar usuário.');
      setFormError(msg);
      toaster({ type: 'error', msg });
    }
  };

  const handleRetryAssign = async () => {
    if (!pending || pending.userId === null) return;

    try {
      await assignMutation.mutateAsync({
        userId: pending.userId,
        cargo: pending.cargo,
      });
      toaster({
        type: 'success',
        msg: `Cargo ${pending.cargo} atribuído a ${pending.userName}.`,
      });
      handleClose();
    } catch (err) {
      const msg = errorMessage(
        err,
        `Não foi possível atribuir o cargo ${pending.cargo}.`,
      );
      setPending({ ...pending, message: msg });
      toaster({ type: 'error', msg });
    }
  };

  const inputsDisabled = Boolean(pending) || createMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
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
          noValidate
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
              <label
                htmlFor="add-user-email"
                className="mb-1 block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                id="add-user-email"
                type="email"
                required
                disabled={inputsDisabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@tsundoku.com.br"
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="add-user-username"
                className="mb-1 block text-sm font-medium text-gray-200"
              >
                Login / Usuário
              </label>
              <input
                id="add-user-username"
                type="text"
                required
                disabled={inputsDisabled}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Nome de usuário"
                className="w-full rounded-md border border-[#259cc1] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="add-user-senha"
                className="mb-1 block text-sm font-medium text-gray-200"
              >
                Senha
              </label>
              <input
                id="add-user-senha"
                type="password"
                required
                autoComplete="new-password"
                disabled={inputsDisabled}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none disabled:opacity-60"
              />
              <p className="mt-1 text-xs text-gray-400">
                Mínimo de 6 caracteres, com maiúscula, minúscula, número e
                caractere especial.
              </p>
            </div>

            <div>
              <label
                htmlFor="add-user-confirma-senha"
                className="mb-1 block text-sm font-medium text-gray-200"
              >
                Confirmar senha
              </label>
              <input
                id="add-user-confirma-senha"
                type="password"
                required
                autoComplete="new-password"
                disabled={inputsDisabled}
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                placeholder="Repita a senha"
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-[#259cc1] focus:outline-none disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="add-user-cargo"
                className="mb-1 block text-sm font-medium text-gray-200"
              >
                Cargo
              </label>
              <select
                id="add-user-cargo"
                value={cargo}
                disabled={inputsDisabled}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full rounded-md border border-[#2e2e38] bg-[#202024] px-3 py-2 text-sm text-white transition-colors focus:border-[#259cc1] focus:outline-none disabled:opacity-60"
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

            {formError && !pending && (
              <p role="alert" className="text-sm text-red-400">
                {formError}
              </p>
            )}

            {pending && (
              <div
                role="alert"
                data-testid="add-user-partial"
                className="rounded-md border border-amber-500/60 bg-amber-500/10 p-3 text-sm text-amber-100"
              >
                <p className="font-semibold">
                  Conta {pending.userName} criada, mas o cargo {pending.cargo}{' '}
                  não foi atribuído.
                </p>
                <p className="mt-1 text-amber-200/90">{pending.message}</p>
                {pending.userId === null && (
                  <p className="mt-1 text-amber-200/90">
                    Atribua o cargo pela ação Editar na lista de usuários.
                  </p>
                )}
              </div>
            )}

            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
              >
                {pending ? 'Fechar' : 'Cancelar'}
              </button>
              {pending ? (
                pending.userId !== null && (
                  <button
                    type="button"
                    onClick={handleRetryAssign}
                    disabled={assignMutation.isPending}
                    className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    {assignMutation.isPending
                      ? 'Atribuindo...'
                      : 'Tentar atribuir cargo novamente'}
                  </button>
                )
              ) : (
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="rounded bg-[#259cc1] px-5 py-2 text-sm font-semibold text-[#121214] transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Adicionando...' : 'Adicionar'}
                </button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
