import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import { Notification } from "@/components/Notification";

interface INotificationContext {
  type: "success" | "error" | "warning" | "info";
  title: string;
  description: string;
  onClose?: () => void;
  onMore?: () => void;
  id?: string;
}

interface INotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationContext = createContext<unknown>(() => {
  throw new Error(
    "NotificationContext must be used inside NotificationProvider",
  );
});

export const useNotify = () => {
  const notify = useContext(NotificationContext) as (
    notification: INotificationContext,
  ) => void;

  if (!notify) {
    throw new Error("useNotify must be used inside NotificationProvider");
  }

  return notify;
};

const NotificationsContainer = styled.div`
  position: fixed;
  z-index: 9999;
  top: 16px;
  right: 16px;
  pointer-events: none;
`;

const useCreateDomElement = () => {
  const [domElement, setDomElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    setDomElement(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);

  return domElement;
};

function useNotification() {
  const [notifications, setNotifications] = useState<INotificationContext[]>(
    [],
  );

  // const useTimer = (time: number = 400) => {
  //   // esse timer tá proximo de 4 segundos, porém o processamento do react é mais lento.
  //   // não adianta mudar os parametros do timer, pois o react não vai conseguir renderizar mais rápido.
  //   const [timer, setTimer] = useState(time);
  //   const id = useRef<number>(0);

  //   const clear = () => {
  //     window.clearInterval(id.current);
  //   };
  //   useEffect(() => {
  //     id.current = window.setInterval(() => {
  //       setTimer((time) => time - 1);
  //     }, 10);
  //     return () => clear();
  //   }, []);

  //   useEffect(() => {
  //     if (timer <= 0) {
  //       clear();
  //     }
  //   }, [timer]);

  //   const percent = Math.floor((timer / time) * 100);
  //   const inversePercent = 100 - percent;

  //   return {
  //     originalTime: time,
  //     timer,
  //     percent,
  //     inversePercent,
  //   };
  // };

  const notify = useCallback(
    ({ type, title, description, onMore }: INotificationContext) => {
      const id = uuidv4();

      const removeNotification = () => {
        setNotifications((notifications) =>
          notifications.filter((item) => item.id !== id),
        );
      };

      const newNotification = {
        id,
        type,
        title,
        description,
        onMore,
        onClose: removeNotification,
      };

      setNotifications((notifications) => [...notifications, newNotification]);

      setTimeout(removeNotification, 3000);
    },
    [],
  );

  return { notify, notifications };
}

const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const notificationRoot = useCreateDomElement();
  const { notify, notifications } = useNotification();

  return (
    <>
      <NotificationContext.Provider value={notify}>
        {children}
      </NotificationContext.Provider>
      {notificationRoot &&
        createPortal(
          <NotificationsContainer>
            <AnimatePresence>
              {notifications.map((notification) => (
                <Notification key={notification.id} {...notification} />
              ))}
            </AnimatePresence>
          </NotificationsContainer>,
          notificationRoot,
        )}
    </>
  );
};

export default NotificationProvider;
