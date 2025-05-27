import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="32"
    height="41"
    viewBox="0 0 32 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 0.012085C7.164 0.012085 0 8.01808 0 17.0121C0 25.9361 5.106 35.6361 13.074 39.3601C13.9898 39.7889 14.9887 40.0112 16 40.0112C17.0113 40.0112 18.0102 39.7889 18.926 39.3601C26.894 35.6361 32 25.9361 32 17.0121C32 8.01808 24.836 0.012085 16 0.012085ZM16 20.0121C17.0609 20.0121 18.0783 19.5907 18.8284 18.8405C19.5786 18.0904 20 17.073 20 16.0121C20 14.9512 19.5786 13.9338 18.8284 13.1837C18.0783 12.4335 17.0609 12.0121 16 12.0121C14.9391 12.0121 13.9217 12.4335 13.1716 13.1837C12.4214 13.9338 12 14.9512 12 16.0121C12 17.073 12.4214 18.0904 13.1716 18.8405C13.9217 19.5907 14.9391 20.0121 16 20.0121Z"
      fill="#F47920"
    />
  </svg>
);

const PinPointIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default PinPointIcon;
