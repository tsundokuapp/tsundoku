import React, { createContext, useState, useCallback, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

type groupType =
  | "reader"
  | "staff"
  | "admin"
  | "padrim"
  | "all"
  | "bruxa-errante";
interface IWarningContext {
  group: groupType;
  isImportant: boolean;
  msg: string;
  id?: string;
  deleteWarning?: () => void;
}

interface IWarningProviderProps {
  children: React.ReactNode;
}
const WarningContext = createContext<{
  warn: ({ group, isImportant, msg }: IWarningContext) => void;
  warnings: IWarningContext[];
}>({
  warn: () => {
    throw new Error("warn function must be used within a WarningProvider");
  },
  warnings: [],
});

export const useWarn = () => {
  const context = useContext(WarningContext);

  if (!context) {
    throw new Error("useWarn must be used within a WarningProvider");
  }

  return context;
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
