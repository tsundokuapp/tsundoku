'use client';

import { useRef, useState } from 'react';

import { Button } from '@/components/shadcn/button';
import { Card, CardContent } from '@/components/shadcn/card';

import { FileDropzone } from './Dropzone';
import { FileList } from './FileList';
import { FormDropzone } from './FormDropzone';

export function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {},
  );

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setFileProgresses((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));
      }, 300);
    });
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (filename: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
    setFileProgresses((prev) => {
      const newProgresses = { ...prev };
      delete newProgresses[filename];
      return newProgresses;
    });
  };

  return (
    <div className="flex items-center justify-center rounded-md bg-appMenuBackground p-2">
      <Card className="bg-background mx-auto w-full max-w-sm rounded-lg p-0 shadow-md">
        <CardContent className="p-0">
          <div className="p-6 pb-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-medium text-appText">
                  Envio rápido de arquivos - Novel
                </h2>
              </div>
            </div>
          </div>
          <FormDropzone />
          <FileDropzone
            fileInputRef={fileInputRef}
            handleBoxClick={handleBoxClick}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
          />
          <FileList
            uploadedFiles={uploadedFiles}
            fileProgresses={fileProgresses}
            removeFile={removeFile}
          />
          <div className="border-border bg-muted flex items-center justify-end rounded-b-lg border-t px-6 py-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-9 px-4 text-sm font-medium"
              >
                Cancelar
              </Button>
              <Button className="h-9 px-4 text-sm font-medium">
                Continuar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
