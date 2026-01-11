import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/shadcn/button';

interface UploadedFileItemProps {
  file: File;
  progress: number;
  onRemove: (filename: string) => void;
}

export function UploadedFileItem({
  file,
  progress,
  onRemove,
}: UploadedFileItemProps) {
  const imageUrl = URL.createObjectURL(file);

  useEffect(() => {
    return () => URL.revokeObjectURL(imageUrl);
  }, [imageUrl]);

  return (
    <div
      className="border-border flex flex-col rounded-lg border bg-appBackground p-2"
      key={file.name}
    >
      <div className="flex items-center gap-2">
        <div className="w-18 bg-muted row-span-2 flex h-14 items-center justify-center self-start overflow-hidden rounded-sm">
          <img
            src={imageUrl}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1 pr-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="max-w-[250px] truncate text-sm text-appText">
                {file.name}
              </span>
              <span className="whitespace-nowrap text-sm text-appText">
                {Math.round(file.size / 1024)} KB
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="bg-transparent! h-8 w-8 text-appText hover:text-red-500"
              onClick={() => onRemove(file.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
              <div
                className="h-full bg-appHeaderHighlight"
                style={{
                  width: `${progress || 0}%`,
                }}
              ></div>
            </div>
            <span className="whitespace-nowrap text-xs text-appText">
              {Math.round(progress || 0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
