import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="49"
    height="2"
    viewBox="0 0 49 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.666992 1H48.667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
  </svg>
);

const LineDotsIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default LineDotsIcon;
