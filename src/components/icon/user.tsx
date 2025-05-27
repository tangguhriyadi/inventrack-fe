import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-user"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const UserIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default UserIcon;
