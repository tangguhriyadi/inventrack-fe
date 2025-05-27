import React from "react";
import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

const CoreButton: React.FC<AntButtonProps> = (props) => {
  const { children, ...rest } = props;
  return <AntButton {...rest}>{children}</AntButton>;
};

export default CoreButton;
