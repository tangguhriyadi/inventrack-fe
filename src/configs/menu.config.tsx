// import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ROUTES } from "./route.config";
import React from "react";
import { ModuleNameEnum } from "./access-control.config";
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface IMenuConfig {
  key: string;
  icon?: React.ReactNode;
  label: string;
  module?: ModuleNameEnum;
  subMenu?: Omit<IMenuConfig, "subMenu">[];
}

export const MENU_CONFIG: IMenuConfig[] = [
  {
    key: ROUTES.DEFAULT,
    icon: <DashboardOutlined />,
    label: "Dashboard",
    module: ModuleNameEnum.Dasboard,
  },
  {
    key: ROUTES.USER.LIST,
    label: "User",
    module: ModuleNameEnum.User,
    icon: <UserOutlined />,
  },
  {
    key: ROUTES.CATEGORY.LIST,
    label: "Category",
    module: ModuleNameEnum.Category,
    icon: <SettingOutlined />,
  },
];
