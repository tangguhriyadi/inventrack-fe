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
    <g clipPath="url(#clip0_3362_877)">
      <circle cx="7.66659" cy="7.66668" r="6.33333" stroke="currentColor" />
      <path
        d="M12.3333 12.3333L14.6666 14.6667"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3362_877">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const SearchIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default SearchIcon;
