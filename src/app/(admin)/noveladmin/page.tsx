'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react/dist/ssr';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Path, useForm } from 'react-hook-form';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { TableNovel } from '@/features/admin/components/dashboard/table';
import { ObraCard, ObrasViewToggle } from '@/features/admin/components/obras';
import { nationality, status, types } from '@/features/admin/constants/project';
import { createNovelService } from '@/features/admin/novels/api/novelAdminApi';
import { usePrivateNovels } from '@/features/admin/novels/hooks/usePrivateNovels';
import {
  formCreateProjectSchema,
  InputFormCreateProject,
} from '@/features/admin/schemas';
import { transformFormDataNovel } from '@/features/admin/utils/transformers';
import { usePublicGenres } from '@/features/project/hooks/useProject';
import { Modal } from '@/shared/components/feedback/Modal';
import { Button } from '@/shared/components/ui/button/Button';
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

export default function NovelAdmin() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin } = useAuthStore();
  const { data: novelsResponse, isLoading: isLoadingNovels } =
    usePrivateNovels();

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
  const genresData = arrayGenres?.map((genre) => genre) || [];

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
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
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

  const novelsList =
    novelsResponse?.ok && Array.isArray(novelsResponse.data?.data)
      ? novelsResponse.data.data
      : [];

  const filteredNovels = novelsList.filter(
    (novel) =>
      novel.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      novel.autor?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const ModalCreateNovel = () => {
    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid w-full min-w-[800px] grid-cols-3 items-center justify-center gap-x-4 gap-y-2"
      >
        <DragAndDropSingleImage
          title="Capa Principal"
          name={'cover' as Path<InputFormCreateProject>}
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
              placeholder="#3F51B5"
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
    <div className="flex w-full flex-col gap-6">
      {/* Top Controls Header matching Figma 1268:29213 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <MagnifyingGlass
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar Obras"
            className="h-10 w-full rounded-[8px] border border-transparent bg-[#202024] pl-10 pr-4 text-sm text-[#e1e1e6] placeholder-[#6c757d] transition-colors focus:border-[#259cc1] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <ObrasViewToggle viewMode={viewMode} onChange={setViewMode} />
          {isAdmin && (
            <Button
              onClick={() => openModal()}
              className="flex items-center gap-1.5"
            >
              <Plus size={16} weight="bold" />
              <span>Adicionar</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content: Grid vs Table with responsive mobile view */}
      {viewMode === 'grid' ? (
        <div>
          {isLoadingNovels ? (
            <div className="flex h-64 items-center justify-center text-sm text-[#a8a8b3]">
              Carregando obras...
            </div>
          ) : filteredNovels.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-[8px] border border-dashed border-[#202024] p-8 text-center text-[#a8a8b3]">
              <p>Nenhuma novel encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredNovels.map((novel) => (
                <ObraCard
                  key={novel.id}
                  id={novel.id}
                  title={novel.titulo}
                  coverUrl={novel.imagemCapaPrincipal}
                  slug={novel.slug}
                  worktype="novel"
                  author={novel.autor}
                  status={novel.statusObra}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full">
          {/* On mobile, render the 2-column card grid to prevent horizontal squishing */}
          <div className="block md:hidden">
            {filteredNovels.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-sm text-[#a8a8b3]">
                Nenhuma novel encontrada.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filteredNovels.map((novel) => (
                  <ObraCard
                    key={novel.id}
                    id={novel.id}
                    title={novel.titulo}
                    coverUrl={novel.imagemCapaPrincipal}
                    slug={novel.slug}
                    worktype="novel"
                    author={novel.autor}
                    status={novel.statusObra}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <TableNovel openModal={openModal} />
          </div>
        </div>
      )}

      <div>
        <Modal title="Criação de Novels">
          <ModalCreateNovel />
        </Modal>
      </div>
    </div>
  );
}
