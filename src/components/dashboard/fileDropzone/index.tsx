"use client";

import { Button } from "@/components/shadcn/button";
import { Card, CardContent } from "@/components/shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { HelpCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FileList } from "./file-list";
import { Form } from "./form";
import { FileDropzone } from "./dropzone";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProgresses, setFileProgresses] = useState<Record<string, number>>(
    {}
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
    <div className="flex items-center justify-center p-2 bg-appMenuBackground rounded-md">
      <Card className="w-full mx-auto max-w-sm bg-background rounded-lg p-0 shadow-md">
        <CardContent className="p-0">
          <div className="p-6 pb-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg text-appText font-medium">
                  Envio rápido de arquivos - Novel
                </h2>
              </div>
            </div>
          </div>
          <Form />
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
          <div className="px-6 py-3 border-t border-border bg-muted rounded-b-lg flex justify-end items-center">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-9 px-4 text-sm font-medium"
              >
                Cancelar
              </Button>
              <Button className="h-9 px-4 text-sm font-medium">Conitnuar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
