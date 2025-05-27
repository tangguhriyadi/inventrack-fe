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
      d="M1.6665 10C1.6665 6.07163 1.6665 4.10745 2.88689 2.88706C4.10728 1.66667 6.07147 1.66667 9.99984 1.66667C13.9282 1.66667 15.8924 1.66667 17.1128 2.88706C18.3332 4.10745 18.3332 6.07163 18.3332 10C18.3332 13.9284 18.3332 15.8926 17.1128 17.1129C15.8924 18.3333 13.9282 18.3333 9.99984 18.3333C6.07147 18.3333 4.10728 18.3333 2.88689 17.1129C1.6665 15.8926 1.6665 13.9284 1.6665 10Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

const AddIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default AddIcon;
