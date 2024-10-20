'use client';

import { X } from '@phosphor-icons/react/dist/ssr';
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

interface ModalProps {
  title?: string;
  children: ReactNode;
}

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  ModalContent: ({ children, title }: ModalProps) => ReactNode;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalContent = ({ children, title }: ModalProps) => {
    return (
      isModalOpen && (
        <div
          className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModal}
        >
          <ModalWrapper>
            <ModalHeader title={title}>{children}</ModalHeader>
          </ModalWrapper>
        </div>
      )
    );
  };

  const ModalHeader = ({ title, children }: ModalProps) => {
    return (
      <header className="flex flex-col items-center justify-between">
        <div className="flex h-10 w-full flex-1 flex-row justify-between gap-8">
          {title && <h1 className="text-2xl font-bold text-black">{title}</h1>}

          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>
        {children}
      </header>
    );
  };

  const ModalWrapper = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex h-fit w-fit flex-col items-center justify-center rounded-lg bg-white p-8">
        {children}
      </div>
    );
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, ModalContent }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
