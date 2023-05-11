import React, { createContext, useCallback, useContext, useState } from "react";
import { SideMenuMobile } from "@/components/Heading/SideMenu";

interface IModalContext {
  closeModal: () => void;
  openModal: () => void;
  modalOpen: boolean;
}

interface IModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalOpen }}>
      <SideMenuMobile />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
