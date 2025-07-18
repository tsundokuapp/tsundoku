import { ErrorMessage } from '@hookform/error-message';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';

import { useToaster } from '@/contexts/ToasterContext';
import { ValidateVerticalImage } from '@/helpers/ValidateVerticalImage';

interface DragAndDropSingleImageProps {
  title: string;
  name: string;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors;
  defaultValue: string;
}

export const DragAndDropSingleImage = ({
  title,
  name,
  setValue,
  errors,
  defaultValue,
}: DragAndDropSingleImageProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (defaultValue !== '' && !image) {
    setImage({
      src: defaultValue,
      name: 'default-image',
    } as HTMLImageElement);
  }

  const { toaster } = useToaster();

  const selectFile = () => {
    fileInputRef.current?.click();
  };

  async function onFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const notImage = file.type !== 'image/png' && file.type !== 'image/jpeg';

    if (notImage) {
      return toaster({
        type: 'error',
        msg: 'Apenas imagens PNG ou JPG são aceitas.',
      });
    }

    const isVertical = await ValidateVerticalImage(file);
    if (!isVertical) {
      return toaster({
        type: 'error',
        msg: 'A imagem deve ser vertical.',
      });
    }

    setImage({
      src: URL.createObjectURL(file),
      name: file.name,
    } as HTMLImageElement);

    setValue(name, file);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  async function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    const notImage = file.type !== 'image/png' && file.type !== 'image/jpeg';
    if (notImage) return;

    const isVertical = await ValidateVerticalImage(file);
    if (!isVertical) {
      return toaster({
        type: 'error',
        msg: 'A imagem deve ser vertical.',
      });
    }

    setImage({
      src: URL.createObjectURL(file),
      name: file.name,
    } as HTMLImageElement);

    setValue(name, file);
  }

  function onDeleteFile() {
    setImage(null);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="relative flex h-[300px] w-52 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-2"
        id="dropzone"
      >
        {image ? (
          <div
            className="group relative flex flex-col overflow-hidden rounded-md"
            id="preview"
          >
            <strong
              role="button"
              onClick={onDeleteFile}
              className="transation absolute z-10 mx-auto hidden h-full w-full flex-col items-center justify-center gap-2 bg-appBackground bg-opacity-50 text-appText group-hover:flex"
            >
              <span>{title}</span>
              <span className="flex flex-row items-center text-red-500">
                <Trash size={24} />
                Excluir
              </span>
            </strong>

            <Image
              src={image.src}
              alt={image.name}
              className="w-48 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
              width={180}
              height={256}
            />
          </div>
        ) : (
          <>
            <input
              type="file"
              name={name}
              ref={fileInputRef}
              onChange={onFileSelect}
              className="absolute inset-0 z-50 h-full w-full opacity-0 hover:cursor-pointer"
            />
            <div className="text-center">
              {isDragging ? (
                <>
                  <Image
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt=""
                    width={48}
                    height={48}
                  />
                  <h3 className="mt-2 text-sm font-medium text-appSubtitle">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span>Solte a imagem aqui</span>
                    </label>
                  </h3>
                </>
              ) : (
                <>
                  <Image
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt=""
                    width={48}
                    height={48}
                  />

                  <h3 className="mt-2 text-sm font-medium text-appSubtitle">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer"
                    >
                      <span>Arraste e solte </span>
                      <span
                        className="text-primary"
                        role="button"
                        onClick={selectFile}
                      >
                        {' '}
                        ou clique{' '}
                      </span>
                      <span>para carregar</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </h3>
                  <p className="mt-1 text-xs text-appSubtitle">
                    PNG e JPG até 5MB
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-red-400">
        <ErrorMessage errors={errors} name={name} />
      </p>
    </div>
  );
};
