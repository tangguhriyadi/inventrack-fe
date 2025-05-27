import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.98022 9.1435C3.98022 5.39565 6.96499 2.35742 10.6469 2.35742C14.3288 2.35742 17.3136 5.39565 17.3136 9.1435C17.3136 12.862 15.1858 17.2011 11.866 18.7528C11.0921 19.1145 10.2017 19.1145 9.42778 18.7528C6.10799 17.2011 3.98022 12.862 3.98022 9.1435Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <ellipse
      cx="10.647"
      cy="9.02441"
      rx="2.5"
      ry="2.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const PinIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default PinIcon;
