import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="49"
    height="10"
    viewBox="0 0 49 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M48.3335 5L40.8335 0.669873V9.33013L48.3335 5ZM0.333496 5.75H1.8335V4.25H0.333496V5.75ZM4.8335 5.75H7.8335V4.25H4.8335V5.75ZM10.8335 5.75H13.8335V4.25H10.8335V5.75ZM16.8335 5.75H19.8335V4.25H16.8335V5.75ZM22.8335 5.75H25.8335V4.25H22.8335V5.75ZM28.8335 5.75H31.8335V4.25H28.8335V5.75ZM34.8335 5.75H37.8335V4.25H34.8335V5.75ZM40.8335 5.75H43.8335V4.25H40.8335V5.75Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowDotsIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default ArrowDotsIcon;
