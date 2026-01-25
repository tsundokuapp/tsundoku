import { Image as IconImage } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { Modal } from '@/shared/components/feedback/Modal';
import { DropdownContainer } from '@/shared/components/ui/dropdown/DropdownContainer';
import { DropdownOption } from '@/shared/components/ui/dropdown/DropdownOption';
import { useModal } from '@/shared/contexts/ModalContext';

import { useEditorStore } from '../../store/useEditorStore';

export const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState('');
  const { openModal, closeModal } = useModal();

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl('');
      closeModal();
    }
  };

  const LabelButton = () => {
    return <IconImage size={16} />;
  };

  const options = [
    { label: 'Carregar Imagem', onClick: onUpload },
    { label: 'Colar URL da Imagem', onClick: () => openModal() },
  ];

  return (
    <>
      <DropdownContainer isButton label={<LabelButton />} value={imageUrl}>
        {options.map(({ label, onClick }) => (
          <DropdownOption
            key={label}
            label={label}
            onClick={onClick}
            value={label} // não necessário, mas exigido pelo DropdownOption
          />
        ))}
      </DropdownContainer>
      <Modal title="Upload de Imagem">
        <div className="mb-4">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit();
              }
            }}
            placeholder="Cole a URL da imagem aqui"
            className="w-full rounded border border-gray-300 p-2"
          />
          <button
            className="mt-2 w-full rounded bg-blue-500 px-4 py-2 text-appText hover:bg-blue-600"
            onClick={handleImageUrlSubmit}
          >
            Adicionar Imagem
          </button>
        </div>
      </Modal>
    </>
  );
};
