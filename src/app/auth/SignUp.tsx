'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/common/button/Button';
import { FormInput } from '@/components/common/form';
import { useToaster } from '@/contexts/ToasterContext';

const signUpFormSchema = z
  .object({
    name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
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

type ISignUpForm = z.infer<typeof signUpFormSchema>;

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ISignUpForm>();

  const { toaster } = useToaster();

  const handleFormSubmit = async (data: ISignUpForm) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
    console.log('Form submitted with data:', data);
    toaster({
      type: 'success',
      msg: 'Cadastro realizado com sucesso!',
    });
    reset();
  };

  return (
    <div className="rounded-md bg-appGroupBackground p-8">
      <div className="flex w-[320px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold -tracking-tighter">Cadastro</h1>
          <p className="text-sm text-appSubtitle">
            Seja um membro da Tsundoku e aproveite nossas histórias!
          </p>
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="space-y-2">
            <div>
              <FormInput
                label="Nome"
                name="name"
                placeholder="Digite seu nome"
                errors={errors}
                setValue={setValue}
                register={register}
              />
              {!!errors.name && (
                <span className="text-red-500">
                  {typeof errors?.name?.message === 'string'
                    ? errors.name.message
                    : null}
                </span>
              )}
            </div>
            <div>
              <FormInput
                label="E-mail"
                name="email"
                placeholder="Digite seu e-mail"
                errors={errors}
                setValue={setValue}
                register={register}
              />
              {!!errors.email && (
                <span className="text-red-500">
                  {typeof errors?.email?.message === 'string'
                    ? errors.email.message
                    : null}
                </span>
              )}
            </div>
            <div>
              <FormInput
                label="Senha"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                errors={errors}
                setValue={setValue}
                register={register}
              />
              {!!errors.password && (
                <span className="text-red-500">
                  {typeof errors?.password?.message === 'string'
                    ? errors.password.message
                    : null}
                </span>
              )}
            </div>
            <div>
              <FormInput
                label="Confirmar Senha"
                name="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                errors={errors}
                setValue={setValue}
                register={register}
              />
              {!!errors.confirmPassword && (
                <span className="text-red-500">
                  {typeof errors?.confirmPassword?.message === 'string'
                    ? errors.confirmPassword.message
                    : null}
                </span>
              )}
            </div>
          </div>
          <Button
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isSubmitting}
            className="w-full"
            type="submit"
          >
            Finalizar Cadastro
          </Button>
        </form>
      </div>
    </div>
  );
};
