import React from "react";
import { Switch } from "antd";
import { SwitchProps } from "antd/lib/switch";

const CoreSwitch: React.FC<SwitchProps> = (props) => {
  return <Switch {...props} />;
};

export default CoreSwitch;
