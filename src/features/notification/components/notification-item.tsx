"use client";

import Link from "next/link";
import React from "react";
import { cn } from "@/utils/cn";
import { Badge, Typography } from "antd";

export interface NotificationItemProps {
  messages: string;
  time: number;
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { messages, time } = props;
  return (
    <Link
      className={cn(
        "text-gray-solid flex justify-between items-center py-[10px] px-3 transition-all duration-300",
        "hover:text-accent-hover hover:bg-primary hover:bg-opacity-5",
      )}
      style={{
        width: "calc(100% + 30px)",
      }}
      href="#"
    >
      <div className="flex flex-col gap-y-1">
        <Typography.Text className="text-black hover:text-blacks">
          {messages}
        </Typography.Text>
        <Typography.Text className="!text-gray-extra-light !text-[12px]">
          {time} hrs ago
        </Typography.Text>
      </div>
      <div>
        <Badge style={{ transform: "translateX(-500%)" }} status="error" />
      </div>
    </Link>
  );
};

export default NotificationItem;
