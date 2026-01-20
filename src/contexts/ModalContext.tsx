'use client';

import { useState, createContext, ReactNode, useContext } from 'react';

import { EnterAnimation } from '@/animation/EnterAnimation';
import { SideAnimation } from '@/animation/SideAnimation';
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

  const sideStyles = `!left-auto right-0 top-0 flex h-full max-w-[620px] w-fit !translate-y-0 flex-col border-appHeaderBackground bg-appHeaderBackground transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:rounded-none`;

  const Modal = ({
    children,
    title,
    description,
    side = false,
  }: ModalProps) => {
    return (
      <>
        {side ? (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className={side ? sideStyles : ''}>
              <SideAnimation>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  {description && (
                    <DialogDescription>{description}</DialogDescription>
                  )}
                </DialogHeader>
                {children}
              </SideAnimation>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className={side ? sideStyles : ''}>
              <EnterAnimation>
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  {description && (
                    <DialogDescription>{description}</DialogDescription>
                  )}
                </DialogHeader>
                {children}
              </EnterAnimation>
            </DialogContent>
          </Dialog>
        )}
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
