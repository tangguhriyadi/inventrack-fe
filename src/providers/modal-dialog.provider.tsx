"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Modal, App as AntApp } from "antd";

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

  const openModalDialogBar = useCallback((config: OpenModalDialogProps) => {
    let loading = false;

    const modal = Modal.confirm({
      title: config.title,
      content: config.message,
      type: config.type,
      okText: config.okText ?? "OK",
      cancelText: config.cancelText ?? "Cancel",
      okButtonProps: { loading: false },
      onOk: async () => {
        if (loading) return;
        try {
          loading = true;
          modal.update({ okButtonProps: { loading: true } });
          if (config.onOk) await config.onOk();
          modal.destroy(); // Close modal after success
        } catch {
          // Optionally handle error
          modal.update({ okButtonProps: { loading: false } });
          loading = false;
          console.error(api.error);
          return Promise.reject(); // Prevent modal from closing
        }
      },
    });
    //eslint-disable-next-line
  }, []);
  const value = useMemo(() => ({ openModalDialogBar }), [openModalDialogBar]);

  return (
    <AntApp>
      <ModalDialogContext.Provider value={value}>
        {contextHolder}
        {children}
      </ModalDialogContext.Provider>
    </AntApp>
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
