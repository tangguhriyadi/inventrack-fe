import Icon, {
  //   CustomIconComponentProps,
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
    <g opacity="0.5" clipPath="url(#clip0_2855_2006)">
      <path
        d="M7.66668 14C11.1645 14 14 11.1645 14 7.66666C14 4.16886 11.1645 1.33333 7.66668 1.33333C4.16887 1.33333 1.33334 4.16886 1.33334 7.66666C1.33334 11.1645 4.16887 14 7.66668 14Z"
        stroke="currentColor"
      />
      <path
        d="M12.3333 12.3333L14.6666 14.6667"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2855_2006">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const MagnifierIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default MagnifierIcon;
