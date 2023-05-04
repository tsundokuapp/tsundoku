import React, { createContext, useCallback, useContext, useState } from "react";
import { SideMenuMobile } from "@/components/Heading/SideMenu";

interface IModalContext {
  toggleMenu: () => void;
}

interface IModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({} as IModalContext);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ toggleMenu }}>
      <SideMenuMobile externalController={isOpen} />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
