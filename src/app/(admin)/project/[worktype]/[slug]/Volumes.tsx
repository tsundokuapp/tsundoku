'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  BookOpen,
  Pencil,
  Rows,
  SquaresFour,
  Table,
} from '@phosphor-icons/react/dist/ssr';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Path, useForm } from 'react-hook-form';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { ChapterDocumentsTable } from '@/features/admin/components/table/ChapterDocumentsTable';
import {
  createNovelVolume,
  deleteNovelVolume,
  updateNovelVolume,
} from '@/features/admin/novels/api/novelAdminApi';
import {
  InputFormUnifiedVolumeAndChapter,
  unifiedVolumeAndChapterSchema,
} from '@/features/admin/schemas';
import { transformFormDataNovelVolumeAndChapter } from '@/features/admin/utils/transformers';
import { IVolumeNovelData } from '@/features/novels/api/types';
import { useVolumesNovel } from '@/features/novels/hooks/usePublicNovels';
import { Modal } from '@/shared/components/feedback/Modal';
import { Accordion } from '@/shared/components/ui/Accordion';
import { Button } from '@/shared/components/ui/button/Button';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import {
  DragAndDropSingleImage,
  FormButton,
  FormInput,
  FormTextArea,
} from '@/shared/components/ui/form';
import { Title } from '@/shared/components/ui/title/Title';
import { useModal } from '@/shared/contexts/ModalContext';
import { useToaster } from '@/shared/contexts/ToasterContext';
import { cn } from '@/shared/utils/cn';

interface IVolumeContentProps {
  idVolume: string;
  cover: string;
  volumeNumber: string;
  title: string;
  sinopse: string;
  chapters: IVolumeNovelData['listaCapitulos'];
}

interface IPreInfo {
  title: string;
  volumeNumber?: string;
  id: string;
  idChapter?: string; // usado para editar o conteúdo do capítulo
  // props de volumes abaixo
  cover?: string;
  sinopse?: string;
  idVolume?: string;
}

interface IOptionsModal {
  typeModal: 'volume' | 'chapter';
  typeValue: 'volume' | 'chapter';
  mode: 'create' | 'edit';
}

const OPTIONS_MODAL = {
  createVolume: {
    typeModal: 'volume',
    typeValue: 'volume',
    mode: 'create',
  },
  createChapter: {
    typeModal: 'chapter',
    typeValue: 'chapter',
    mode: 'create',
  },
  editVolume: {
    typeModal: 'volume',
    typeValue: 'volume',
    mode: 'edit',
  },
  editChapter: {
    typeModal: 'chapter',
    typeValue: 'chapter',
    mode: 'edit',
  },
} as const;

export const Volumes = ({ novelId }: { novelId: string }) => {
  // TODO: Refatorar esse componente em pequenos componentes, principalmente os Modais
  const router = useRouter();
  const { isAdmin } = useAuthStore();

  const { openModal, closeModal } = useModal();
  const { toaster } = useToaster();
  const [typeModal, setTypeModal] = useState<'volume' | 'chapter'>('volume');
  const [modeModal, setModeModal] = useState<'create' | 'edit'>('create');
  const [volumeViewMode, setVolumeViewMode] = useState<
    'accordion' | 'grid' | 'table'
  >('accordion');
  const [volumeData, setVolumeData] = useState<IVolumeNovelData[]>();
  const [isCreatingOrLoading, setIsCreatingOrLoading] = useState(false);
  const [infoEditing, setInfoEditing] = useState<IPreInfo>({
    title: '',
    volumeNumber: '',
    id: '',
  });
  // const createChapter = useMutation(api.documents.createDocument);
  // const removeChapter = useMutation(api.documents.removeDocumentById);
  const { data: volumesNovelResponse, isLoading } = useVolumesNovel(novelId);

  const { mutateAsync: createNovelVolumeFn } = useMutation({
    mutationFn: createNovelVolume,
  });

  const { mutateAsync: updateNovelVolumeFn } = useMutation({
    mutationFn: (fd: FormData) => updateNovelVolume(fd, infoEditing.idVolume),
  });

  const { mutateAsync: deleteNovelVolumeFn } = useMutation({
    mutationFn: deleteNovelVolume,
  });

  useEffect(() => {
    if (volumesNovelResponse?.data) {
      setVolumeData(volumesNovelResponse?.data);
    }
  }, [volumesNovelResponse?.data]);

  const onTemplateClick = (chapterId: string) => {
    setIsCreatingOrLoading(true);
    if (!chapterId) {
      toaster({
        type: 'error',
        msg: 'Erro ao carregar capítulo.',
      });
      setIsCreatingOrLoading(false);
      return;
    }
    router.push(`/editor/${chapterId}`);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<InputFormUnifiedVolumeAndChapter>({
    resolver: zodResolver(unifiedVolumeAndChapterSchema),
  });

  const VolumeContent = ({
    idVolume,
    cover,
    volumeNumber,
    title,
    sinopse,
    chapters,
  }: IVolumeContentProps) => {
    return (
      <Accordion
        title={`Volume ${volumeNumber}`}
        className="bg-appListBackground"
      >
        <section className="flex flex-col gap-4">
          <div className="flex flex-row items-start justify-between gap-4">
            <div className="relative flex flex-col items-center justify-start gap-4">
              <Image
                src={cover}
                alt="cover"
                className="w-32 min-w-32 rounded-md"
                width={180}
                height={256}
              />
              {isAdmin && (
                <Button
                  onClick={() => {
                    const preInfo = {
                      idVolume,
                      cover,
                      title,
                      volumeNumber,
                      sinopse,
                      id: novelId,
                    };
                    handleOpenModal({ ...OPTIONS_MODAL.editVolume }, preInfo);
                  }}
                  className="gap-2"
                >
                  <Pencil size={16} />
                  <p className="text-xs">Editar</p>
                </Button>
              )}
            </div>
            <div className="flex w-full flex-col gap-2">
              <span className="inline-flex flex-row items-center gap-2">
                <h3 className="text-lg font-bold">Volume {volumeNumber}</h3>
                {title && <p>{`: ${title}`}</p>}
              </span>
              <p className="text-sm text-gray-500">
                {sinopse ? `: ${sinopse}` : 'Sinopse não fornecida.'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <ChapterDocumentsTable
              chapters={chapters}
              onHandleClick={(preInfo: IPreInfo) => {
                preInfo = { ...preInfo, volumeNumber };
                handleOpenModal({ ...OPTIONS_MODAL.editChapter }, preInfo);
              }}
            />
          </div>
        </section>
      </Accordion>
    );
  };

  const handleOpenModal = (
    { typeModal, typeValue, mode }: IOptionsModal,
    preInfo?: IPreInfo,
  ) => {
    if (mode === 'create') {
      setInfoEditing({
        title: '',
        volumeNumber: '',
        id: novelId,
      });
    }

    if (preInfo) {
      setInfoEditing({ ...preInfo });
    }

    setTypeModal(typeModal);
    setValue('type', typeValue);
    setModeModal(mode);
    openModal();
  };

  const handleFormSubmit = async (data: InputFormUnifiedVolumeAndChapter) => {
    const formData = new FormData();
    const dataRequest = transformFormDataNovelVolumeAndChapter(data);
    formData.append('obraId', novelId);

    for (const [key, value] of Object.entries(dataRequest)) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }

    const isCreatingVolume = data.type === 'volume' && modeModal === 'create';
    const msg = isCreatingVolume
      ? 'Volume criado com sucesso'
      : 'Volume atualizado com sucesso';

    if (
      data.type === 'volume' &&
      modeModal === 'edit' &&
      infoEditing.idVolume
    ) {
      if (!formData.has('id')) {
        formData.append('id', infoEditing.idVolume);
      }
    }

    const response =
      data.type === 'volume' && modeModal === 'edit'
        ? await updateNovelVolumeFn(formData)
        : await createNovelVolumeFn(formData);

    if (!response.ok) {
      toaster({
        type: 'error',
        msg:
          typeof response.error.message?.title === 'string'
            ? response.error.message.title
            : 'Erro ao criar volume',
      });
      return;
    }

    toaster({
      type: 'success',
      msg,
    });

    reset();
    closeModal();
  };

  const handleDeleteVolume = async (volumeId: string) => {
    if (!volumeData) {
      toaster({
        type: 'error',
        msg: 'Nenhum volume encontrado.',
      });
      return;
    }

    const response = await deleteNovelVolumeFn(volumeId);

    if (!response.ok) {
      toaster({
        type: 'error',
        msg:
          typeof response.error.message?.title === 'string'
            ? response.error.message.title
            : 'Erro ao deletar o volume',
      });
      return;
    }

    toaster({
      type: 'success',
      msg: 'Volume deletado com sucesso',
    });

    reset();
    closeModal();
  };

  const ModalVolume = ({ mode }: { mode: 'edit' | 'create' }) => {
    const isEditing = mode === 'edit';
    return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="2fr grid grid-cols-3 gap-4"
      >
        <DragAndDropSingleImage
          title="Capa Principal"
          name={'cover' as Path<InputFormUnifiedVolumeAndChapter>}
          setValue={setValue}
          errors={errors}
          defaultValue={isEditing ? infoEditing.cover! : ''}
        />
        <div className="col-span-2 mb-2 flex flex-col gap-4">
          <FormInput
            label="Título"
            name="title"
            placeholder="Majo no Tabitabi"
            setValue={setValue}
            errors={errors}
            register={register}
            defaultValue={isEditing ? infoEditing.title! : ''}
          />
          <div className="flex flex-col items-start gap-1">
            <FormInput
              label="Número"
              name="number"
              type="number"
              placeholder="10"
              disabled={watch('oneshot')}
              min={1}
              setValue={setValue}
              errors={errors}
              register={register}
              // defaultValue={
              //   isEditing ? infoEditing.volumeNumber! : undefined
              // }
            />
            <Checkbox
              label="Volume Único ou One-Shot"
              description="Digite '1' no número do volume se usar essa opção"
              name="oneshot"
              // register={register}
            />
          </div>
          <FormTextArea
            label="Descrição"
            name="description"
            cols={30}
            rows={4}
            setValue={setValue}
            errors={errors}
            register={register}
            defaultValue={isEditing ? infoEditing.sinopse! : ''}
          />
        </div>
        <div className="col-span-3 flex flex-col items-center justify-center gap-4">
          <FormButton isSubmitting={isSubmitting} className="col-span-3" />
          {isAdmin && isEditing && (
            <Button
              onClick={() => {
                handleDeleteVolume(infoEditing.idVolume!);
              }}
              className="col-span-3 w-full bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
            >
              Deletar Volume
            </Button>
          )}
        </div>
      </form>
    );
  };

  const ModalChapter = ({ mode }: { mode: 'edit' | 'create' }) => {
    return (
      <>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <FormInput
            label="Título"
            name="title"
            placeholder="Um dia na Tsundoku..."
            setValue={setValue}
            errors={errors}
            register={register}
            defaultValue={mode === 'edit' ? infoEditing.title : ''}
          />
          <FormInput
            label="Volume"
            name="volume"
            type="number"
            placeholder="10"
            min={1}
            setValue={setValue}
            errors={errors}
            register={register}
            defaultValue={
              mode === 'edit' && infoEditing.volumeNumber
                ? infoEditing.volumeNumber
                : ''
            }
          />
          <FormInput
            label="Número"
            name="number"
            type="number"
            placeholder="10"
            min={1}
            setValue={setValue}
            errors={errors}
            register={register}
          />
          <FormInput
            label="Parte"
            name="part"
            type="number"
            placeholder="10"
            min={1}
            setValue={setValue}
            errors={errors}
            register={register}
          />
          <FormInput
            label="Ordem Capítulo"
            name="order"
            type="number"
            placeholder="10"
            min={1}
            setValue={setValue}
            errors={errors}
            register={register}
          />
          {mode === 'edit' ? (
            <div className="col-span-2 flex items-center justify-center gap-4">
              <Button
                disabled={isCreatingOrLoading}
                onClick={() => {
                  onTemplateClick(infoEditing.idChapter || '');
                  closeModal();
                }}
                className="w-full p-1"
              >
                {isCreatingOrLoading ? 'Carregando...' : 'Editar Conteúdo'}
              </Button>
              {isAdmin && (
                <Button
                  disabled={isCreatingOrLoading}
                  onClick={() => {
                    setIsCreatingOrLoading(true);
                    // removeChapter({ documentId: infoEditing.id }).finally(() => {
                    // });
                    setIsCreatingOrLoading(false);

                    toaster({
                      type: 'success',
                      msg: 'Capítulo deletado com sucesso',
                    });

                    closeModal();
                  }}
                  className="w-full bg-red-500 p-1 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
                >
                  {isCreatingOrLoading ? 'Deletando...' : 'Deletar Capítulo'}
                </Button>
              )}
            </div>
          ) : (
            <Button
              disabled={isCreatingOrLoading}
              onClick={() => {
                // onTemplateClick(infoEditing.idChapter || '');
                closeModal();
              }}
              className="col-span-2 w-full p-1"
            >
              {isCreatingOrLoading ? 'Criando...' : 'Criar'}
            </Button>
          )}

          <FormButton isSubmitting={isSubmitting} className="col-span-2" />
        </form>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Title title="Volumes da Obra" className="w-full text-lg" />
        <div className="flex w-full flex-row items-center justify-end gap-3">
          {/* View mode toggle: Grid 1268:29456, Table 1238:713, Accordion */}
          <div
            role="group"
            aria-label="Modo de visualização dos volumes"
            className="flex items-center gap-1 rounded-lg border border-appCardBorder bg-appCardBackground p-1"
          >
            <button
              type="button"
              title="Grade de volumes"
              aria-label="Grade de volumes"
              aria-pressed={volumeViewMode === 'grid'}
              onClick={() => setVolumeViewMode('grid')}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
                volumeViewMode === 'grid'
                  ? 'bg-[#259cc1] text-white shadow-sm'
                  : 'hover:bg-appGroupBackground hover:text-appText',
              )}
            >
              <SquaresFour
                size={16}
                weight={volumeViewMode === 'grid' ? 'fill' : 'regular'}
              />
            </button>
            <button
              type="button"
              title="Tabela de capítulos"
              aria-label="Tabela de capítulos"
              aria-pressed={volumeViewMode === 'table'}
              onClick={() => setVolumeViewMode('table')}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
                volumeViewMode === 'table'
                  ? 'bg-[#259cc1] text-white shadow-sm'
                  : 'hover:bg-appGroupBackground hover:text-appText',
              )}
            >
              <Table
                size={16}
                weight={volumeViewMode === 'table' ? 'fill' : 'regular'}
              />
            </button>
            <button
              type="button"
              title="Lista expansível"
              aria-label="Lista expansível"
              aria-pressed={volumeViewMode === 'accordion'}
              onClick={() => setVolumeViewMode('accordion')}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md text-appSidebarMuted transition-colors',
                volumeViewMode === 'accordion'
                  ? 'bg-[#259cc1] text-white shadow-sm'
                  : 'hover:bg-appGroupBackground hover:text-appText',
              )}
            >
              <Rows
                size={16}
                weight={volumeViewMode === 'accordion' ? 'fill' : 'regular'}
              />
            </button>
          </div>

          {isAdmin && (
            <Button
              onClick={() => {
                handleOpenModal({ ...OPTIONS_MODAL.createVolume });
              }}
              className="py-2 text-xs"
            >
              Adicionar Volume
            </Button>
          )}
          <Button
            onClick={() => {
              handleOpenModal({ ...OPTIONS_MODAL.createChapter });
            }}
            className="py-2 text-xs"
          >
            Adicionar Capítulo
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#a8a8b3]">Carregando volumes...</p>
      ) : !volumeData || volumeData.length === 0 ? (
        <div className="flex h-36 items-center justify-center rounded-[8px] border border-dashed border-[#202024] p-6 text-sm text-[#a8a8b3]">
          Nenhum volume cadastrado para esta obra.
        </div>
      ) : volumeViewMode === 'grid' ? (
        /* Volumes Grid View matching Figma 1268:29456 */
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {volumeData.map((volume) => {
            const preInfo = {
              idVolume: volume.id,
              cover: volume.urlCapaVolume,
              title: volume.tituloVolume,
              volumeNumber: volume.numeroVolume,
              sinopse: volume.sinopse,
              id: novelId,
            };
            return (
              <div
                key={volume.id}
                className="group relative flex aspect-[235/297] w-full max-w-[235px] flex-col overflow-hidden rounded-[8px] bg-[#202024] shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute inset-0 h-full w-full">
                  {volume.urlCapaVolume ? (
                    <Image
                      src={volume.urlCapaVolume}
                      alt={`Volume ${volume.numeroVolume}`}
                      fill
                      sizes="(max-width: 640px) 150px, 235px"
                      className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#18181b] p-4 text-center text-xs text-[#6c757d]">
                      Volume {volume.numeroVolume}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 mt-auto flex flex-col justify-end p-3">
                  <h4 className="line-clamp-1 text-sm font-bold text-[#e1e1e6] sm:text-[16px]">
                    Volume {volume.numeroVolume}
                  </h4>
                  {volume.tituloVolume && (
                    <p className="mt-0.5 truncate text-[11px] text-[#a8a8b3]">
                      {volume.tituloVolume}
                    </p>
                  )}

                  <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2">
                    <button
                      type="button"
                      onClick={() => setVolumeViewMode('accordion')}
                      className="group/btn relative flex flex-1 items-center justify-center gap-1 rounded-[4px] bg-black/60 py-1.5 text-[11px] font-medium text-[#e1e1e6] backdrop-blur-sm transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                    >
                      <BookOpen size={14} weight="bold" />
                      <span>Índice</span>
                      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/btn:opacity-100">
                        Índice
                      </span>
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenModal(
                            { ...OPTIONS_MODAL.editVolume },
                            preInfo,
                          )
                        }
                        className="group/btn relative flex flex-1 items-center justify-center gap-1 rounded-[4px] bg-black/60 py-1.5 text-[11px] font-medium text-[#e1e1e6] backdrop-blur-sm transition-colors hover:bg-[#259cc1] hover:text-[#121214]"
                      >
                        <Pencil size={14} weight="bold" />
                        <span>Editar</span>
                        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-black px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/btn:opacity-100">
                          Editar
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : volumeViewMode === 'table' ? (
        /* Volumes Table View matching Figma 1238:713 */
        <div className="flex flex-col gap-4">
          {volumeData.map((volume) => (
            <div
              key={volume.id}
              className="overflow-hidden rounded-[8px] bg-[#202024] p-4"
            >
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-base font-bold text-[#e1e1e6]">
                  Volume {volume.numeroVolume}{' '}
                  {volume.tituloVolume ? `— ${volume.tituloVolume}` : ''}
                </h4>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      const preInfo = {
                        idVolume: volume.id,
                        cover: volume.urlCapaVolume,
                        title: volume.tituloVolume,
                        volumeNumber: volume.numeroVolume,
                        sinopse: volume.sinopse,
                        id: novelId,
                      };
                      handleOpenModal({ ...OPTIONS_MODAL.editVolume }, preInfo);
                    }}
                    className="flex items-center gap-1 text-xs text-[#259cc1] hover:underline"
                  >
                    <Pencil size={14} />
                    <span>Editar Volume</span>
                  </button>
                )}
              </div>

              <ChapterDocumentsTable
                chapters={volume.listaCapitulos}
                onHandleClick={(preInfo: IPreInfo) => {
                  preInfo = { ...preInfo, volumeNumber: volume.numeroVolume };
                  handleOpenModal({ ...OPTIONS_MODAL.editChapter }, preInfo);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Accordion View (default) */
        <div className="flex flex-col gap-4">
          {volumeData.map((volume) => (
            <VolumeContent
              key={volume.id}
              idVolume={volume.id}
              cover={volume.urlCapaVolume}
              title={volume.tituloVolume}
              volumeNumber={volume.numeroVolume}
              sinopse={volume.sinopse}
              chapters={volume.listaCapitulos}
            />
          ))}
        </div>
      )}

      <Modal
        side
        title={`Edição/Criação de ${typeModal === 'volume' ? 'Volume' : 'Capítulo'}`}
      >
        {typeModal === 'volume' ? (
          <ModalVolume mode={modeModal} />
        ) : (
          <ModalChapter mode={modeModal} />
        )}
      </Modal>
    </div>
  );
};
