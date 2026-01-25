'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { TableNovel } from '@/features/admin/components/dashboard/table';
import { status, types, nationality } from '@/features/admin/constants/project';
import { createNovelService } from '@/features/admin/novels/api/novelAdminApi';
import {
  InputFormCreateProject,
  formCreateProjectSchema,
} from '@/features/admin/schemas';
import { transformFormDataNovel } from '@/features/admin/utils/transformers';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { Modal } from '@/shared/components/feedback/Modal';
import {
  DragAndDropSingleImage,
  FormButton,
  FormDropdown,
  FormInput,
  FormMultiSelect,
  FormTextArea,
} from '@/shared/components/ui/form';
import { useModal } from '@/shared/contexts/ModalContext';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { IGenres } from '@/shared/types/common';

export default function NovelAdmin() {
  const { openModal, closeModal } = useModal();
  const { toaster } = useToaster();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<InputFormCreateProject>({
    resolver: zodResolver(formCreateProjectSchema),
  });

  const { data: arrayGenres } = usePublicGenres();
  const genresData =
    arrayGenres?.map((genre: IGenres) => genre.descricao) || [];

  const { mutateAsync: createNovelFn } = useMutation({
    mutationFn: createNovelService,
  });

  const handleSelectOption = <K extends keyof InputFormCreateProject>(
    key: K,
    value: InputFormCreateProject[K],
  ) => {
    setValue(key, value);
  };

  const handleFormSubmit = async (data: InputFormCreateProject) => {
    const formData = new FormData();
    const dataRequest = transformFormDataNovel(data);

    for (const [key, value] of Object.entries(dataRequest)) {
      if (key === 'cover' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    }

    const response = await createNovelFn(formData);

    if (!response.ok) {
      toaster({
        type: 'error',
        msg:
          typeof response.error.message?.title === 'string'
            ? response.error.message.title
            : 'Erro ao criar a novel',
      });
      return;
    }

    toaster({
      type: 'success',
      msg: 'Novel criada com sucesso',
    });

    reset();
    closeModal();
  };

  const ModalCreateNovel = () => {
    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid w-full min-w-[800px] grid-cols-3 items-center justify-center gap-x-4 gap-y-2"
      >
        <DragAndDropSingleImage
          title="Capa Principal"
          name="cover"
          setValue={setValue}
          errors={errors}
          defaultValue={''}
        />

        <div className="col-span-2 mb-2 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Título"
              name="title"
              placeholder="Bruxa Errante: A Jornada de Elaina"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Alias (Título Reduzido)"
              name="aliasTitle"
              placeholder="Bruxa Errante"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Título Alternativo"
              name="titleAlternative"
              placeholder="Majo no Tabitabi: The Journey of Elaina"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Autor"
              name="author"
              placeholder="Jougi Shiraishi"
              errors={errors}
              setValue={setValue}
              register={register}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Ano de Lançamento"
              name="yearRelease"
              type="number"
              placeholder="2020"
              errors={errors}
              setValue={setValue}
              register={register}
              className="max-w-[180px]"
            />

            <FormInput
              label="Cor Hexadecimal"
              name="hexColor"
              placeholder="3F51B5"
              errors={errors}
              setValue={setValue}
              register={register}
              className="max-w-[180px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormDropdown<InputFormCreateProject>
              label="Tipo"
              name="type"
              watch={watch}
              getValues={getValues}
              onClick={(key, item) => handleSelectOption(key, item)}
              errors={errors}
              setValue={setValue}
              options={types}
            />

            <FormDropdown<InputFormCreateProject>
              label="Status"
              name="status"
              watch={watch}
              getValues={getValues}
              onClick={(key, item) => handleSelectOption(key, item)}
              errors={errors}
              setValue={setValue}
              options={status}
            />

            <FormDropdown<InputFormCreateProject>
              label="Nacionalidade"
              name="nationality"
              watch={watch}
              getValues={getValues}
              onClick={(key, item) => handleSelectOption(key, item)}
              errors={errors}
              setValue={setValue}
              options={nationality}
            />

            <FormMultiSelect<InputFormCreateProject>
              label="Gêneros"
              name="genres"
              placeholder="Gêneros"
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              onClick={(items) => setValue('genres', items)}
              errors={errors}
              options={genresData}
            />
          </div>

          <FormTextArea<InputFormCreateProject>
            label="Sinopse"
            name="synopsis"
            cols={30}
            rows={2}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </div>
        <FormButton isSubmitting={isSubmitting} className="col-span-3" />
      </form>
    );
  };

  return (
    <div className="flex flex-row">
      <TableNovel openModal={openModal} />
      <div>
        <Modal title="Criação de Novels">
          <ModalCreateNovel />
        </Modal>
      </div>
    </div>
  );
}
