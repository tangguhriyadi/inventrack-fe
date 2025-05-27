import Icon, {
  //   CustomIconComponentProps,
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5">
      <path
        d="M2.72919 13.2468C2.02085 12.3268 1.66669 11.866 1.66669 10.5002C1.66669 9.1335 2.02085 8.67433 2.72919 7.7535C4.14335 5.91683 6.51502 3.8335 10 3.8335C13.485 3.8335 15.8567 5.91683 17.2709 7.7535C17.9792 8.67516 18.3334 9.13433 18.3334 10.5002C18.3334 11.8668 17.9792 12.326 17.2709 13.2468C15.8567 15.0835 13.485 17.1668 10 17.1668C6.51502 17.1668 4.14335 15.0835 2.72919 13.2468Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M12.5 10.5C12.5 11.163 12.2366 11.7989 11.7678 12.2678C11.2989 12.7366 10.663 13 10 13C9.33696 13 8.70107 12.7366 8.23223 12.2678C7.76339 11.7989 7.5 11.163 7.5 10.5C7.5 9.83696 7.76339 9.20107 8.23223 8.73223C8.70107 8.26339 9.33696 8 10 8C10.663 8 11.2989 8.26339 11.7678 8.73223C12.2366 9.20107 12.5 9.83696 12.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </g>
  </svg>
);

const EyeOpenIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default EyeOpenIcon;
