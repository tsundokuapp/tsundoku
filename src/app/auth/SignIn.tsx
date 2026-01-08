'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { IUserLoginData } from '@/@types/Api';
import { Button } from '@/components/common/button/Button';
import { FormInput } from '@/components/common/form';
import { useToaster } from '@/contexts/ToasterContext';
import { loginUser } from '@/hooks/usePublicApi';
import { useAuthStore } from '@/store/useAuthStore';

const signInFormSchema = z.object({
  username: z
    .string()
    .min(2, 'O nome de usuário deve ter pelo menos 2 caracteres'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type ISignInForm = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ISignInForm>({
    resolver: zodResolver(signInFormSchema),
  });
  const { setUsername, setAccessToken } = useAuthStore();
  const { toaster } = useToaster();

  const { mutateAsync: loginUserFn } = useMutation({
    mutationFn: loginUser,
  });

  const router = useRouter();

  const handleFormLoginSubmit = async (data: ISignInForm) => {
    const formData: IUserLoginData = {
      UserName: data.username,
      Password: data.password,
    };

    const result = await loginUserFn(formData);

    if (!result.ok) {
      toaster({
        type: 'error',
        msg:
          typeof result.error.message?.title === 'string'
            ? result.error.message.title
            : 'Erro ao realizar o login',
      });
      return;
    }

    setUsername(result.data.userName);
    setAccessToken(result.data.accessToken);

    toaster({
      type: 'success',
      msg: 'Login realizado com sucesso! Bem-vindo de volta.',
    });

    reset();

    router.push('/dashboard');
  };

  return (
    <div className="rounded-md bg-appGroupBackground p-8">
      <div className="flex w-[320px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold -tracking-tighter">Logar</h1>
          <p className="text-sm text-appSubtitle">
            Acesse agora mesmo sua conta na Tsundoku!
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleFormLoginSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="space-y-2">
            <FormInput
              label="Nome"
              name="username"
              placeholder="Digite seu e-mail"
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
          </div>
          <Button
            onClick={handleSubmit(handleFormLoginSubmit)}
            disabled={isSubmitting}
            className="w-full"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};
