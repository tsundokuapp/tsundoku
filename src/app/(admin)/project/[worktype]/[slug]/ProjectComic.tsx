'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { FormEvent, ReactNode } from 'react';
import { Path, useForm } from 'react-hook-form';

import { updateComicService } from '@/features/admin/comics/api/comicAdmin';
import { useAdminComicBySlug } from '@/features/admin/comics/hooks/usePrivateComics';
import { ChapterComicDocumentsTable } from '@/features/admin/components/table/ChapterComicDocumentsTable';
import {
  status,
  types,
  privacy,
  nationality,
  cargoObraDiscord,
} from '@/features/admin/constants/project';
import {
  formProjectSchema,
  InputFormCreateProject,
  InputFormProject,
} from '@/features/admin/schemas';
import { transformFormDataNovel } from '@/features/admin/utils/transformers';
import { useChapterComic } from '@/features/comics/hooks/usePublicComics';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { NavTabs, Tab } from '@/shared/components/layout/tab';
import {
  FormButton,
  FormDropdown,
  FormInput,
  FormMultiSelect,
  FormTextArea,
  DragAndDropSingleImage,
} from '@/shared/components/ui/form';
import { useToaster } from '@/shared/contexts/ToasterContext';

interface ISection {
  title: string;
  children: ReactNode;
}

export function ProjectComic() {
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

  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  const { data: projectResponse, isLoading } = useAdminComicBySlug(
    (slug as string) || '',
  );

  const { data: responseChapters, isLoading: isLoadingChapters } =
    useChapterComic(slug as string);

  const chapterComicResponse = responseChapters?.ok
    ? responseChapters.data
    : undefined;

  const { data: arrayGenres } = usePublicGenres();
  const genresData = arrayGenres?.map((genre) => genre) || [];

  const { toaster } = useToaster();

  const { mutateAsync: updateComicFn } = useMutation({
    mutationFn: updateComicService,
  });

  const booleanOptions = ['Sim', 'Não'];

  const handleFormSubmit = async (data: InputFormCreateProject) => {
    const formData = new FormData();
    const dataRequest = transformFormDataNovel(data);

    for (const [key, value] of Object.entries(dataRequest)) {
      if (key === 'cover' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'listaGeneros' && Array.isArray(value)) {
        value.forEach((genero) => {
          formData.append(`${key}`, genero);
        });
      } else {
        formData.append(key, value as string);
      }
    }

    formData.append('id', String(projectResponse?.id));

    const response = await updateComicFn(formData);

    if (!response.ok) {
      toaster({
        type: 'error',
        msg:
          typeof response.error.message?.title === 'string'
            ? response.error.message.title
            : 'Erro ao atualizar a comic',
      });
      return;
    }

    toaster({
      type: 'success',
      msg: 'Comic atualizada com sucesso',
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
  };

  const Section = ({ title, children }: ISection) => {
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
    !!errors.titleAlternative ||
    !!errors.author ||
    !!errors.illustration ||
    !!errors.yearRelease ||
    !!errors.genres ||
    !!errors.type ||
    !!errors.status ||
    !!errors.privacy ||
    !!errors.synopsis;
  const errorExtras =
    !!errors.hexColor || !!errors.nationality || !!errors.isAdult;

  return (
    <div className="flex flex-row gap-6 p-4">
      <aside className="flex w-full max-w-xs flex-col flex-wrap items-center">
        <Section title="Imagens da Obra">
          <form
            onSubmit={(event: FormEvent) => handleUpload(event)}
            className="flex flex-col items-center gap-4"
          >
            <DragAndDropSingleImage
              title="Capa Principal"
              name={'cover' as Path<InputFormProject>}
              setValue={setValue}
              errors={errors}
              defaultValue={
                !isLoading ? projectResponse?.imagemCapaPrincipal || '' : ''
              }
            />

            <DragAndDropSingleImage
              title="Banner da Obra"
              name={'last-vol' as Path<InputFormProject>}
              setValue={setValue}
              errors={errors}
              defaultValue={
                !isLoading ? projectResponse?.imagemBanner || '' : ''
              }
            />

            <button
              type="submit"
              className="mt-4 flex w-full max-w-[140px] items-center justify-center rounded-lg bg-appGroupBackground px-4 py-2 text-center text-base font-semibold text-appText shadow-md transition duration-200 ease-in hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:ring-offset-2 focus:ring-offset-sky-300"
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
        </Section>
      </aside>
      <aside className="flex w-full flex-col flex-wrap rounded-md bg-appGroupBackground p-4">
        <NavTabs defaultActiveKey="Geral">
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
                    setValue={setValue}
                    register={register}
                    defaultValue={projectResponse?.titulo}
                  />

                  <FormInput
                    label="Alias (Título Reduzido)"
                    name="aliasTitle"
                    placeholder="MajoTabi"
                    errors={errors}
                    setValue={setValue}
                    register={register}
                    defaultValue={projectResponse?.alias}
                  />

                  <FormInput
                    label="Títulos alternativos"
                    name="titleAlternative"
                    placeholder="Wandering Witch"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    defaultValue={projectResponse?.tituloAlternativo}
                  />

                  <FormInput
                    label="Autor"
                    name="author"
                    placeholder="Shiraishi Jougi"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    defaultValue={projectResponse?.autor}
                  />
                  <FormInput
                    label="Ilustrador"
                    name="illustration"
                    placeholder="Azure"
                    errors={errors}
                    setValue={setValue}
                    register={register}
                    defaultValue={projectResponse?.artista}
                  />

                  <FormInput
                    label="Ano de Lançamento"
                    name="yearRelease"
                    type="number"
                    placeholder="2020"
                    errors={errors}
                    setValue={setValue}
                    register={register}
                    className="max-w-[180px]"
                    defaultValue={projectResponse?.ano}
                  />

                  <FormMultiSelect<InputFormProject>
                    label="Gêneros"
                    placeholder="Gêneros"
                    name="genres"
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                    onClick={(items) => setValue('genres', items)}
                    options={genresData}
                    errors={errors}
                    defaultValue={projectResponse?.generos.map(
                      (genre) => genre,
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormDropdown<InputFormProject>
                    label="Tipo"
                    name="type"
                    watch={watch}
                    getValues={getValues}
                    setValue={setValue}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    options={types}
                    defaultValue={projectResponse?.tipoObra}
                  />

                  <FormDropdown<InputFormProject>
                    label="Status"
                    name="status"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={status}
                    defaultValue={projectResponse?.statusObra}
                  />

                  <FormDropdown<InputFormProject>
                    label="Privacidade"
                    name="privacy"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={privacy}
                    defaultValue={
                      projectResponse?.publicado ? 'Público' : 'Privado'
                    }
                  />
                </div>

                <FormTextArea
                  label="Descrição"
                  name="synopsis"
                  errors={errors}
                  register={register}
                  cols={50}
                  rows={5}
                  setValue={setValue}
                  defaultValue={projectResponse?.sinopse}
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
                    name="hexColor"
                    placeholder="3F51B5"
                    errors={errors}
                    setValue={setValue}
                    register={register}
                    className="max-w-[180px]"
                    defaultValue={projectResponse?.codigoCorHexaObra}
                  />

                  <FormDropdown<InputFormProject>
                    label="Cargo Discord"
                    name="discordRole"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={cargoObraDiscord}
                  />

                  <FormDropdown<InputFormProject>
                    label="Nacionalidade"
                    name="nationality"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={nationality}
                    defaultValue={projectResponse?.nacionalidade}
                  />

                  <FormDropdown<InputFormProject>
                    label="Recomendação"
                    name="isRecommendation"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={booleanOptions}
                    defaultValue={
                      projectResponse?.ehRecomendacao === true ? 'Sim' : 'Não'
                    }
                  />

                  <FormDropdown<InputFormProject>
                    label="Maior de Idade"
                    name="isAdult"
                    watch={watch}
                    getValues={getValues}
                    onClick={(key, item) => handleSelectOption(key, item)}
                    errors={errors}
                    setValue={setValue}
                    options={booleanOptions}
                    defaultValue={
                      projectResponse?.ehObraMaiorIdade === true ? 'Sim' : 'Não'
                    }
                  />
                </div>

                <FormTextArea<InputFormProject>
                  label="Observação"
                  name="notes"
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  cols={50}
                  rows={5}
                />

                <FormButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </Tab>
          <Tab title="Capítulos" eventKey="Capitulos">
            {!isLoadingChapters && chapterComicResponse ? (
              <ChapterComicDocumentsTable
                chapters={chapterComicResponse?.data}
                onHandleClick={(data) => {
                  console.log('onHandleClick', data);
                }}
              />
            ) : (
              <p>Nenhum capítulo encontrado.</p>
            )}
          </Tab>
          <Tab title="Registros" eventKey="Logs">
            <h1>Logs para admins</h1>
          </Tab>
        </NavTabs>
      </aside>
    </div>
  );
}
