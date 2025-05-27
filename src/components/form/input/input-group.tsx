import React from "react";

interface Props {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children: React.ReactNode;
}

const CoreInputGroup: React.FC<Props> = (props) => {
  const { title, children, subTitle = null } = props;
  const titleRender =
    typeof title === "string" ? (
      <div className="!m-0 mb-1 text-[19px] leading-[1.2] font-semibold">
        {title}
      </div>
    ) : (
      title
    );
  return (
    <div className="flex gap-x-6">
      <div className="w-full max-w-[224px]">
        {titleRender}
        <div className="text-black font-medium text-sm">{subTitle}</div>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default CoreInputGroup;
