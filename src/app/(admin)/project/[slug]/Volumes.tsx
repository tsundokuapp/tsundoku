'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { formVolumesSchema, formChapterSchema } from '@/helpers/Schemas';
import { ChaptersList } from '@/helpers/Util';

export const Volumes = () => {
  const { Modal, openModal, closeModal } = useModal();
  const { toaster } = useToaster();
  const [typeModal, setTypeModal] = useState<'volume' | 'chapter'>('volume');

  const router = useRouter();

  const unifiedSchema = z.discriminatedUnion('type', [
    formVolumesSchema,
    formChapterSchema,
  ]);

  type InputFormUnified = z.infer<typeof unifiedSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<InputFormUnified>({
    resolver: zodResolver(unifiedSchema),
  });

  const OrderByNumber = () => {
    return (
      <div className="mt-6 grid grid-cols-2 gap-2">
        {[...ChaptersList]
          .sort((a, b) => {
            const getNumber = (str: string) => {
              const match = str.match(/\d+/);
              return match ? parseInt(match[0], 10) : 0;
            };

            return getNumber(a.name) - getNumber(b.name);
          })
          .map((item) => (
            <Button
              key={item.id}
              onClick={() =>
                router.push('/project/majo-no-tabitabi/capitulo-01')
              }
            >
              {item.name}
            </Button>
          ))}
      </div>
    );
  };

  const handleFormSubmit = (data: InputFormUnified) => {
    const promisse = new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);

        if (data.type === 'volume') {
          toaster({
            type: 'success',
            msg: 'Volume adicionado com sucesso',
          });
        } else {
          toaster({
            type: 'success',
            msg: 'Capítulo adicionado com sucesso',
          });
        }

        closeModal();
        resolve(data);
      }, 2000);
    });

    return promisse;
  };

  const ModalVolume = () => {
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
        />
        <div className="col-span-2 mb-2 flex flex-col gap-4">
          <FormInput
            label="Título"
            name="title"
            placeholder="Majo no Tabitabi"
            setValue={setValue}
            errors={errors}
            register={register}
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
          />
        </div>
        <FormButton isSubmitting={isSubmitting} className="col-span-3" />
      </form>
    );
  };

  const ModalChapter = () => {
    return (
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
        <FormButton isSubmitting={isSubmitting} className="col-span-2" />
      </form>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-2 flex flex-row items-center justify-between gap-4">
        <Title title="Nome da obra" className="w-full text-lg" />
        <div className="flex w-full flex-row justify-end gap-2">
          <Button
            onClick={() => {
              setTypeModal('volume');
              setValue('type', 'volume');
              openModal();
            }}
            className="py-2 text-xs"
          >
            Adicionar Volume
          </Button>
          <Button
            onClick={() => {
              setTypeModal('chapter');
              setValue('type', 'chapter');
              openModal();
            }}
            className="py-2 text-xs"
          >
            Adicionar Capítulo
          </Button>
        </div>
      </div>
      <Accordion
        title="Volume 01"
        className="dark:bg-bgDark"
        classNameItems="hover:dark:bg-hoverBgDark"
      >
        <section className="flex flex-row gap-4">
          <div className="relative flex flex-col items-center justify-start gap-4">
            <Image
              src="/cover-seven.webp"
              alt="cover"
              className="w-48 min-w-48 rounded-md"
              width={180}
              height={256}
            />
            <Button
              onClick={() => {
                setTypeModal('volume');
                setValue('type', 'volume');
                openModal();
              }}
              className="gap-2"
            >
              Editar Volume
              <Pencil size={20} />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex flex-row items-center gap-2">
              <h3 className="text-lg font-bold">Volume 01:</h3>
              <p>Título capítulo</p>
            </span>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulput ate commodo lectus, ac blandit elit tincidunt id. Sed
              rhoncus, tortor sed eleifend tristique, tortor mauris auctor
              lorem, eu vehicula. adipiscing elit. Nulla quam velit, vulputate
              eu pharetra nec, mattis ac neque. Duis vulput ate commodo lectus,
              ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend
              tristique, tortor mauris auctor lorem, eu vehicula.
            </p>

            <OrderByNumber />
          </div>
        </section>
      </Accordion>
      <Accordion
        title="Volume 02"
        className="dark:bg-bgDark"
        classNameItems="hover:dark:bg-hoverBgDark"
      >
        <section className="flex flex-row gap-4">
          <div className="relative flex flex-col">
            <Image
              src="/cover-seven.webp"
              alt="cover"
              className="w-48 min-w-48 rounded-md"
              width={180}
              height={256}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex flex-row items-center gap-2">
              <h3 className="text-lg font-bold">Volume 01:</h3>
              <p>Título capítulo</p>
            </span>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulput ate commodo lectus, ac blandit elit tincidunt id. Sed
              rhoncus, tortor sed eleifend tristique, tortor mauris auctor
              lorem, eu vehicula. adipiscing elit. Nulla quam velit, vulputate
              eu pharetra nec, mattis ac neque. Duis vulput ate commodo lectus,
              ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend
              tristique, tortor mauris auctor lorem, eu vehicula.
            </p>

            <OrderByNumber />
          </div>
        </section>
      </Accordion>
      <Accordion
        title="Volume 03"
        className="dark:bg-bgDark"
        classNameItems="hover:dark:bg-hoverBgDark"
      >
        <section className="flex flex-row gap-4">
          <div className="relative flex flex-col">
            <Image
              src="/cover-seven.webp"
              alt="cover"
              className="w-48 min-w-48 rounded-md"
              width={180}
              height={256}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex flex-row items-center gap-2">
              <h3 className="text-lg font-bold">Volume 01:</h3>
              <p>Título capítulo</p>
            </span>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulput ate commodo lectus, ac blandit elit tincidunt id. Sed
              rhoncus, tortor sed eleifend tristique, tortor mauris auctor
              lorem, eu vehicula. adipiscing elit. Nulla quam velit, vulputate
              eu pharetra nec, mattis ac neque. Duis vulput ate commodo lectus,
              ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend
              tristique, tortor mauris auctor lorem, eu vehicula.
            </p>

            <OrderByNumber />
          </div>
        </section>
      </Accordion>
      <Modal
        title={`Edição/Criação de ${typeModal === 'volume' ? 'Volume' : 'Capítulo'}`}
        className="dark:bg-slate-800"
      >
        {typeModal === 'volume' ? <ModalVolume /> : <ModalChapter />}
      </Modal>
    </div>
  );
};
