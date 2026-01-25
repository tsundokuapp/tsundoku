import { Upload } from 'lucide-react';
import React, { RefObject } from 'react';

interface FileDropzoneProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
}

export function FileDropzone({
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
}: FileDropzoneProps) {
  return (
    <div className="px-6">
      <div
        className="border-border flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-appInputPlaceholder p-2 text-center"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="bg-muted mb-2 rounded-full p-3">
          <Upload className="h-5 w-5 text-appInputPlaceholder" />
        </div>
        <p className="text-sm font-medium text-appInputPlaceholder">
          Envie arquivos arrastando e soltando aqui
        </p>
        <p className="mt-1 text-sm text-appInputPlaceholder">
          ou{' '}
          <label
            htmlFor="fileUpload"
            className="cursor-pointer font-medium text-appInputPlaceholder hover:text-appText"
            onClick={(e) => e.stopPropagation()}
          >
            clique para selecionar
          </label>{' '}
          (4MB max)
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}
