import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_8154_3705)">
      <path
        d="M14 2L8 8M8 8H11.5627M8 8V4.43733"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99999 1.33334C4.31799 1.33334 1.33333 4.31801 1.33333 8.00001C1.33333 11.682 4.31799 14.6667 7.99999 14.6667C11.682 14.6667 14.6667 11.682 14.6667 8.00001"
        stroke="black"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8154_3705">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ArrowInIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ArrowInIcon;
