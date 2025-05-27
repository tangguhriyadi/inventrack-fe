import Icon, {
  IconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import React from "react";

const SVG = () => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.6669 4.5H2.3335" stroke="currentColor" strokeLinecap="round" />
    <path
      d="M12.5554 6.16669L12.2488 10.7661C12.1308 12.536 12.0718 13.421 11.4952 13.9605C10.9185 14.5 10.0315 14.5 8.25768 14.5H7.7421C5.96824 14.5 5.0813 14.5 4.50463 13.9605C3.92796 13.421 3.86896 12.536 3.75096 10.7661L3.44434 6.16669"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M6.3335 7.83331L6.66683 11.1666"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M9.66683 7.83331L9.3335 11.1666"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M4.3335 4.5C4.37075 4.5 4.38938 4.5 4.40626 4.49957C4.95522 4.48566 5.43951 4.13661 5.62631 3.62021C5.63205 3.60433 5.63794 3.58666 5.64972 3.55132L5.71445 3.35714C5.7697 3.19139 5.79733 3.1085 5.83397 3.03813C5.98017 2.75738 6.25066 2.56242 6.56324 2.51251C6.64158 2.5 6.72895 2.5 6.90367 2.5H9.09666C9.27138 2.5 9.35874 2.5 9.43709 2.51251C9.74967 2.56242 10.0202 2.75738 10.1664 3.03813C10.203 3.1085 10.2306 3.19138 10.2859 3.35714L10.3506 3.55132C10.3624 3.58661 10.3683 3.60434 10.374 3.62021C10.5608 4.13661 11.0451 4.48566 11.5941 4.49957C11.611 4.5 11.6296 4.5 11.6668 4.5"
      stroke="currentColor"
    />
  </svg>
);

const TrashIcon: React.FC<Partial<IconComponentProps>> = (props) => {
  return <Icon component={SVG} {...props} />;
};

export default TrashIcon;
