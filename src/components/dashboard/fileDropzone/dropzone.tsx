import { Upload } from "lucide-react";
import React, { RefObject } from "react";

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
        className="border-2 border-dashed border-border rounded-md p-2 flex flex-col items-center justify-center text-center cursor-pointer border-appInputPlaceholder"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mb-2 bg-muted rounded-full p-3">
          <Upload className="h-5 w-5 text-appInputPlaceholder" />
        </div>
        <p className="text-sm font-medium text-appInputPlaceholder">
          Envie arquivos arrastando e soltando aqui
        </p>
        <p className="text-sm text-appInputPlaceholder mt-1">
          ou{" "}
          <label
            htmlFor="fileUpload"
            className="text-appInputPlaceholder hover:text-appText font-medium cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            clique para selecionar
          </label>{" "}
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
      </div >
    </div >
  );
}
