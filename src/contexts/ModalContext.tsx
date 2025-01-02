'use client';

import { X } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
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
  Modal: ({ children, title }: ModalProps) => ReactNode;
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

  const Modal = ({ children, title }: ModalProps) => {
    return (
      <>
        {isModalOpen ? (
          <div
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'flex-end',
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 1, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: 300 }}
              transition={{ duration: 0.3, type: 'easeInOut' }}
            >
              <div
                className="flex h-full min-h-96 w-full max-w-[700px] flex-col gap-4 rounded-lg border-2 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b-[1px]">
                  <h2 className="dark:text-default-textDark text-xl font-bold">
                    {title}
                  </h2>
                  <button onClick={closeModal}>
                    <X size={24} className="transition hover:scale-125" />
                  </button>
                </div>
                {children}
              </div>
            </motion.div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, Modal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
