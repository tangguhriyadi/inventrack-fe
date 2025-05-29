// import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { ROUTES } from "./route.config";
import React from "react";
import { ModuleNameEnum } from "./access-control.config";
import {
  AuditOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ProductOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RoleEnum from "../enums/role.enum";

interface IMenuConfig {
  key: string;
  icon?: React.ReactNode;
  label: string;
  module?: ModuleNameEnum;
  subMenu?: Omit<IMenuConfig, "subMenu">[];
  roles: RoleEnum[];
}

export const MENU_CONFIG: IMenuConfig[] = [
  {
    key: ROUTES.DEFAULT,
    icon: <DashboardOutlined />,
    label: "Dashboard",
    module: ModuleNameEnum.Dasboard,
    roles: [RoleEnum.ADMIN],
  },
  {
    key: ROUTES.INVENTORY.LIST,
    label: "Inventory",
    module: ModuleNameEnum.Inventory,
    icon: <ProductOutlined />,
    roles: [RoleEnum.ADMIN],
  },
  {
    key: ROUTES.APPROVAL.LIST,
    label: "Booking Approval",
    module: ModuleNameEnum.Approval,
    icon: <AuditOutlined />,
    roles: [RoleEnum.ADMIN],
  },
  {
    key: ROUTES.BOOKING.LIST,
    label: "Booking",
    module: ModuleNameEnum.Booking,
    icon: <ScheduleOutlined />,
    roles: [RoleEnum.STAFF],
  },
  {
    key: ROUTES.USER.LIST,
    label: "User",
    module: ModuleNameEnum.User,
    icon: <UserOutlined />,
    roles: [RoleEnum.ADMIN],
  },
  {
    key: "Data Master",
    label: "Data Master",
    icon: <DatabaseOutlined />,
    roles: [RoleEnum.ADMIN],

    subMenu: [
      {
        key: ROUTES.CATEGORY.LIST,
        label: "Category",
        module: ModuleNameEnum.Category,
        roles: [RoleEnum.ADMIN],
      },
    ],
  },
];
