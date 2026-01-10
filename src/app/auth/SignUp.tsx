'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { IUserRegisterData } from '@/@types/domain/user/auth';
import { Button } from '@/components/common/button/Button';
import { FormInput } from '@/components/common/form';
import { useToaster } from '@/contexts/ToasterContext';
import { createUser } from '@/hooks/usePublicApi';

const signUpFormSchema = z
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

type ISignUpForm = z.infer<typeof signUpFormSchema>;

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { toaster } = useToaster();

  const { mutateAsync: createUserFn } = useMutation({
    mutationFn: createUser,
  });

  const handleFormRegisterSubmit = async (data: ISignUpForm) => {
    const formData: IUserRegisterData = {
      UserName: data.name,
      Email: data.email,
      Senha: data.password,
      ConfirmaSenha: data.confirmPassword,
    };

    const result = await createUserFn(formData);

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

    toaster({
      type: 'success',
      msg: 'Cadastro realizado com sucesso! Confira seu e-mail para ativar a conta.',
    });
    reset();
  };

  const DivForms = () => (
    <form
      onSubmit={handleSubmit(handleFormRegisterSubmit)}
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
            isPassword
          />
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
        </div>
      </div>
      <Button
        onClick={handleSubmit(handleFormRegisterSubmit)}
        disabled={isSubmitting}
        className="w-full"
        type="submit"
      >
        Cadastrar
      </Button>
    </form>
  );

  return (
    <div className="rounded-md bg-appGroupBackground p-8">
      <div className="flex w-[320px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold -tracking-tighter">Cadastro</h1>
          <p className="text-sm text-appSubtitle">
            Seja um membro da Tsundoku e aproveite nossas histórias!
          </p>
        </div>
        <DivForms />
      </div>
    </div>
  );
};
