'use client';

import { useContext, createContext, ReactNode } from 'react';
import { toast, Toaster } from 'sonner';

type ToasterValues =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'message'
  | 'action'
  | 'promise'
  | 'custom';

interface IToaster {
  title?: string;
  msg: string;
  type?: ToasterValues;
  labelButton?: string;
  fn?: () => void;
  promise?: Promise<unknown>;
  msgLoading?: string;
  msgSuccess?: string;
  msgError?: string;
  children?: ReactNode;
}

interface IToasterContext {
  toaster: (props: IToaster) => void;
}

const ToasterContext = createContext<IToasterContext>({} as IToasterContext);

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const toaster = ({
    title,
    msg,
    type = 'message',
    labelButton,
    fn,
    promise,
    msgLoading,
    msgSuccess,
    msgError,
    children,
  }: IToaster) => {
    const toastMethods = {
      success: toast.success,
      error: toast.error,
      warning: toast.warning,
      info: toast.info,
      // Casos especiais
      message: toast.message,
      promise: toast.promise,
      action: toast.message,
      custom: toast.message,
    };

    const toastMethod = toastMethods[type];
    if (toastMethod === undefined) {
      console.error(`Invalid toast type: ${type}`);
      return;
    }

    const toastPureMessage = ['success', 'info', 'warning', 'error'];

    if (toastPureMessage.includes(type)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return toastMethod(msg as any);
    }

    if (type === 'message') {
      return toast.message(title, {
        description: msg,
      });
    }

    if (type === 'action') {
      return toast(title, {
        action: {
          label: labelButton,
          onClick: () => {
            fn?.();
          },
        },
      });
    }

    if (type === 'promise') {
      toast.promise(promise!, {
        loading: msgLoading,
        success: msgSuccess,
        error: msgError,
      });
    }

    if (type === 'custom') {
      toast(<>{children}</>);
    }
  };

  return (
    <ToasterContext.Provider value={{ toaster }}>
      <Toaster position="top-right" richColors />
      {children}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => useContext(ToasterContext);
