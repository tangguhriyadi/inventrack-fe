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
    <rect width="20" height="20" rx="10" fill="currentColor" />
    <path
      d="M7.66629 13.0573L5.13762 10.5287C5.01189 10.4072 4.84348 10.34 4.66869 10.3416C4.49389 10.3431 4.32668 10.4132 4.20307 10.5368C4.07947 10.6604 4.00936 10.8276 4.00784 11.0024C4.00632 11.1772 4.07351 11.3456 4.19495 11.4713L7.19495 14.4713C7.31997 14.5963 7.48951 14.6665 7.66629 14.6665C7.84306 14.6665 8.0126 14.5963 8.13762 14.4713L15.471 7.138C15.5924 7.01227 15.6596 6.84387 15.6581 6.66907C15.6566 6.49427 15.5864 6.32706 15.4628 6.20346C15.3392 6.07985 15.172 6.00974 14.9972 6.00822C14.8224 6.0067 14.654 6.0739 14.5283 6.19534L7.66629 13.0573Z"
      fill="white"
    />
  </svg>
);

const CheckRoundedIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default CheckRoundedIcon;
