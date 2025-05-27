"use client";
import { BreadcrumbProps } from "antd";
import { create } from "zustand";

type AppLayoutStoreValue = {
  isCollapsed: boolean;
  isHideSidebar: boolean;
  setIsHideSidebar: (val: boolean) => void;
  toggleIsCollapsed: () => void;
  breadcrumbItems: BreadcrumbProps["items"];
  setBreadcrumbItems: (items: BreadcrumbProps["items"]) => void;
};

const useAppLayoutStore = create<AppLayoutStoreValue>((set) => ({
  isCollapsed: false,
  isHideSidebar: false,
  setIsHideSidebar: (val: boolean) => set(() => ({ isHideSidebar: val })),
  toggleIsCollapsed: () => set((prev) => ({ isCollapsed: !prev.isCollapsed })),
  breadcrumbItems: [],
  setBreadcrumbItems: (items) => set(() => ({ breadcrumbItems: items })),
}));

export default useAppLayoutStore;
