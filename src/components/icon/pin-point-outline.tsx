import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.66699 7.26216C2.66699 4.26416 5.05499 1.8335 8.00033 1.8335C10.9457 1.8335 13.3337 4.26416 13.3337 7.26216C13.3337 10.2368 11.6317 13.7088 8.97566 14.9495C8.67038 15.0924 8.33741 15.1665 8.00033 15.1665C7.66324 15.1665 7.33027 15.0924 7.02499 14.9495C4.36899 13.7082 2.66699 10.2375 2.66699 7.26283V7.26216Z"
      stroke="currentColor"
    />
    <path
      d="M8 9.16699C9.10457 9.16699 10 8.27156 10 7.16699C10 6.06242 9.10457 5.16699 8 5.16699C6.89543 5.16699 6 6.06242 6 7.16699C6 8.27156 6.89543 9.16699 8 9.16699Z"
      stroke="currentColor"
    />
  </svg>
);

const PinPointOutlineIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default PinPointOutlineIcon;
