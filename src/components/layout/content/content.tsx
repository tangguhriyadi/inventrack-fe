"use client";

import React from "react";
import useAppLayoutStore from "@/store/app-layout";
import { cn } from "@/utils/cn";

interface ContentLayoutProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentLayoutProps> = ({ children }) => {
  const { isHideSidebar, isCollapsed } = useAppLayoutStore();

  const sidebarHideStyle = {
    height: "calc(100vh - 72px)",
    maxHeight: "calc(100vh - 64px)",
    width: "calc(100vw - 8px)",
  };
  const sidebarNotHideStyle = {
    height: "calc(100vh - 72px)",
    maxHeight: "calc(100vh - 64px)",
    width: isCollapsed ? "calc(100vw - 88px)" : "calc(100vw - 288px)",
  };

  return (
    <main
      className={cn(
        "overflow-y-hidden overflow-x-hidden transition-all duration-300 z-20 bg-neutral-98 rounded-[18px] !pb-4 !pt-4",
        isHideSidebar && "!ml-0",
      )}
      style={isHideSidebar ? sidebarHideStyle : sidebarNotHideStyle}
    >
      <div className="pl-4 pr-2 pb-2 h-full overflow-y-auto overflow-x-hidden main-scroll">
        {children}
      </div>
    </main>
  );
};

export default Content;
