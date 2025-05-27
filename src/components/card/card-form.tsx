import { Card, CardProps } from "antd";
import React from "react";

interface Props extends Omit<CardProps, "title"> {
  title: string;
  subTitle?: string;
}

const CoreCardForm: React.FC<Props> = (props) => {
  const { title, subTitle, children, ...rest } = props;
  return (
    <Card
      title={
        <div className="py-6">
          <h2 className="!m-0 text-[27px] leading-[1.2] font-semibold">
            {title}
          </h2>
          <p className="!m-0 text-black font-medium text-sm mt-1">{subTitle}</p>
        </div>
      }
      {...rest}
    >
      {children}
    </Card>
  );
};

export default CoreCardForm;
