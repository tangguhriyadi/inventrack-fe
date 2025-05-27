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
      d="M13.3333 3.33331C15.1459 3.3434 16.1274 3.42378 16.7678 4.0641C17.5 4.79633 17.5 5.97484 17.5 8.33186V13.3319C17.5 15.6889 17.5 16.8674 16.7678 17.5996C16.0355 18.3319 14.857 18.3319 12.5 18.3319H7.5C5.14298 18.3319 3.96447 18.3319 3.23223 17.5996C2.5 16.8674 2.5 15.6889 2.5 13.3319V8.33186C2.5 5.97484 2.5 4.79633 3.23223 4.0641C3.87255 3.42378 4.85414 3.3434 6.66667 3.33331"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M6.66667 2.91669C6.66667 2.22633 7.22632 1.66669 7.91667 1.66669H12.0833C12.7737 1.66669 13.3333 2.22633 13.3333 2.91669V3.75002C13.3333 4.44038 12.7737 5.00002 12.0833 5.00002H7.91667C7.22632 5.00002 6.66667 4.44038 6.66667 3.75002V2.91669Z"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M12.5 10.8333L10 10.8333M10 10.8333L7.5 10.8333M10 10.8333L10 8.33331M10 10.8333L10 13.3333"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  </svg>
);

const NotesIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default NotesIcon;
