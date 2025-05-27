"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Modal } from "antd";

interface OpenModalDialogProps {
  message: string;
  type: "info" | "success" | "error" | "warning";
  title: string;
  onOk?: () => void;
  cancelText?: string;
  okText?: string;
  isLoading?: boolean;
}

interface ModalContextType {
  openModalDialogBar: (config: OpenModalDialogProps) => void;
}

const ModalDialogContext = createContext<ModalContextType | undefined>(
  undefined,
);

const ModalDialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [api, contextHolder] = Modal.useModal();

  const openModalDialogBar = useCallback(
    (config: OpenModalDialogProps) => {
      switch (config.type) {
        case "info":
          api.info({
            title: config.title,
            content: config.message,
            onOk: config.onOk,
            cancelText: config.cancelText,
            okCancel:
              config.cancelText && config.cancelText.length > 0 ? true : false,
            okText: config.okText ?? "OK",
            okButtonProps: {
              loading: config.isLoading,
            },
          });
          break;
        case "success":
          api.success({
            title: config.title,
            content: config.message,
            onOk: config.onOk,
            cancelText: config.cancelText,
            okCancel:
              config.cancelText && config.cancelText.length > 0 ? true : false,
            okText: config.okText ?? "OK",
            okButtonProps: {
              loading: config.isLoading,
            },
          });
          break;
        case "warning":
          api.warning({
            title: config.title,
            content: config.message,
            onOk: config.onOk,
            cancelText: config.cancelText,
            okCancel:
              config.cancelText && config.cancelText.length > 0 ? true : false,
            okText: config.okText ?? "OK",
            okButtonProps: {
              loading: config.isLoading,
            },
          });
          break;
        case "error":
          api.error({
            title: config.title,
            content: config.message,
            onOk: config.onOk,
            cancelText: config.cancelText,
            okCancel:
              config.cancelText && config.cancelText.length > 0 ? true : false,
            okText: config.okText ?? "OK",
            okButtonProps: {
              loading: config.isLoading,
            },
          });
          break;
        default:
          break;
      }
    },
    [api],
  );

  const value = useMemo(() => ({ openModalDialogBar }), [openModalDialogBar]);

  return (
    <ModalDialogContext.Provider value={value}>
      {contextHolder}
      {children}
    </ModalDialogContext.Provider>
  );
};

export const useModalDialog = () => {
  const context = useContext(ModalDialogContext);
  if (!context) {
    throw new Error("useModalDialog must be used within a ModalDialogProvider");
  }
  return context;
};

// Export globally accessible notification function
export default ModalDialogProvider;
