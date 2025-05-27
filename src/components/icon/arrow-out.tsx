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
    <g clipPath="url(#clip0_8154_3712)">
      <path
        d="M8.66666 7.33331L14.6667 1.33331M14.6667 1.33331H11.104M14.6667 1.33331V4.89598"
        stroke="#4D4D4D"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 1.33331C4.318 1.33331 1.33333 4.31798 1.33333 7.99998C1.33333 11.682 4.318 14.6666 8 14.6666C11.682 14.6666 14.6667 11.682 14.6667 7.99998"
        stroke="#4D4D4D"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_8154_3712">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ArrowOutIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ArrowOutIcon;
