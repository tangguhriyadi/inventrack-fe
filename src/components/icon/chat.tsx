import Icon, {
  //   CustomIconComponentProps,
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_4837_3292)">
      <path
        d="M8.33329 18.3333C12.0152 18.3333 15 15.3486 15 11.6667C15 7.98477 12.0152 5 8.33329 5C4.65139 5 1.66663 7.98477 1.66663 11.6667C1.66663 12.6963 1.90002 13.6713 2.31679 14.5419C2.46004 14.8411 2.51033 15.1801 2.42459 15.5005L2.15122 16.5222C1.93575 17.3275 2.67247 18.0642 3.47775 17.8487L4.49945 17.5754C4.8199 17.4896 5.15888 17.5399 5.45809 17.6832C6.32863 18.0999 7.3037 18.3333 8.33329 18.3333Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15 12.0849C15.0554 12.0618 15.1103 12.0378 15.1647 12.0129C15.4665 11.8751 15.805 11.8235 16.1255 11.9093L16.5222 12.0154C17.3274 12.2309 18.0642 11.4942 17.8487 10.6889L17.7426 10.2922C17.6568 9.97174 17.7084 9.63319 17.8462 9.33146C18.159 8.64668 18.3333 7.88537 18.3333 7.08335C18.3333 4.09181 15.9082 1.66669 12.9166 1.66669C10.6647 1.66669 8.73381 3.04084 7.91663 4.99635"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5.43194 11.6667H5.43944M8.34087 11.6667H8.34837M11.25 11.6667H11.2575"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_4837_3292">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ChatIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ChatIcon;
