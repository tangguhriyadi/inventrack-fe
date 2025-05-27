"use client";

import React, { useMemo } from "react";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { MENU_CONFIG } from "@/configs/menu.config";
import Sider from "antd/es/layout/Sider";
import { cn } from "@/utils/cn";
import { ROUTES } from "@/configs/route.config";
import useAppLayoutStore from "@/store/app-layout";
import SidebarMenuIcon from "../../icon/sidebar-menu";

const Sidebar: React.FC = () => {
  const { isCollapsed, isHideSidebar, toggleIsCollapsed } = useAppLayoutStore();
  const router = useRouter();
  const pathname = usePathname();

  // const { data, status } = useSession();

  // const isLoading = status === "loading";

  const selectedKey = useMemo(() => {
    if (pathname === "/") return "/";
    if (pathname === ROUTES.DEFAULT) return ROUTES.DEFAULT;

    const paths = pathname.split("/");

    return `/${paths.slice(1, paths.length)[0]}/${
      paths.slice(1, paths.length)[1]
    }`;
  }, [pathname]);

  if (isHideSidebar) return null;

  return (
    <Sider
      trigger={null}
      className="sider-scroll h-screen overflow-y-auto !bg-white absolute left-0 z-30 p-[15px]"
      collapsible
      collapsed={isCollapsed}
      color="primary"
      width={280}
      collapsedWidth={80}
    >
      <div className="relative overflow-hidden w-full h-full">
        <div
          className={cn(
            "absolute inset-0 overflow-y-auto overflow-x-hidden sider-scroll",
            // isCollapsed ? "mr-[-10px]" : "mr-[-5px]",
          )}
        >
          <div
            className="h-10 w-10 rounded-[10px] bg-neutral-98 flex justify-center items-center cursor-pointer mb-4"
            onClick={() => toggleIsCollapsed()}
          >
            <SidebarMenuIcon />
          </div>

          <Menu
            className="p-0"
            mode="inline"
            defaultSelectedKeys={[selectedKey]}
            items={MENU_CONFIG.map((menu) => ({
              key: menu.key,
              icon: menu.icon,
              label: menu.label,
              className: "step-" + menu.module,
              children: menu.subMenu?.map((sub) => ({
                key: sub.key,
                label: sub.label,
              })),
            }))}
            onClick={({ key }) => {
              router.push(key.toString());
            }}
            selectedKeys={[selectedKey]}
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
