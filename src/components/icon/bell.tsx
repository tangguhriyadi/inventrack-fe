import Icon, {
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
      d="M15.6243 8.0913V7.50413C15.6243 4.28018 13.1062 1.66666 10 1.66666C6.8938 1.66666 4.37573 4.28018 4.37573 7.50413V8.0913C4.37573 8.79595 4.17476 9.48484 3.79817 10.0712L2.8753 11.5079C2.03235 12.8203 2.67587 14.6041 4.14197 15.0191C7.97728 16.1047 12.0227 16.1047 15.858 15.0191C17.3241 14.6041 17.9676 12.8203 17.1247 11.5079L16.2018 10.0712C15.8252 9.48485 15.6243 8.79595 15.6243 8.0913Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M6.25 15.8333C6.79586 17.2898 8.26871 18.3333 10 18.3333C11.7313 18.3333 13.2041 17.2898 13.75 15.8333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

const BellIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default BellIcon;
