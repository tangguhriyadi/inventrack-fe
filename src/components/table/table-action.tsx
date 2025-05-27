"use client";

import { Dropdown, DropdownProps, MenuProps } from "antd";
import React, { useState } from "react";
import DotsIcon from "../icon/dots";
import { cn } from "../../utils/cn";

interface Props {
  items: MenuProps["items"];
  placement?: DropdownProps["placement"];
}

const CoreTableAction: React.FC<Props> = (props) => {
  const { items, placement = "bottomLeft" } = props;
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Dropdown
      menu={{ items }}
      placement={placement}
      trigger={["click"]}
      destroyPopupOnHide
    >
      <div
        role="button"
        tabIndex={0}
        className="!w-10 !h-10 flex justify-center items-center border-2 border-black-border rounded-lg hover:border-primary-hover transition-all duration-300"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <DotsIcon
          className={cn(isHover ? "text-primary-hover" : "text-primary")}
        />
      </div>
    </Dropdown>
  );
};

export default CoreTableAction;
