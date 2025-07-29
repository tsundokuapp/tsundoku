import { CloudCheck, Spinner } from '@phosphor-icons/react/dist/ssr';
import { useRef, useState } from 'react';

import { useToaster } from '@/contexts/ToasterContext';
import { Debounce } from '@/helpers/Debounce';
import { updateChapterNovel } from '@/services/NovelService';

interface IDocumentInputProps {
  id: string;
  title: string;
}

export const DocumentInput = ({ id, title }: IDocumentInputProps) => {
  const [value, setValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { toaster } = useToaster();

  const debounceUpdate = Debounce((newValue: string) => {
    if (newValue === title) return;
    const formData = new FormData();
    formData.append('titulo', newValue);

    setIsPending(true);
    updateChapterNovel(id, formData)
      .then(() => {
        toaster({
          type: 'success',
          msg: 'Título atualizado com sucesso',
        });
      })
      .catch(() => {
        toaster({
          type: 'error',
          msg: `Erro ao atualizar o título`,
        });
      })
      .finally(() => {
        setIsPending(false);
      });
  }, 300);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', value);

    updateChapterNovel(id, formData)
      .then(() => {
        toaster({
          type: 'success',
          msg: 'Título atualizado com sucesso',
        });
        setIsEditing(false);
      })
      .catch(() => {
        toaster({
          type: 'error',
          msg: `Erro ao atualizar o título`,
        });
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg text-appText">
            {value || ''}
          </span>
          <input
            ref={inputRef}
            type="text"
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            className="absolute inset-0 truncate bg-transparent px-1.5 text-lg text-appText"
          ></input>
        </form>
      ) : (
        <>
          <span
            className="cursor-pointer truncate px-1.5 text-lg text-appText"
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            {title}
          </span>
          {isPending ? (
            <Spinner size={24} className="animate-spin text-appText" />
          ) : (
            <CloudCheck size={24} className="text-appText" />
          )}
        </>
      )}
    </div>
  );
};
