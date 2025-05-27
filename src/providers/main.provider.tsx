"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "./theme.provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientConfig } from "@/configs/tanstack.config";
// import { App } from "antd";
import NotificationProvider from "./notification.provider";
import { SessionProvider } from "next-auth/react";
import ModalDialogProvider from "./modal-dialog.provider";

export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientConfig}>
        <AntdRegistry>
          <ThemeProvider>
            <ModalDialogProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </ModalDialogProvider>
          </ThemeProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </SessionProvider>
  );
}
