'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { loginUserService } from '@/features/auth/api/authApi';
import { IUserLoginData } from '@/features/auth/api/types';
import { FormInput } from '@/shared/components/ui/form';

const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, 'O nome de usuário deve ter pelo menos 2 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type ILoginForm = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUsername, setAccessToken, setTsunId } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  const { mutateAsync: loginUserFn } = useMutation({
    mutationFn: loginUserService,
  });

  const handleLoginSubmit = async (data: ILoginForm) => {
    clearErrors('root');

    const formData: IUserLoginData = {
      Usuario: data.username,
      Senha: data.password,
    };

    const result = await loginUserFn(formData);

    if (!result.ok) {
      const message =
        typeof result.error.message?.title === 'string'
          ? result.error.message.title
          : 'Não foi possível realizar o login. Tente novamente.';

      setError('root', { type: 'server', message });
      return;
    }

    setUsername(result.data.usuario);
    setAccessToken(result.data.accessToken);
    setTsunId(result.data.tsunId);

    reset();
    router.push('/');
  };

  return (
    <div className="relative">
      <div className="mb-5 text-center">
        <p className="text-sm text-authSubtitle">
          Entre para continuar sua leitura de onde parou.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="mx-auto w-full max-w-sm space-y-3.5"
      >
        <FormInput
          label="Usuário"
          name="username"
          placeholder="Digite seu usuário"
          errors={errors}
          setValue={setValue}
          register={register}
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          placeholder="Digite sua senha"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-authButtonBorder bg-authButtonBackground px-4 text-sm font-semibold text-authButtonText transition-colors duration-200 hover:bg-authButtonHover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="text-authSubtitle/70 mt-5 flex items-center gap-3">
        <span className="h-[1.5px] flex-1 bg-authSeparator" />
        <span className="text-[11px] uppercase tracking-[0.18em]">
          Novo por aqui?
        </span>
        <span className="h-[1.5px] flex-1 bg-authSeparator" />
      </div>

      <p className="mt-3 text-center text-sm text-authSubtitle">
        Não possui uma conta?{' '}
        <Link
          href="/register"
          className="font-semibold text-authHighlight transition-colors hover:text-authHeaderHighlight"
        >
          Crie agora
        </Link>
      </p>
    </div>
  );
}
