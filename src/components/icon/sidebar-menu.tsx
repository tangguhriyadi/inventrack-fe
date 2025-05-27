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
      d="M1.66663 9.16667C1.66663 6.02397 1.66663 4.45262 2.64294 3.47631C3.61925 2.5 5.1906 2.5 8.33329 2.5H11.6666C14.8093 2.5 16.3807 2.5 17.357 3.47631C18.3333 4.45262 18.3333 6.02397 18.3333 9.16667V10.8333C18.3333 13.976 18.3333 15.5474 17.357 16.5237C16.3807 17.5 14.8093 17.5 11.6666 17.5H8.33329C5.1906 17.5 3.61925 17.5 2.64294 16.5237C1.66663 15.5474 1.66663 13.976 1.66663 10.8333V9.16667Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M4.58337 8.33331H9.58337"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M5.41663 11.6667H8.74996"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path
      d="M12.5 17.5L12.5 2.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

const SidebarMenuIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default SidebarMenuIcon;
