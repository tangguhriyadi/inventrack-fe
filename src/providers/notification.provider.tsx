"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { notification } from "antd";

interface OpenNotificationProps {
  message: string;
  type: "info" | "success" | "error" | "warning";
  title: string;
}

interface NotificationContextType {
  openNotificationBar: (config: OpenNotificationProps) => void;
}

let globalOpenNotification: (config: OpenNotificationProps) => void;

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationBar = useCallback(
    (config: OpenNotificationProps) => {
      switch (config.type) {
        case "info":
          api.info({
            message: config.title,
            description: config.message,
            placement: "top",
          });
          break;
        case "success":
          api.success({
            message: config.title,
            description: config.message,
            placement: "top",
          });
          break;
        case "warning":
          api.warning({
            message: config.title,
            description: config.message,
            placement: "top",
          });
          break;
        case "error":
          api.error({
            message: config.title,
            description: config.message,
            placement: "top",
          });
          break;
        default:
          break;
      }
    },
    [api],
  );

  // Expose globally
  globalOpenNotification = openNotificationBar;

  const value = useMemo(() => ({ openNotificationBar }), [openNotificationBar]);

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationBar = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

// Export globally accessible notification function
export const getGlobalOpenNotification = () => globalOpenNotification;

export default NotificationProvider;
