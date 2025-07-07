'use client';

import { useState, createContext, ReactNode, useContext } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';

interface ModalProps {
  title?: string;
  description?: string;
  children: ReactNode;
  side?: boolean;
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Modal = ({
    children,
    title,
    description,
    side = false,
  }: ModalProps) => {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} modal={!side}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
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
