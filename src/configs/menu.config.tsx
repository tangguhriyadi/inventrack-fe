// import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ROUTES } from "./route.config";
import React from "react";
import { ModuleNameEnum } from "./access-control.config";
import ShopIcon from "../components/icon/shop";

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
    icon: <ShopIcon />,
    label: "Dashboard",
    module: ModuleNameEnum.Dasboard,
  },
];
