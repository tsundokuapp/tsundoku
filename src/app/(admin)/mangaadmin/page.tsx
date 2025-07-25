'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  DragAndDropSingleImage,
  FormButton,
  FormDropdown,
  FormInput,
  FormMultiSelect,
  FormTextArea,
} from '@/components/common/form';
import { TableComic } from '@/components/dashboard/table/TableComic';
import { useModal } from '@/contexts/ModalContext';
import { useToaster } from '@/contexts/ToasterContext';
import {
  formCreateProjectSchema,
  InputFormCreateProject,
} from '@/helpers/Schemas';
import { transformFormDataComic } from '@/helpers/TransformFormData';
import { nationality, status, types } from '@/helpers/Util';
import { createComic } from '@/hooks/usePrivateApi';
import { usePublicGenres } from '@/hooks/usePublicApi';

export default function NovelAdmin() {
  const { Modal, openModal, closeModal } = useModal();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
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
  const genresData = arrayGenres?.data.map((genre) => genre.descricao) || [];

  const { mutateAsync: createComicFn } = useMutation({
    mutationFn: createComic,
  });

  const handleSetMultiValues = (
    key: keyof InputFormCreateProject,
    value: string,
  ) => {
    if (selectedGenres.includes(value)) {
      setSelectedGenres((prev) => {
        const newGenres = prev.filter((item) => item !== value);
        setValue(key, newGenres);
        return newGenres;
      });
    } else {
      setSelectedGenres((prev) => {
        const newGenres = [...prev, value];
        setValue(key, newGenres);
        return newGenres;
      });
    }
  };

  const handleSelectOption = <K extends keyof InputFormCreateProject>(
    key: K,
    value: InputFormCreateProject[K],
  ) => {
    setValue(key, value);
  };

  const handleFormSubmit = async (data: InputFormCreateProject) => {
    const formData = new FormData();
    const dataRequest = transformFormDataComic(data);

    for (const [key, value] of Object.entries(dataRequest)) {
      if (key === 'cover' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    }

    const response = await createComicFn(formData);

    if (response?.statusCode === 400) {
      toaster({
        type: 'error',
        msg:
          typeof response.message === 'string'
            ? response.message
            : response.message?.title || 'Erro ao criar a Comic',
      });
      return;
    }

    toaster({
      type: 'success',
      msg: 'Comic criada com sucesso',
    });

    reset();
    closeModal();
  };

  const ModalCreateComic = () => {
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
              placeholder="Jirai Nandesuka? Chihara-san"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Alias (Título Reduzido)"
              name="aliasTitle"
              placeholder="Chihara-san"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Título Alternativo"
              name="titleAlternative"
              placeholder="That Girl Is Cute... But Dangerous?; Aquela Garota é Bonita, Mas Perigosa?"
              errors={errors}
              setValue={setValue}
              register={register}
            />

            <FormInput
              label="Autor"
              name="author"
              placeholder="Ryon"
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
              watch={watch}
              getValues={getValues}
              onClick={(key, item) => handleSetMultiValues(key, item)}
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
      <TableComic openModal={openModal} />
      <div>
        <Modal title="Criação de Comics">
          <ModalCreateComic />
        </Modal>
      </div>
    </div>
  );
}
