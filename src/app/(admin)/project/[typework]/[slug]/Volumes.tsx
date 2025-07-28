'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IVolumeNovelData } from '@/@types/Api';
import { ChapterDocumentsTable } from '@/components/admin/table/ChapterDocumentsTable';
import { Accordion } from '@/components/common/Accordion';
import { Title } from '@/components/common/Title';
import { Button } from '@/components/common/button/Button';
import { Checkbox } from '@/components/common/checkbox/Checkbox';
import {
  DragAndDropSingleImage,
  FormButton,
  FormInput,
  FormTextArea,
} from '@/components/common/form';
import { useModal } from '@/contexts/ModalContext';
import { useToaster } from '@/contexts/ToasterContext';
import {
  InputFormUnifiedVolumeAndChapter,
  unifiedVolumeAndChapterSchema,
} from '@/helpers/Schemas';
import { transformFormDataNovelVolumeAndChapter } from '@/helpers/TransformFormData';
import { useVolumesNovel } from '@/hooks/usePublicApi';
import { createNovelVolume, deleteNovelVolume } from '@/services/NovelService';

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
  contentChapter?: string; // usado para editar o conteúdo do capítulo
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

  const { Modal, openModal, closeModal } = useModal();
  const { toaster } = useToaster();
  const [typeModal, setTypeModal] = useState<'volume' | 'chapter'>('volume');
  const [modeModal, setModeModal] = useState<'create' | 'edit'>('create');
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

  const { mutateAsync: deleteNovelVolumeFn } = useMutation({
    mutationFn: deleteNovelVolume,
  });

  useEffect(() => {
    if (volumesNovelResponse?.data) {
      setVolumeData(volumesNovelResponse?.data);
    }
  }, [volumesNovelResponse?.data]);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreatingOrLoading(true);
    console.log('Creating chapter with title:', title, initialContent);
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
                <p className="text-xs">Editar</p>
                <Pencil size={16} />
              </Button>
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
      if (key === 'cover' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    }

    const isCreatingVolume = data.type === 'volume' && modeModal === 'create';
    let msg = '';
    let response;

    if (isCreatingVolume) {
      response = await createNovelVolumeFn(formData);
      msg = 'Volume criado com sucesso';
    }

    if (response?.statusCode === 400) {
      toaster({
        type: 'error',
        msg:
          typeof response.message === 'string'
            ? response.message
            : response.message?.title || 'Erro ao criar a novel',
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

    if (response?.statusCode === 400) {
      toaster({
        type: 'error',
        msg:
          typeof response.message === 'string'
            ? response.message
            : response.message?.title || 'Erro ao criar a novel',
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
          name="cover"
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
              register={register}
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
          <Button
            onClick={() => {
              handleDeleteVolume(infoEditing.idVolume!);
            }}
            className="col-span-3 w-full bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-300"
          >
            Deletar Volume
          </Button>
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
                  onTemplateClick(
                    infoEditing.title,
                    infoEditing.contentChapter ?? '',
                  );
                  closeModal();
                }}
                className="w-full p-1"
              >
                {isCreatingOrLoading ? 'Carregando...' : 'Editar Conteúdo'}
              </Button>
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
            </div>
          ) : (
            <Button
              disabled={isCreatingOrLoading}
              onClick={() => {
                onTemplateClick('Título do Capítulo', '');
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
      <div className="mt-2 flex flex-row items-center justify-between gap-4">
        <Title title="Nome da obra" className="w-full text-lg" />
        <div className="flex w-full flex-row justify-end gap-2">
          <Button
            onClick={() => {
              console.log('apertado');
              handleOpenModal({ ...OPTIONS_MODAL.createVolume });
            }}
            className="py-2 text-xs"
          >
            Adicionar Volume
          </Button>
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
        <p>Carregando...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {volumeData?.map((volume) => (
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
