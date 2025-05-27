"use client";

import { Breadcrumb } from "antd";
import React from "react";
import useAppLayoutStore from "@/store/app-layout";
import ArrowRightIcon from "../icon/arrow-right";

const CoreBreadcrumb = () => {
  const { breadcrumbItems } = useAppLayoutStore();
  return (
    <Breadcrumb
      className="!text-[17px]"
      items={breadcrumbItems}
      separator={<ArrowRightIcon />}
    />
  );
};

export default CoreBreadcrumb;
