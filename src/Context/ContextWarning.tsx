import React, { createContext, useState, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

interface IWarningContext {
  group: "reader" | "staff" | "admin" | "padrim" | "all";
  isImportant: boolean;
  msg: string;
  id?: string;
  deleteWarning?: () => void;
}

interface IWarningProviderProps {
  children: React.ReactNode;
}

export const WarningContext = createContext<unknown>(() => {
  throw new Error("WarningContext must be used inside WarningProvider");
});

export const useWarn = () => {
  const warn = useContext(WarningContext) as (warning: IWarningContext) => void;

  if (!warn) {
    throw new Error("useWarn must be used inside WarningProvider");
  }

  return warn;
};

function useWarning() {
  const [warnings, setWarnings] = useState<IWarningContext[]>([]);

  const warn = useCallback(({ group, isImportant, msg }: IWarningContext) => {
    const id = uuidv4();

    const removeWarning = () => {
      setWarnings((warnings) => warnings.filter((item) => item.id !== id));
    };

    const newWarning = {
      id,
      group,
      isImportant,
      msg,
      deleteWarning: removeWarning,
    };

    setWarnings((warnings) => [...warnings, newWarning]);
  }, []);

  return { warn, warnings };
}

const WarningProvider = ({ children }: IWarningProviderProps) => {
  const { warn, warnings } = useWarning();

  return (
    <WarningContext.Provider value={{ warn, warnings }}>
      {children}
    </WarningContext.Provider>
  );
};

export default WarningProvider;
