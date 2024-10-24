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
  side?: boolean;
}

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  ModalContent: ({ children, title, side }: ModalProps) => ReactNode;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === 'Escape') {
        event.preventDefault();
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

  const ModalContent = ({ children, title, side }: ModalProps) => {
    return (
      isModalOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeModal}
        >
          <ModalWrapper>
            {side ? (
              <ModalSide>{children}</ModalSide>
            ) : (
              <Modal title={title}>{children}</Modal>
            )}
          </ModalWrapper>
        </div>
      )
    );
  };

  const Modal = ({ title, children }: ModalProps) => {
    return (
      <header className="flex flex-col items-center justify-between gap-4">
        <div className="flex h-10 w-full flex-1 flex-row justify-between">
          {title && (
            <h1 className="text-2xl font-bold text-black dark:text-white">
              {title}
            </h1>
          )}

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
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-gray-900">
        {children}
      </div>
    );
  };

  const ModalSide = ({ children }: { children: ReactNode }) => {
    return <div>{children};</div>;
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
