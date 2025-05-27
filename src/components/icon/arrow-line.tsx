import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="49"
    height="10"
    viewBox="0 0 49 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M48.333 5L40.833 0.669873V9.33013L48.333 5ZM0.333008 5.75H41.583V4.25H0.333008V5.75Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowLineIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ArrowLineIcon;
