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
      UserName: data.username,
      Password: data.password,
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

    setUsername(result.data.userName);
    setAccessToken(result.data.accessToken);
    setTsunId(result.data.TsunId);

    reset();
    router.push('/');
  };

  return (
    <div className="relative">
      <div className="mb-5 text-center">
        <p className="text-authSubtitle text-sm">
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
          <p className="border-authErrorBorder bg-authErrorBackground text-authErrorText rounded-md border px-3 py-2 text-sm">
            {errors.root.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="border-authButtonBorder bg-authButtonBackground text-authButtonText hover:bg-authButtonHover inline-flex h-11 w-full items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <div className="text-authSubtitle/70 mt-5 flex items-center gap-3">
        <span className="bg-authSeparator h-[1.5px] flex-1" />
        <span className="text-[11px] uppercase tracking-[0.18em]">
          Novo por aqui?
        </span>
        <span className="bg-authSeparator h-[1.5px] flex-1" />
      </div>

      <p className="text-authSubtitle mt-3 text-center text-sm">
        Não possui uma conta?{' '}
        <Link
          href="/register"
          className="text-authHighlight hover:text-authHeaderHighlight font-semibold transition-colors"
        >
          Crie agora
        </Link>
      </p>
    </div>
  );
}
