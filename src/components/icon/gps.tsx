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
    <g opacity="0.7">
      <path
        d="M16.6663 10.0002C16.6663 11.7683 15.964 13.464 14.7137 14.7142C13.4635 15.9645 11.7678 16.6668 9.99967 16.6668C8.23156 16.6668 6.53587 15.9645 5.28563 14.7142C4.03539 13.464 3.33301 11.7683 3.33301 10.0002C3.33301 8.23205 4.03539 6.53636 5.28563 5.28612C6.53587 4.03588 8.23156 3.3335 9.99967 3.3335C11.7678 3.3335 13.4635 4.03588 14.7137 5.28612C15.964 6.53636 16.6663 8.23205 16.6663 10.0002Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M12.5 10C12.5 10.663 12.2366 11.2989 11.7678 11.7678C11.2989 12.2366 10.663 12.5 10 12.5C9.33696 12.5 8.70107 12.2366 8.23223 11.7678C7.76339 11.2989 7.5 10.663 7.5 10C7.5 9.33696 7.76339 8.70107 8.23223 8.23223C8.70107 7.76339 9.33696 7.5 10 7.5C10.663 7.5 11.2989 7.76339 11.7678 8.23223C12.2366 8.70107 12.5 9.33696 12.5 10Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M1.6665 10.0001H3.33317M16.6665 10.0001H18.3332M9.99984 3.33341V1.66675M9.99984 18.3334V16.6667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

const GpsIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default GpsIcon;
