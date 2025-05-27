import { Input, InputProps } from "antd";
import React from "react";
import { cn } from "@/utils/cn";
import MagnifierIcon from "../../icon/magnifier";

const SearchBox: React.FC<InputProps> = (props) => {
  const {
    allowClear = true,
    variant = "borderless",
    className,
    ...rest
  } = props;
  return (
    <Input
      allowClear={allowClear}
      variant={variant}
      className={cn("!rounded-full", className)}
      prefix={<MagnifierIcon />}
      {...rest}
    />
  );
};

export default SearchBox;
