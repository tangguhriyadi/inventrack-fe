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
    <path
      d="M8.33333 18.3333C12.0152 18.3333 15 15.3486 15 11.6667C15 7.98477 12.0152 5 8.33333 5C4.65144 5 1.66667 7.98477 1.66667 11.6667C1.66667 12.6963 1.90006 13.6713 2.31683 14.5419C2.46008 14.8411 2.51037 15.1801 2.42463 15.5005L2.15126 16.5222C1.9358 17.3275 2.67251 18.0642 3.47779 17.8487L4.49949 17.5754C4.81995 17.4896 5.15892 17.5399 5.45813 17.6832C6.32867 18.0999 7.30375 18.3333 8.33333 18.3333Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M15 12.0849C15.0554 12.0618 15.1103 12.0378 15.1648 12.0129C15.4665 11.8751 15.8051 11.8235 16.1255 11.9093L16.5222 12.0154C17.3275 12.2309 18.0642 11.4941 17.8487 10.6889L17.7426 10.2922C17.6569 9.97171 17.7084 9.63316 17.8462 9.33142C18.159 8.64665 18.3333 7.88534 18.3333 7.08332C18.3333 4.09178 15.9082 1.66666 12.9167 1.66666C10.6648 1.66666 8.73385 3.04081 7.91667 4.99632"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M5.4319 11.6667H5.4394M8.34083 11.6667H8.34833M11.25 11.6667H11.2575"
      stroke="currentColor"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChatMessageIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ChatMessageIcon;
