'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createUserService } from '@/features/auth/api/authApi';
import { IUserRegisterData } from '@/features/auth/api/types';
import { FormInput } from '@/shared/components/ui/form';

const registerFormSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[^A-Za-z0-9]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: 'As senhas não coincidem',
      });
    }
  });

type IRegisterForm = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<IRegisterForm>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUserService,
  });

  const handleRegisterSubmit = async (data: IRegisterForm) => {
    clearErrors('root');

    const formData: IUserRegisterData = {
      usuario: data.name,
      email: data.email,
      senha: data.password,
      confirmaSenha: data.confirmPassword,
    };

    const result = await createUserFn(formData);

    if (!result.ok) {
      const message =
        typeof result.error.message?.title === 'string'
          ? result.error.message.title
          : 'Não foi possível concluir o cadastro. Tente novamente.';

      setError('root', { type: 'server', message });
      return;
    }

    reset();
    router.push('/login');
  };

  return (
    <div className="relative">
      <div className="mb-5 text-center">
        <p className="mt-2 text-sm text-authSubtitle">
          Cadastre-se para acompanhar seus mangás e novels favoritos.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegisterSubmit)}
        className="mx-auto w-full max-w-sm space-y-3.5"
      >
        <FormInput
          label="Usuário"
          name="name"
          placeholder="Escolha seu nome de usuário"
          errors={errors}
          setValue={setValue}
          register={register}
        />

        <FormInput
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail"
          errors={errors}
          setValue={setValue}
          register={register}
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          placeholder="Crie uma senha forte"
          errors={errors}
          setValue={setValue}
          register={register}
          isPassword
        />

        <FormInput
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          placeholder="Repita sua senha"
          errors={errors}
          setValue={setValue}
          register={register}
          isPassword
        />

        {errors.root?.message && (
          <p className="rounded-md border border-authErrorBorder bg-authErrorBackground px-3 py-2 text-sm text-authErrorText">
            {errors.root.message}
          </p>
        )}

        <div className="rounded-lg border border-authSeparator bg-authPanelBackground p-2.5 text-xs text-authSubtitle">
          Sua senha deve conter letra maiúscula, número e caractere especial.
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-authButtonBorder bg-authButtonBackground px-4 text-sm font-semibold text-authButtonText transition-colors duration-200 hover:bg-authButtonHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <div className="text-authSubtitle/70 mt-5 flex items-center gap-3">
        <span className="h-[1.5px] flex-1 bg-authSeparator" />
        <span className="text-[11px] uppercase tracking-[0.18em]">
          Já tem conta?
        </span>
        <span className="h-[1.5px] flex-1 bg-authSeparator" />
      </div>

      <p className="mt-3 text-center text-sm text-authSubtitle">
        Já possui conta?{' '}
        <Link
          href="/login"
          className="font-semibold text-authHighlight transition-colors hover:text-authHeaderHighlight"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
