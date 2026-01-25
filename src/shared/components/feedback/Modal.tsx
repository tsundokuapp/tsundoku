'use client';

import { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { EnterAnimation } from '@/shared/animations/EnterAnimation';
import { SideAnimation } from '@/shared/animations/SideAnimation';
import { useModal } from '@/shared/contexts/ModalContext';

interface ModalProps {
  title?: string;
  description?: string;
  children: ReactNode;
  side?: boolean;
}

const sideStyles = `!left-auto right-0 top-0 flex h-full max-w-[620px] w-fit !translate-y-0 flex-col border-appHeaderBackground bg-appHeaderBackground transition-transform duration-300 data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 sm:rounded-none`;

export const Modal = ({
  children,
  title,
  description,
  side = false,
}: ModalProps) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  const AnimationWrapper = side ? SideAnimation : EnterAnimation;

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className={side ? sideStyles : ''}>
        <AnimationWrapper>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </AnimationWrapper>
      </DialogContent>
    </Dialog>
  );
};
