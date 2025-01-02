import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormButton } from './FormButton';
import { FormInput } from './FormInput';

const FormEditStaffSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  sobrenome: z.string().min(1, { message: 'Sobrenome é obrigatório' }),
});

type InputProps = z.infer<typeof FormEditStaffSchema>;

export const FormEditStaff = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<InputProps>({
    resolver: zodResolver(FormEditStaffSchema),
  });

  const handleFormSubmit = async (data: InputProps) => {
    console.log(data);

    const rest = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    await rest;
    // Exemplo de requisição POST
    // const res = await fetch('/api/staff', {
    //   method: 'POST',
    //   headers: {contentType: 'application/json'},
    //   body: JSON.stringify(data),
    // });
    // const resData = res.json();
    // console.log(resData);
  };

  return (
    <div className="mx-auto w-full max-w-[550px] bg-white dark:bg-slate-900">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-5 flex flex-col gap-2">
          <FormInput
            label="Nome"
            name="name"
            placeholder="digite..."
            errors={errors}
            register={register}
          />
          <FormInput
            label="Sobrenome"
            name="sobrenome"
            placeholder="digite..."
            errors={errors}
            register={register}
          />
        </div>
        <FormButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};
