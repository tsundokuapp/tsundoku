'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FormButton,
  FormDropdown,
  FormInput,
  FormMultiSelect,
  FormTextArea,
  DragAndDropSingleImage,
} from '@/components/admin/form';
import { TableChapterAdmin } from '@/components/admin/table/TableChapterAdmin';
import { NavTabs, Tab } from '@/components/common/tab';
import { useModal } from '@/contexts/ModalContext';
import { useToaster } from '@/contexts/ToasterContext';
import { formProjectSchema, InputFormProject } from '@/helpers/Schemas';
import {
  status,
  genres,
  types,
  privacy,
  nationality,
  cargoObraDiscord,
} from '@/helpers/Util';

interface ISession {
  title: string;
  children: ReactNode;
}

export default function Project() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<InputFormProject>({
    resolver: zodResolver(formProjectSchema),
  });

  const { toaster } = useToaster();

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const booleanOptions = ['Sim', 'Não'];

  const handleFormSubmit = async (data: InputFormProject) => {
    console.log(data);

    // TODO: iterar nas opções booleanas e setar o valor correto

    const rest = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });

    await rest;

    // TODO: adicionar toaster de sucesso ao finalizar o envio do formulário
    toaster({
      type: 'success',
      msg: 'Toaster da Sorte',
    });
  };

  const handleSelectOption = <K extends keyof InputFormProject>(
    key: K,
    value: InputFormProject[K],
  ) => {
    setValue(key, value);
  };

  const handleUpload = (event: FormEvent) => {
    event.preventDefault();

    toaster({
      type: 'success',
      msg: 'Imagens enviadas com sucesso',
    });

    console.log(getValues());
  };

  const handleSetMultiValues = (key: keyof InputFormProject, value: string) => {
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

  const Session = ({ title, children }: ISession) => {
    return (
      <div className="mb-2 flex w-full flex-col justify-between p-2">
        <h3 className="mb-1 text-center text-lg font-semibold">{title}</h3>
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {children}
        </div>
      </div>
    );
  };

  const errorGeral =
    !!errors.title ||
    !!errors['title-alternative'] ||
    !!errors.author ||
    !!errors.illustration ||
    !!errors['year-release'] ||
    !!errors.genres ||
    !!errors.types ||
    !!errors.status ||
    !!errors.privacy ||
    !!errors.description;
  const errorExtras =
    !!errors['hex-color'] || !!errors.nationality || !!errors.adult;

  const { Modal } = useModal();

  return (
    <div className="flex flex-row gap-6 p-4">
      <aside className="flex w-full max-w-xs flex-col flex-wrap items-center">
        <Session title="Imagens da Obra">
          <form
            onSubmit={(event: FormEvent) => handleUpload(event)}
            className="flex flex-col items-center gap-4"
          >
            <DragAndDropSingleImage
              title="Capa Principal"
              name="cover"
              setValue={setValue}
            />
            <DragAndDropSingleImage
              title="Capa Último Volume"
              name="last-vol"
              setValue={setValue}
            />

            <button
              type="submit"
              className="mt-4 flex w-full max-w-[140px] items-center justify-center rounded-lg bg-primary px-4 py-2 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 focus:ring-offset-sky-300"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
              </svg>
              Enviar
            </button>
          </form>
        </Session>
      </aside>
      <aside className="flex w-full flex-col flex-wrap rounded-md bg-slate-100 p-4 dark:bg-slate-800">
        <NavTabs defaultActiveKey="Capitulos">
          <Tab title="Geral" eventKey="Geral" alert={errorGeral}>
            <div className="flex flex-col justify-between">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-[3px]"
              >
                <div className="mb-2 grid grid-cols-2 gap-4">
                  <FormInput
                    label="Título"
                    name="title"
                    placeholder="Majo no Tabitabi"
                    errors={errors}
                    register={register}
                  />
                  <FormInput
                    label="Títulos alternativos"
                    name="title-alternative"
                    placeholder="Wandering Witch"
                    errors={errors}
                    register={register}
                  />

                  <FormInput
                    label="Autor"
                    name="author"
                    placeholder="Shiraishi Jougi"
                    errors={errors}
                    register={register}
                  />
                  <FormInput
                    label="Ilustrador"
                    name="illustration"
                    placeholder="Azure"
                    errors={errors}
                    register={register}
                  />

                  <FormInput
                    label="Ano de Lançamento"
                    name="year-release"
                    type="number"
                    placeholder="2020"
                    errors={errors}
                    register={register}
                    className="max-w-[180px]"
                  />

                  <FormMultiSelect
                    label="Gêneros"
                    name="genres"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSetMultiValues(key, item)}
                    errors={errors}
                    options={genres}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormDropdown
                    label="Tipo"
                    name="types"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={types}
                  />

                  <FormDropdown
                    label="Status"
                    name="status"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={status}
                  />

                  <FormDropdown
                    label="Privacidade"
                    name="privacy"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={privacy}
                  />
                </div>

                <FormTextArea
                  label="Descrição"
                  name="description"
                  errors={errors}
                  register={register}
                  cols={50}
                  rows={5}
                />

                <FormButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </Tab>
          <Tab title="Extras" eventKey="Extras" alert={errorExtras}>
            <div className="flex flex-col justify-between">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-[3px]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Cor Hexadecimal"
                    name="hex-color"
                    placeholder="3F51B5"
                    errors={errors}
                    register={register}
                    className="max-w-[180px]"
                  />

                  <FormDropdown
                    label="Cargo Discord"
                    name="discord-role"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={cargoObraDiscord}
                  />

                  <FormDropdown
                    label="Nacionalidade"
                    name="nationality"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={nationality}
                  />

                  <FormDropdown
                    label="Recomendação"
                    name="recomendation"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={booleanOptions}
                  />

                  <FormDropdown
                    label="Maior de Idade"
                    name="adult"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={booleanOptions}
                  />
                </div>

                <FormTextArea
                  label="Observação"
                  name="notes"
                  errors={errors}
                  register={register}
                  cols={50}
                  rows={5}
                />

                <FormButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </Tab>
          <Tab title="Capítulos" eventKey="Capitulos">
            <TableChapterAdmin />
          </Tab>
        </NavTabs>
      </aside>
      <Modal title="Capítulo">
        <p>capitulo aberto</p>
      </Modal>
    </div>
  );
}
