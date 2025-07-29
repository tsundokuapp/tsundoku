'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/button/Button';
import { FormInput } from '@/components/common/form';

const signInFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type ISignInForm = z.infer<typeof signInFormSchema>;

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ISignInForm>();

  const handleFormSubmit = async (data: ISignInForm) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
    console.log('Form submitted with data:', data);
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
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="space-y-2">
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
              placeholder="Digite sua senha"
              errors={errors}
              setValue={setValue}
              register={register}
            />
          </div>
          <Button
            onClick={handleSubmit(handleFormSubmit)}
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
