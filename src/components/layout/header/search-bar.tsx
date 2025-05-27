"use client";

import { Input } from "antd";
import React from "react";
import SearchIcon from "../../icon/search";
import useAppLayoutStore from "@/store/app-layout";
import CoreBreadcrumb from "../../navigation/breadcrumb";

const SearchBar = () => {
  const { isHideSidebar } = useAppLayoutStore();

  return (
    <div className="grow">
      {isHideSidebar ? (
        <div className="ml-6">
          <CoreBreadcrumb />
        </div>
      ) : (
        <Input
          variant="borderless"
          allowClear
          className="!rounded-full w-full grow !h-[36px] !ml-[36px] !bg-surface-2 !py-0 max-w-[384px]"
          prefix={<SearchIcon />}
          placeholder="Pencarian"
        />
      )}
    </div>
  );
};

export default SearchBar;
